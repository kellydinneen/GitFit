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
    const highestQualitySleepers = userRepo.users.filter((user) => {
      const userWeekOfSleep = user.getSleepLog(this.sleepCollection).getWeekOfSleepData(date, 'sleepQuality');
      const totalWeeksQuality =
        Object.values(userWeekOfSleep).reduce((total, sleepQuality) => {
          total += sleepQuality;
          return total;
        }, 0);
      return totalWeeksQuality / Object.keys(userWeekOfSleep).length > 3;
    });
    return highestQualitySleepers.map(sleeper => sleeper.id);
  }

  findNightsLongestSleepers(date) {
    const nightSleeps = this.sleepCollection.filter(entry => entry.date === date);
    const sortedSleeps = nightSleeps.sort((a, b) => {
      return a.hoursSlept - b.hoursSlept
    });
    const longestSleepTime = sortedSleeps[sortedSleeps.length - 1];
    const longestSleeps = sortedSleeps.filter(sleep => sleep.hoursSlept === longestSleepTime.hoursSlept);
    return longestSleeps.map(sleep => sleep.userID);
  }

 }

if (typeof module !== 'undefined') {
  module.exports = SleepRepository;
}
