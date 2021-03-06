class WellnessLog {
  constructor(hydrationData, sleepData, activityData, id) {
    this.userID = id;
    this.hydration = hydrationData.filter(log => log.userID === id);
    this.sleep = sleepData.filter(log => log.userID === id);
    this.activity = activityData.filter(log => log.userID === id);
  }

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
  }

  getWeekOfStats(day, wellnessCategory, property) {
    const category = this[wellnessCategory];
    const weeklyLog = {};
    const dateIndex = category.findIndex(logEntry => logEntry.date === day);
    const weekOfEntries = category.slice(dateIndex - 6 ||  0, dateIndex + 1 || category.length + 1);
    weekOfEntries.forEach(entry => {
      const dateOfEntry = entry.date;
      weeklyLog[dateOfEntry] = entry[property];
    });
    return weeklyLog;
  }

  calculateAllTimeAverage(wellnessCategory, property) {
    const category = this[wellnessCategory];
    const total = category.reduce((acc, entry) => {
      acc += entry[property];
      return acc;
    }, 0);
    return (total / category.length).toFixed(1);
  }

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

if (typeof module !== 'undefined') {
  module.exports = WellnessLog;
}

