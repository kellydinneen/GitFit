class ActivityRepository {
  constructor(activityData) {
    this.allUsersActivity = activityData;
  }

  calculateAllUserDailyAverage(day, type) {
    let users = [];
    this.allUsersActivity.forEach(entry => {
      if (!users.includes(entry.userID) && entry.date === day) {
        users.push(entry.userID);
      }
    });

    const allUsersActivityTypeTotal = this.allUsersActivity.reduce((acc, entry) => {
        if (entry.date === day) {
          acc += entry[type];
        }
        return acc;
      }, 0);

    return allUsersActivityTypeTotal / users.length;
  };

  getActivityRank(user, date, property) {
    let todaysActivity = this.allUsersActivity.filter(entry => entry.date === date);
    let sortedActivity = todaysActivity.sort((a, b) => b[property] - a[property]);
    let currentUsersRank = sortedActivity.findIndex(entry => entry.userID === user.id);return currentUsersRank + 1;
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
};