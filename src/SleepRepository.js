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

  findWeeksGoodSleepers() {
    UserRepository.users.filter((user) => {
      const userWeekOfSleep = user.getSleepLog().calcula
    });
    this.sleepCollection.forEach(sleep => userIDs.push(sleep.userID));
    userIDs.flat.forEach(id => users.push(new User()));
  }

 }
module.exports = SleepRepository;
