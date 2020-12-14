// const activityData = require('../data/activity.js');
class ActivityLog {
  constructor(activityData, id) {
    this.log = activityData.filter(entry => entry.userID === id);
    this.id = id;
  }

  getDistanceWalked(date) {
    const stepCount = this.log.find(entry => entry.date === date);
    if (!stepCount) {
      return 'You don\'t have any activity data for this day'
    } else {
      const user = userData.find(user => user.id === this.id);
      const feetWalked = stepCount.numSteps * user.strideLength;
      const distance = feetWalked / 5280;
      return parseFloat(distance.toFixed(2));
    }
  }

  getActiveMinutes(date) {
    const stepCount = this.log.find(entry => entry.date === date);
    if (!stepCount) {
      return 'You don\'t have any activity data for this day';
    } else {
      return stepCount.minutesActive;
    }
  }

  getTotalWeeklyActiveMinutes(date) {
    const dateIndex = this.log.findIndex((entry) => entry.date === date);
    if (dateIndex < 0) {
      return 'You don\'t have any activity data for this week';
    } else {
      const weeksEntries = this.log.slice((dateIndex -6 || 0), (dateIndex +1 || this.log.length));
      const totalMinutesActive = weeksEntries.reduce((acc, entry) => {
        acc += entry.minutesActive;
        return acc;
      }, 0);
      return totalMinutesActive;
    }
  }

  evaluateStepGoal(date) {
    const daysEntry = this.log.find(entry => entry.date === date);
    const user = userData.find(user => user.id === this.id);
    return daysEntry.numSteps >= user.dailyStepGoal;
  }

  findDaysWhenStepGoalWasMet() {
    const daysWhenStepGoalWasMet = this.log.filter(entry => this.evaluateStepGoal(entry.date));
    const dates = daysWhenStepGoalWasMet.map(entry => {
      return entry.date;
    });
    return dates;
  }

  findStairClimbingRecord() {
    const record = this.log.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs);
    return record[0].flightsOfStairs;
  }
}

module.exports = ActivityLog;