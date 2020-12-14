class WellnessLog {
  constructor(hydrationData, sleepData, activityData, id) {
    this.userID = id;
    this.hydrationLog = hydrationData.filter(log => log.userID === id);
    this.sleepLog = sleepData.filter(log => log.userID === id);
    this.activityLog = activityData.filter(log => log.userID === id);
      });
  }

  //logCategory could be: 'hydrationLog', 'sleepLog', or 'activityLog'
  //property could be: 'numOunces' 'sleepQuality' 'hoursSlept' 'numSteps' 'minutesActive' 'flightsOfStairs'

  //TODAY
  getTodaysStat(day, logCategory, property) {
    const daysLogEntry = this[logCategory].find(logEntry => logEntry.date === day);
    return daysLogEntry[property];
  }

  //THIS WEEK
  getWeekOfStats(day, logCategory, property) {
    const weeklyLog = {};
    const dateIndex = this[logCategory].findIndex(logEntry => logEntry.date === day);
    const weekOfEntries = this[logCategory].slice(dateIndex - 6 || 0, dateIndex + 1 || this[logCategory]..length + 1);
    weekOfEntries.forEach(entry => {
      const dateOfEntry = entry.date;
      weeklyLog[dateOfEntry] = entry[property];
    });
    return weeklyLog;
  }


  //ALL TIME AVERAGES
  calculateAllTimeAverage(logCategory, property) {
    let total = 0;
    this[logCategory].forEach(entry => {
      total += entry[property];
    });
    return (total / this[logCategory].length).toFixed(1);
  }


}

module.exports = WellnessLog;
