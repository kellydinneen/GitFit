class WellnessLog {
  constructor(hydrationData, sleepData, activityData, id) {
    this.userID = id;
    this.hydration = hydrationData.filter(log => log.userID === id);
    this.sleep = sleepData.filter(log => log.userID === id);
    this.activity = activityData.filter(log => log.userID === id);
      });
  }

  //wellnessCategory could be: 'hydrationLog', 'sleepLog', or 'activityLog'
  //property could be: 'numOunces' 'sleepQuality' 'hoursSlept' 'numSteps' 'minutesActive' 'flightsOfStairs'

  //TODAY
  getTodaysStat(day, wellnessCategory, property) {
    const daysLogEntry = this[wellnessCategory].find(logEntry => logEntry.date === day);
    return daysLogEntry[property];
  }

  //THIS WEEK
  getWeekOfStats(day, wellnessCategory, property) {
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
  calculateAllTimeAverage(wellnessCategory, property) {
    let total = 0;
    this[wellnessCategory].forEach(entry => {
      total += entry[property];
    });
    return (total / this[wellnessCategory].length).toFixed(1);
  }


}

module.exports = WellnessLog;
