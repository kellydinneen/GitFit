class WellnessLog {
  constructor(hydrationData, sleepData, activityData, id) {
    this.userID = id;
    this.hydrationLog = hydrationData.filter(log => log.userID === id);
    this.sleepLog = sleepData.filter(log => log.userID === id);
    this.activityLog = activityData.filter(log => log.userID === id);
      });
  }

  //TODAY
  calculateOuncesConsumedOnDate(day, log, property) {
    const daysLogEntry = log.find(logEntry => logEntry.date === day);
    return daysLogEntry[property];
  }

  //THIS WEEK
  //log could be: this.hydrationLog, this.sleepLog, or this.activityLog
  calculateWeeklyConsumption(day, wellnessCategory, property) {
    const weeklyLog = {};
    const dateIndex = this[wellnessCategory].findIndex(logEntry => logEntry.date === day);
    const weekOfEntries = this[wellnessCategory].slice(dateIndex - 6 || 0, dateIndex + 1 || this[wellnessCategory]..length + 1);
    weekOfEntries.forEach(entry => {
      const dateOfEntry = entry.date;
      weeklyLog[dateOfEntry] = entry[property];
    });
    return weeklyLog;
  }

  //ALL TIME AVERAGES
  calculateAverageOuncesPerDay() {
    const totalOunces = this.log.reduce((acc, day) => {
      acc += day.numOunces;
      return acc;
    }, 0);
    return totalOunces / this.log.length;
  }

}

module.exports = WellnessLog;
