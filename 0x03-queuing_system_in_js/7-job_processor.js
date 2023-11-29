const kue = require('kue');

const queue = kue.createQueue({
    concurrency: 2,
});

const blacklistedNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
    job.progress(0, 100);

    if (blacklistedNumbers.includes(phoneNumber)) {
        return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    }

    job.progress(50, 100);

    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

    setTimeout(() => {
        job.progress(100, 100);
        done();
    }, 1000);
}

queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;

    sendNotification(phoneNumber, message, job, done);
});

queue.on('error', (err) => {
    console.log('kue queue error:', err);
    process.exit(1);
});