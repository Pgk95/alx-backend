const kue = require('kue');
const queue = kue.createQueue();

const jobData = {
    phoneNumber: '12345678',
    message: 'This is the code to verify your account',
};

const notificationJob = queue.create('push_notification_code', jobData);

notificationJob
    .on('complete', () => {
        console.log('Notification job completed');

        notificationJob.remove(() => {
            process.exit(0);
        });
    })
    .on('failed', () => {
        console.log('Notification job failed');
        process.exit(1);
    })
    .save((err) => {
        if (!err) {
            console.log(`Notification job created: ${notificationJob.id}`);
        } else {
            console.error('Error creating notification job:', err);
            process.exit(1);
        }
    });