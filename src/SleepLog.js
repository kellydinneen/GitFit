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

  getWeekOfSleepData(day, variable) {
    const weeklyLog = {};
    const dateIndex = this.log.findIndex(logEntry => logEntry.date === day);
    const weekOfEntries = this.log.slice(dateIndex - 6 || 0, dateIndex + 1 || this.log.length + 1);
    weekOfEntries.forEach(entry => {
      const dateOfEntry = entry.date;
      weeklyLog[dateOfEntry] = entry[variable];
    });
    return weeklyLog;
  }
}

module.exports = SleepLog;
