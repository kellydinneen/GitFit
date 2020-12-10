class HydrationLog {
  constructor(hydrationData, id) {
    this.userID = id;
    this.log = hydrationData.filter(log => log.userID === id)
      .map(userLog => {
        const logEntry = {};
        logEntry.date = userLog.date;
        logEntry.numOunces = userLog.numOunces;
        return logEntry;
      });
  }
  calculateAverageOuncesPerDay() {
    const totalOunces = this.log.reduce((acc, day) => {
      acc += day.numOunces;
      return acc;
    }, 0);
    return totalOunces / this.log.length;
  }
  calculateOuncesConsumedOnDate(day) {
    const daysLogEntry = this.log.find(logEntry => logEntry.date === day);
    return daysLogEntry.numOunces;
  }
  calculateWeeklyConsumption(day) {
    const weeklyLog = {};
    const dateIndex = this.log.findIndex(logEntry => logEntry.date === day);
    const weekOfEntries = this.log.slice(dateIndex - 6 || 0, dateIndex + 1 || this.log.length + 1);
    weekOfEntries.forEach(entry => {
      const dateOfEntry = entry.date;
      weeklyLog[dateOfEntry] = entry.numOunces;
    });
    return weeklyLog;
  }
}

module.exports = HydrationLog;