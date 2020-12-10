class SleepLog {
  constructor(sleepData, userID) {
    this.userSleep = sleepData.filter((data) => data.userID === userID);
  }

  calculateAllTimeAverageSleep(variable) {
    let totalSleep = 0;
    userSleep.forEach((date) => {
      totalSleep += this.userSleep[date][variable];
    });
    return totalSleep / dates.length;
  }

  getLastNightsSleep(date, variable) {
    return this.sleepCalendar[date][variable];
  }

  getWeekOfSleepData(today, variable) {
    // const allDates = Object.keys(this.sleepCalendar);
    // const indexOfToday = allDates.findIndex((date) => date === today);
    const lastWeek = allDates.slice(indexOfToday, indexOfToday + 7);
    const getWeeksData = (weekOfSleep, date) => {
      weekOfSleep[date] = this.sleepCalendar[date][variable];
      return weekOfSleep;
    }
    return lastWeek.reduce(getWeeksData, {});
  }
}
