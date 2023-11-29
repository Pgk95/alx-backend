const redis = require('redis');
const client = redis.createClient();

function createHash() {
    client.hset(
        'HolbertonSchools',
        'Portland',
        50,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'Seattle',
        80,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'New York',
        20,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'Bogota',
        20,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'Cali',
        40,
        redis.print
    );
    client.hset(
        'HolbertonSchools',
        'paris',
        2,
        redis.print
    );
}

function displayHash() {
    client.hgetall('HolbertonSchools', (err, reply) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Hash in redis:', reply);
        }
    });
}

createHash();
displayHash();