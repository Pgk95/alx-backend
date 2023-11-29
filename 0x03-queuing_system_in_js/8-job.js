const kue = require('kue');

const queue = kue.createQueue();

function createPushNotificationsJobs(jobs, queue) {
    if (!Array.isArray(jobs)) {
        throw Error('Jobs is not an array');
    }

    jobs.forEach((jobData) => {
        const notificationJob = queue.create('push_notification_code_3', jobData);

        notificationJob
            .on('complete', () => {
                console.log(`Notification job ${notificationJob.id} completed`);
            })
            .on('failed', (err) => {
                console.log(`Notification job ${notificationJob.id} failed: ${err}`);
            })
            .on('progress', (progress) => {
                console.log(`Notification job ${notificationJob.id} ${progress}% complete`);
            })
            .save((err) => {
                if (!err) {
                    console.log(`Notification job created: ${notificationJob.id}`);
                } else {
                    console.error(`Error cerating notification job: ${err}`);
                }
            });
    });
}

module.exports = createPushNotificationsJobs;