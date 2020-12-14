class WellnessLog {
  constructor(hydrationData, sleepData, activityData, id) {
    this.userID = id;
    this.hydration = hydrationData.filter(log => log.userID === id);
    this.sleep = sleepData.filter(log => log.userID === id);
    this.activity = activityData.filter(log => log.userID === id);
  }

  //wellnessCategory could be: 'hydrationLog', 'sleepLog', or 'activityLog'
  //property could be: 'numOunces' 'sleepQuality' 'hoursSlept' 'numSteps' 'minutesActive' 'flightsOfStairs'

  //TODAY
  getTodaysStat(day, wellnessCategory, property, userData) {
    const daysLogEntry = this[wellnessCategory].find(logEntry => logEntry.date === day);
    if (property === 'distance') {
      const user = userData.find(user => user.id === this.userID);
      const feetWalked = daysLogEntry.numSteps * user.strideLength;
      const distance = feetWalked / 5280;
      return parseFloat(distance.toFixed(2));
    } else {
      return daysLogEntry[property];
    }
  };

  //THIS WEEK
  getWeekOfStats(day, wellnessCategory, property) {
    const weeklyLog = {};
    const dateIndex = this[wellnessCategory].findIndex(logEntry => logEntry.date === day);
    const weekOfEntries = this[wellnessCategory].slice(dateIndex - 6 || 0, dateIndex + 1 || this[wellnessCategory].length + 1);
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

//Activity Only

  getTotalWeeklyActiveMinutes(date) {
    const weeksActiveMinutes = Object.values(this.getWeekOfStats(date, 'activity', 'minutesActive'));
      const totalMinutesActive = weeksActiveMinutes.reduce((acc, minutes) => {
        acc += minutes;
        return acc;
      }, 0);
      return totalMinutesActive;
  }

  evaluateStepGoal(date, userData) {
    const daysEntry = this.activity.find(entry => entry.date === date);
    const user = userData.find(user => user.id === this.userID);
    return daysEntry.numSteps >= user.dailyStepGoal;
  }

  findDaysWhenStepGoalWasMet(userData) {
    const daysWhenStepGoalWasMet = this.activity.filter(entry => this.evaluateStepGoal(entry.date, userData));
    const dates = daysWhenStepGoalWasMet.map(entry => {
      return entry.date;
    });
    return dates;
  }

  findStairClimbingRecord() {
    const record = this.activity.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
    return record[0].flightsOfStairs;
  }

}

module.exports = WellnessLog;
