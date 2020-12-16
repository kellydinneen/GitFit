// const User = require('../src/User.js');

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

    getAllWellnessLogs() {
      userRepo.users.forEach(user => user.getWellnessLog(hydrationData, sleepData, activityData, user.id));
    }

    findUsersDistanceRank(currentUser, date) {
      this.getAllWellnessLogs();
      let distances = userRepo.users.map(user => {
        let usersDistance = {};
        usersDistance.id = user.id;
        usersDistance.distance = user.wellnessLog.getTodaysStat(date, 'activity', 'distance', userRepo.users);
        return usersDistance;
      });
      let distanceRankings = distances.sort((a, b) => a.distance - b.distance);
      let usersRank = distanceRankings.findIndex(user => user.id === currentUser.id);
      console.log(distanceRankings)
      return usersRank - 1;
    }

};

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
};
