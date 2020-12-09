class Sleep {
  constructor(sleepData, userID) {
    const userSleepData = sleepData.filter((data) => data.id === userID);
    const makeSleepCalendar = (sleepCalendar, dailyData) => {
      sleepCalendar[dailyData.date] = {'hoursSlept': dailyData.hoursSlept,
      'sleepQuality': dailyData.sleepQuality}
      return sleepCalendar;
    };
    this.sleepCalendar = userSleepData.reduce(getUserSleepData, {});
  }

  method() {

  }

  method() {

  }
  method() {

  }
}
