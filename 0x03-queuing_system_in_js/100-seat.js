const express = require('express');
const redis = require('redis');
const kue = require('kue');
const { promisify } = require('util');
const { parse } = require('path');

const app = express();
const port = 1245;

const client = redis.createClient();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const intialAvailableSeats = 50;
reserveSeat(intialAvailableSeats);

let reservationEnabled = true;

const queue = kue.createQueue();

async function reserveSeat(number) {
    await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
    const availableSeats = await getAsync('available_seats');
    return availableSeats ? parseInt(availableSeats, 10) : 0;
}

app.use(express.json());

app.get('/available_seats', async (req, res) => {
    const numberOfAvailableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats: numberOfAvailableSeats.toString() });
});

app.get('/reserve_seat', async (req, res) => {
    if (!reservationEnabled) {
        return res.json({ "status": "Reservation are blocked" });
    }

    const job = queue.create('reserve_seat', {}).save((err) => {
        if (err) {
            return res.json({ "status": "Reservation failed" });
        }
        res.json({ "status": "Reservation in process" });
    });

    job.on('complete', () => {
        console.log(`Seat reservation job ${job.id} completed`);
    });

    job.on('failed', () => {
        console.log(`Seat reservation job ${job.id} failed: ${err}`);
    });
});

app.get('/process', async (req, res) => {
    queue.process('reserve_seat', async (job, done) => {
        const availableSeats = await getCurrentAvailableSeats();
        if (availableSeats <= 0) {
            done(Error('Not enough seats available'));
        }

        await reserveSeat(availableSeats - 1);
        if (availableSeats === 1) {
            reservationEnabled = false;
        }
        done();
    });
    res.json({ "status": "Queue processing" });
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
