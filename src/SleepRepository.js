class SleepRepository {
  constructor(sleepData) {
    this.sleepCollection = sleepData;
  }

  calculateAllUsersAverageSleepQuality() {
    const sleepQualitySummation = (sumQuality, night) => {
      sumQuality += night.sleepQuality;
      return sumQuality;
    };
    const sumOfSleepQuality = this.sleepCollection.reduce(sleepQualitySummation, 0);
    return sumOfSleepQuality / this.sleepCollection.length;
  }

  findWeeksGoodSleepers(date, userRepo) {
    const highQualitySleepers = userRepo.users.filter((user) => {
      const userWeekOfSleep = user.getSleepLog(this.sleepCollection).getWeekOfSleepData(date, 'sleepQuality');
      userWeekOfSleep;
      const totalWeeksQuality = Object.keys(userWeekOfSleep).reduce((total, night) => {
        total += userWeekOfSleep[night];
        return total;
      }, 0);
      return totalWeeksQuality / Object.keys(userWeekOfSleep).length > 3;
    });
    return highQualitySleepers.map(sleeper => sleeper.id);
  }

  findNightsLongestSleepers(date) {
    const nightSleeps = this.sleepCollection.filter(entry => entry.date === date);
    let longestSleepers = [];
    let mosthoursSlept = 0;
    nightSleeps.forEach((entry) => {
      if (entry.hoursSlept > mosthoursSlept) {
        mosthoursSlept = entry.hoursSlept;
        longestSleepers = [entry.userID];
      } else if (entry.hoursSlept = mosthoursSlept) {
        longestSleepers.push(entry.userID);
      };
    });
    return longestSleepers;
  }

 }
module.exports = SleepRepository;
