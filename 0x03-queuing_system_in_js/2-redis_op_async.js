const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (err) => {
    console.error('Redis client not connected to the server:', err.message);
});

// functions setNewSchool, displaySchoolValue
function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
    try {
        const getAsync = promisify(client.get).bind(client);
        const value = await getAsync(schoolName);
        console.log(value);
    } catch (err) {
        console.error(err);
    }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');