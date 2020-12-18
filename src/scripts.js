//query selectors
const dateDisplay = document.querySelector('#date');
const greeting = document.querySelector('#greeting');

const displayedUserName = document.querySelector('#user-name');
const displayedUserStepGoal = document.querySelector('#user-step-goal');
const displayedAverageUserStepGoal = document.querySelector('#user-step-goal_comparison');
const displayedUserFriendsList = document.querySelector('#user-friends-list');

const todaysActivityMinutes = document.querySelector('#activity-data_today-minutes');
const todaysStepCount = document.querySelector('#activity-data_today-steps');
const todaysDistanceWalked = document.querySelector('#activity-data_today-distance');
const minutesRanking = document.querySelector('#activity-data_rank-minutes');
const distanceRanking = document.querySelector('#activity-data_rank-distance');
const stepsRanking = document.querySelector('#activity-data_rank-steps');
const weekOfActivityChart = document.querySelector('#activity-data-week_chart');

const weeklyHydrationChart = document.querySelector('#hydration-data-week_chart').getContext('2d');
const todaysHydration = document.querySelector('#hydration-data_today_chart');
const todaysHydrationValue = document.querySelector('#hydration-data_today_number');

const lastNightsSleepHoursValue = document.querySelector('#sleep-data-last-night-hours_number');
const lastNightsSleepQualityChart = document.querySelector('#sleep-data-last-night-quality_chart');
const lastNightsSleepQualityValue = document.querySelector('#sleep-data-last-night-quality_value');
const allTimeSleepHoursValue = document.querySelector('#sleep-data-all-time-hours_number');
const allTimeSleepQualityChart = document.querySelector('#sleep-data-all-time-quality_chart');
const allTimeSleepQualityValue = document.querySelector('#sleep-data-all-time-quality_value');
const weekOfSleepChart = document.querySelector('#sleep-data-week_chart');

let userRepo;
let currentUser;
let activityRepo;

//eventhandlers and helpers
window.onload = openSite();

function openSite() {
  userRepo = new UserRepository(userData);
  activityRepo = new ActivityRepository(activityData);
  currentUser = userRepo.users[getRandomIndex(userRepo.users)];
  currentUser.getWellnessLog(hydrationData, sleepData, activityData);
  displayUserDashboard(currentUser, '2019/09/22');
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayUserDashboard(user, date) {
  displayUserInfo(user);
  greetUser(user, date);
  displayActivityData(user, date);
  displayHydrationData(user, date);
  displaySleepData(user, date);
}

function displayUserInfo(user) {
  const averageStepGoal = userRepo.calculateAverageStepGoal();
  displayedUserName.innerText = `${user.name}`;
  displayedAverageUserStepGoal.innerText = `The average daily step goal is ${averageStepGoal}`;
  displayedUserStepGoal.innerText = `${user.dailyStepGoal}`;
  displayedUserFriendsList.innerText = `${getFriendNames(user)}`;
}

function getFriendNames(user) {
  const friendNameList = user.friends.map((friendID) => {
    let friend = userRepo.users.find((user) => user.id === friendID);
    return friend.getFirstName();
  });
  return friendNameList.join(', ');
}

function greetUser(user, date) {
  greeting.innerText = `Hello, ${user.getFirstName()}!`;
  dateDisplay.innerText = date;
}

function displayActivityData(user, date) {
  displayUserActivityRankings(minutesRanking, user, date, 'minutesActive');
  displayUserActivityRankings(stepsRanking, user, date, 'numSteps');
  displayUserActivityRankings(distanceRanking, user, date, 'flightsOfStairs');
  displayDailyUserData(todaysActivityMinutes, user, date, 'activity', 'minutesActive');
  displayDailyUserData(todaysStepCount, user, date, 'activity', 'numSteps');
  displayDailyUserData(todaysDistanceWalked, user, date, 'activity', 'distance');
  createWeekOfActivityChart(user, date);
}

function displayUserActivityRankings(location, user, date, category) {
  location.innerText = `#${activityRepo.getActivityRank(user, date, category)}`;
}

function displaySleepData(user, date) {
  const sleepQuality = user.wellnessLog.getTodaysStat(date, 'sleep', 'sleepQuality');
  const averageSleepQuality = user.wellnessLog.calculateAllTimeAverage('sleep', 'sleepQuality');
  createSleepDonutChart(user, date, sleepQuality, 'quality', lastNightsSleepQualityChart);
  createSleepDonutChart(user, date, averageSleepQuality, 'average quality', allTimeSleepQualityChart);
  createWeekOfSleepChart(user, date);
  displayDailyUserData(lastNightsSleepHoursValue, user, date, 'sleep', 'hoursSlept');
  displaySleepDonutInfo(allTimeSleepQualityValue, averageSleepQuality);
  displaySleepDonutInfo(lastNightsSleepQualityValue, sleepQuality);
  allTimeSleepHoursValue.innerText = user.wellnessLog.calculateAllTimeAverage('sleep', 'hoursSlept');
}

function displaySleepDonutInfo(location, value) {
  location.innerText = `${value} out of 5`;
}

function displayHydrationData(user, date) {
  createHydrationChart(user, date);
  createWeekOfHydrationChart(user, date);
  todaysHydrationValue.innerText = `${(user.wellnessLog.getTodaysStat(date, 'hydration', 'numOunces') / 8).toFixed(1)} out of 10 cups`;
}

function displayDailyUserData(location, user, date, category, section) {
  location.innerText = user.wellnessLog.getTodaysStat(date, category, section, userRepo.users);
}


