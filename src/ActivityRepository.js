class ActivityRepository {
  constructor(activityData) {
    this.allUsersActivity = activityData;
  }

  calculateAllUserDailyAverage(day, type) {
    let numberOfEntries = 0;
    const allUsersActivityTypeTotal = this.allUsersActivity.reduce((total, entry) => {
        if (entry.date === day) {
          total += entry[type];
          numberOfEntries += 1;
        }
        return total;
      }, 0);

    return allUsersActivityTypeTotal / numberOfEntries;
  };

  getActivityRank(user, date, property) {
    let todaysActivity = this.allUsersActivity.filter(entry => entry.date === date);
    let sortedActivity = todaysActivity.sort((a, b) => b[property] - a[property]);
    let currentUsersRank = sortedActivity.findIndex(entry => entry.userID === user.id);
    return currentUsersRank + 1;
  }
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
};
