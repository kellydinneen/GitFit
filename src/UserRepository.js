// const User = require('../src/User');

class UserRepository {

  constructor(userData) {
    this.users = userData.map(user => {
      let person = new User(user);
      return person;
    });
  }

  getUserInfo(userID) {
    return this.users.find((user) => user.id === userID);
  }

  calculateAverageStepGoal() {
    const addition = (sum, user) => {
      sum+= user.dailyStepGoal;
      return sum;
    };
    const totalStepGoal = this.users.reduce(addition, 0);
    return totalStepGoal / this.users.length;
    };

};

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
};
