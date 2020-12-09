class Sleep {
  constructor(sleepData, userID) {
    const userSleepData = sleepData.filter((data) => data.userID === userID);
    const makeSleepCalendar = (sleepCalendar, dailyData) => {
      sleepCalendar[dailyData.date] = {'hoursSlept': dailyData.hoursSlept,
      'sleepQuality': dailyData.sleepQuality}
      return sleepCalendar;
    };
    this.sleepCalendar = userSleepData.reduce(makeSleepCalendar, {});
  }

  calculateAllTimeAverageSleep(variable) {
    let totalSleep = 0;
    const dates = Object.keys(this.sleepCalendar);
    dates.forEach((date) => {
      totalSleep += this.sleepCalendar[date][variable];
    });
    return totalSleep / dates.length;
  }

  getLastNightsSleep(date, variable) {
    return this.sleepCalendar[date][variable];
  }

  getWeekOfSleepData(today, variable) {
    const allDates = Object.keys(this.sleepCalendar);
    const indexOfToday = allDates.findIndex((date) => date === today);
    const lastWeek = allDates.slice(indexOfToday, indexOfToday + 7);
    const getWeeksData = (weekOfSleep, date) => {
      weekOfSleep[date] = this.sleepCalendar[date][variable];
      return weekOfSleep;
    }
    return lastWeek.reduce(getWeeksData, {});
  }

}
