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

  findWeeksGoodSleepers(date) {
    const highQualitySleepers = UserRepository.users.filter((user) => {
      const userWeekOfSleep = user.getSleepLog().getWeekOfSleepData(date, 'sleepQuality');
      const totalWeeksQuality = userWeekOfSleep.reduce((total, sleep) => {
        total += sleep.sleepQuality;
        return total;
      }, 0);
      return totalWeeksQuality / 7 > 3;
    });

    return highQualitySleepers.map(sleeper => sleeper.id);
  }

 }
module.exports = SleepRepository;
