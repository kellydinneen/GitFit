
const SleepLog = require('../src/SleepLog');
const ActivityLog = require('./ActivityLog');

class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  getFirstName() {
    const names = this.name.split(' ');
    return names[0];
  }

  getSleepLog(sleepData) {
    this.sleepLog = new SleepLog(sleepData, this.id);
    // return ;
  }
  getHydrationLog(hydrationData) {
    // console.log(hydrationData);
    this.hydrationLog = new HydrationLog(hydrationData, this.id);
    // return this.hydrationLog;

    return this.sleepLog;
  }

  getActivityLog(activityData) {
    this.activityLog = new ActivityLog(activityData, this.id);
    return this.activityLog;

  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
};
