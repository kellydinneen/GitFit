//query selectors
const displayDate = document.querySelector('#date');
const greeting = document.querySelector('#greeting');
const displayedUserName = document.querySelector('#user-name');
const displayedUserStepGoal = document.querySelector('#user-step-goal');
const displayedUserStepGoalComparison = document.querySelector('#user-step-goal_comparison');
const displayedUserFriendsList = document.querySelector('#user-friends-list');
const weeklyHydrationChart = document.querySelector('#hydration-data-week_chart').getContext('2d');
const lastNightsSleepQualityChart = document.querySelector('#sleep-data-last-night-quality_chart');
const lastNightsSleepQualityValue = document.querySelector('#sleep-data-last-night-quality_value');
const allTimeSleepQualityChart = document.querySelector('#sleep-data-all-time-quality_chart');
const allTimeSleepQualityValue = document.querySelector('#sleep-data-all-time-quality_value');
const weekOfSleepChart = document.querySelector('#sleep-data-week_chart');
const todaysActivityMinutes = document.querySelector('#activity-data_today-minutes');
const todaysStepCount = document.querySelector('#activity-data_today-steps');
const todaysDistanceWalked = document.querySelector('#activity-data_today-distance');
const weekOfActivityChart = document.querySelector('#activity-data-week_chart');
const minutesRanking = document.querySelector('#activity-data_rank-minutes');
const distanceRanking = document.querySelector('#activity-data_rank-distance');
const stepsRanking = document.querySelector('#activity-data_rank-steps');
const todaysHydration = document.querySelector('#hydration-data_today_chart');
const todaysHydrationValue = document.querySelector('#hydration-data_today_number');


let userRepo;
let currentUser;
let activityRepo;

//event handlers
window.onload = openSite();

function openSite() {
  userRepo = new UserRepository(userData);
  activityRepo = new ActivityRepository(activityData);
  currentUser = userRepo.users[getRandomIndex(userRepo.users)];
  userRepo.getAllWellnessLogs();
  displayUserDashboard(currentUser, '2019/09/22');
};

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayUserDashboard(user, date) {
  displayUserInfo(user);
  greetUser(user, date);
  displayUserRankings(minutesRanking, user, date, 'minutesActive');
  displayUserRankings(stepsRanking, user, date, 'numSteps');
  displayUserRankings(distanceRanking, currentUser, date, 'flightsOfStairs');
  displayUserData(todaysActivityMinutes, user, date, 'activity', 'minutesActive');
  displayUserData(todaysStepCount, user, date, 'activity', 'numSteps');
  displayUserData(todaysDistanceWalked, user, date, 'activity', 'distance');
  createCharts(user, date);
}

function displayUserInfo(user) {
  displayedUserName.innerText = `${user.name}`;
  const averageStepGoal = userRepo.calculateAverageStepGoal();
  displayedUserStepGoalComparison.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`;
  displayedUserStepGoal.innerText = `${user.dailyStepGoal}`;
  displayedUserFriendsList.innerText = `${getFriendNames(user)}`;
}

function greetUser(user, date) {
  greeting.innerText = `Hello, ${user.getFirstName()}!`;
  displayDate.innerText = date;
};

function displayUserRankings(location, user, date, category) {
  location.innerText = activityRepo.getActivityRank(user, date, category);
}

function displayUserData(location, user, date, category, section) {
  location.innerText = user.wellnessLog.getTodaysStat(date, category, section, userRepo.users);
}

function createCharts(user, date) {
  createHydrationChart(user, date);
  createTodaysSleepChart(user, date);
  createAllTimeSleepChart(user, date);
  createWeeklySleepChart(user, date);
  createWeeklyActivityChart(user, date);
  createDailyHydrationChart(user, date);
  allTimeSleepQualityValue.innerText = `${user.wellnessLog.calculateAllTimeAverage('sleep', 'sleepQuality')} out  of 5`;
  todaysHydrationValue.innerText = `${(user.wellnessLog.getTodaysStat(date, 'hydration', 'numOunces') / 8).toFixed(1)} out of 10 cups`;
  lastNightsSleepQualityValue.innerText = `${user.wellnessLog.getTodaysStat(date, 'sleep', 'sleepQuality')} out  of 5`;
}

function getFriendNames(user) {
  const friendNameList = user.friends.map((friendID) => {
    let friend = userRepo.users.find((user) => user.id === friendID);
    return friend.getFirstName();
  });
  return friendNameList.join(', ');
};








