// const SleepLog = require('../src/SleepLog');
// const HydrationLog = require('../src/HydrationLog');

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
    return new SleepLog(sleepData, this.id);
  }
  getHydrationLog(hydrationData) {
    // console.log(hydrationData);
    this.hydrationLog = new HydrationLog(hydrationData, this.id);
    // return this.hydrationLog;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
};
