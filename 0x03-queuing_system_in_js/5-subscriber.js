const redis = require('redis');
const client = redis.createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.log('Redis client connected to the server');
});

client.subscribe('holberton school channel');

client.on('message', (channel, message) => {
    console.log(`Recieved message on channel ${channel}: ${message}`);

    if (message === 'KILL_SERVER') {
        client.unsubscribe();
        client.quit();
    }
});