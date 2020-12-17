// const WellnessLog = require('../src/WellnessLog.js');
// commented out for testing purposes

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

  getWellnessLog(hydrationData, sleepData, activityData) {
    this.wellnessLog = new WellnessLog(hydrationData, sleepData, activityData, this.id);
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
