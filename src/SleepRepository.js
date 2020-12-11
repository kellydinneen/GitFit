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

 }
module.exports = SleepRepository;
