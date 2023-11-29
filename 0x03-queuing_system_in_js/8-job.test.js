const { expect } = require('chai');
const kue = require('kue');
const createPushNotificationsJobs = require('./8-job');

describe('createPushNotificationsJobs', () => {
    let queue;

    beforeEach(() => {
        queue = kue.createQueue({ disableSearch: true });
        kue.app.listen(0);
        queue.testMode.enter();
    });

    afterEach(() => {
        queue.testMode.exit();
    });

    it('should throw an error if jobs is not an array', () => {
        const invalidJob = { phoneNumber: '1234567890', message: 'test message' };
        const createInvalidJob = () => createPushNotificationsJobs(queue, invalidJob);
        expect(createInvalidJob).to.throw(Error, 'Jobs is not an array');
    });

    it('should create jobs in the queue', () => {
        const jobsArray = [
            { phoneNumber: '4153518780', message: 'This is the code 1234' },
            { phoneNumber: '4153518781', message: 'This is the code 4562' },
        ];

        createPushNotificationsJobs(jobsArray, queue);

        expect(queue.testMode.jobs.length).to.equal(jobsArray.length);
    });

    it('should create jobs with correct data', () => {
        const jobsArray = [
            { phoneNumber: '4153518780', message: 'This is the code 1234' },
            { phoneNumber: '4153518781', message: 'This is the code 4562' },
        ];

        createPushNotificationsJobs(jobsArray, queue);

        expect(queue.testMode.jobs[0].data).to.deep.equal(jobsArray[0]);
        expect(queue.testMode.jobs[1].data).to.deep.equal(jobsArray[1]);
    });
});
