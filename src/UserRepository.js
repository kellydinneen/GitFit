// const user = require('User.js');

class UserRepository {

  constructor(userData) {
    this.users = userData;
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

module.exports = UserRepository;
