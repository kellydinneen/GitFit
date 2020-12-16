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
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
};