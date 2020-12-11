class SleepLog {
  constructor(sleepData, userID) {
    this.log = sleepData.filter((data) => data.userID === userID)
      .map(userLog => {
        const logEntry = {};
        logEntry.date = userLog.date;
        logEntry.hoursSlept = userLog.hoursSlept;
        logEntry.sleepQuality = userLog.sleepQuality;
        return logEntry;
      });
  }

  calculateAllTimeAverageSleep(variable) {
    let totalSleep = 0;
    log.forEach((entry) => {
      totalSleep += entry[variable];
    });
    return totalSleep / entry.length;
  }

  getLastNightsSleep(date, variable) {
    const lastNightsSleep = this.log.find(entry => entry.date === date);
    return lastNightsSleep[variable];
  }

  getWeekOfSleepData(today, variable) {
    const indexOfToday = allDates.findIndex((date) => date === today);
    const lastWeek = allDates.slice(indexOfToday, indexOfToday + 7);
    const getWeeksData = (weekOfSleep, date) => {
      weekOfSleep[date] = this.sleepCalendar[date][variable];
      return weekOfSleep;
    }
    return lastWeek.reduce(getWeeksData, {});
  }
}
