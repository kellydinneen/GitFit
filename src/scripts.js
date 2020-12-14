// const userData = require('../data/users.js');


//query selectors
const displayDate = document.querySelector('#date');
const greeting = document.querySelector('#greeting');
const displayedUserName = document.querySelector('#user-name');
const displayedUserEmail = document.querySelector('#user-email');
const displayedUserAddress = document.querySelector('#user-address');
const displayedUserStepGoalComparison = document.querySelector('#user-step-goal-comparison');
const displayedUserFriendsList = document.querySelector('#user-friends-list');
var weeklyHydrationChart = document.querySelector('#hydration-data-week_chart').getContext('2d');
var lastNightsSleepQualityChart = document.querySelector('#sleep-data-last-night_chart');
var allTimeSleepQualityChart = document.querySelector('#sleep-data-all-time_chart');
var weekOfSleepChart = document.querySelector('#sleep-data-week_chart');
var weekOfActivityChart = document.querySelector('#activity-data-week_chart');

let userRepo;

//event handlers
window.onload = openSite();

function openSite() {
  userRepo = new UserRepository(userData);
  displayUserDashboard(userRepo.users[10], '2019/09/22');
};

function displayUserDashboard(user, date) {
  user.getWellnessLog(hydrationData, sleepData, activityData);
  displayUserInfo(user);
  greetUser(user);
  createHydrationChart(user, date);
  createSleepChart(user, date);
  createAllTimeSleepChart(user, date);
  createWeeklySleepChart(user, date);
  createWeeklyActivityChart(user, date);
}

function greetUser(user) {
  greeting.innerText = `Hello, ${user.getFirstName()}`;
};

function displayUserInfo(user) {
  displayedUserName.innerText = `Name: ${user.name}`;
  displayedUserEmail.innerText = `Email: ${user.email}`;
  displayedUserAddress.innerText = `Address: ${user.address}`;
  const averageStepGoal = userRepo.calculateAverageStepGoal();
  // displayedUserStepGoalComparison.innerText = `Your daily step goal is ${user.dailyStepGoal} steps, which is ${calculatePercentDifference(user.dailyStepGoal, averageStepGoal)}% ${determineDifferenceDirection(user.dailyStepGoal, averageStepGoal)} than ${averageStepGoal} steps, the average daily step goal of GitFit users`;
  displayedUserFriendsList.innerText = `Friends: ${getFriendNames(user)}`;
}

function getFriendNames(user) {
  const friendNameList = user.friends.map((friendID) => {
    let friend = userRepo.users.find((user) => user.id === friendID);
    return friend.getFirstName();
  });
  return friendNameList.join(', ');
};

function calculatePercentDifference(a, b) {
  const exactPercentDifference =  (a - b) / b * 100;
  return exactPercentDifference.toFixed();
};

function determineDifferenceDirection(a, b) {
  return a - b < 0? 'lower':'higher';
}

function createHydrationChart(user, date) {
  let chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'hydration', 'numOunces')),
      datasets:[{
      label: false,
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'hydration', 'numOunces')),
      backgroundColor: '#44BBA4',
      borderColor: "#061223",
      borderWidth: 1
      }]
    },
    options:{
      title: {
            display: true,
            text: 'Hydration'
      },
      scales:{
        yAxes:[{
          ticks: {"beginAtZero":true}
        }],
      },
    },
  };
  let myChart = new Chart(weeklyHydrationChart, chartData);
}

function createSleepChart(user, date) {
  let sleepValue = user.wellnessLog.getTodaysStat(date, 'sleep', 'sleepQuality');
  let highestPossibleQuality = 5;
  let chartData = {
    type: 'doughnut',
    data: {
      labels: ['Sleep Quality'],
      datasets:[{
      label: false,
      data: [sleepValue, highestPossibleQuality - sleepValue],
      backgroundColor: ['#44BBA4', '#E7E5DF'],
      borderWidth: 0
      }]
    },
    options:{
      title: {
            display: true,
            text: 'Last Night\'s Sleep'
      },
      circumference: Math.PI,
      events: [],
      rotation: Math.PI
    },
  };
  let myChart = new Chart(lastNightsSleepQualityChart, chartData);
}

function createAllTimeSleepChart(user, date) {
  let sleepValue = user.wellnessLog.calculateAllTimeAverage('sleep', 'sleepQuality');
  let highestPossibleQuality = 5;
  let chartData = {
    type: 'doughnut',
    data: {
      labels: ['Sleep Quality'],
      datasets:[{
      label: false,
      data: [sleepValue, highestPossibleQuality - sleepValue],
      backgroundColor: ['#44BBA4', '#E7E5DF'],
      borderWidth: 0
      }]
    },
    options:{
      title: {
            display: true,
            text: 'All Time Sleep'
      },
      circumference: Math.PI,
      events: [],
      rotation: Math.PI
    },
  };
  let myChart = new Chart(allTimeSleepQualityChart, chartData);
}

 //Sleep Week : As bar
 function createWeeklySleepChart(user, date) {
  let chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'sleep', 'sleepQuality')),
      datasets:[{
      label: 'Sleep Quality',
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'sleep', 'sleepQuality')),
      backgroundColor: '#44BBA4',
      borderColor: "#061223",
      borderWidth: 1
      }],
      datasets:[{
      label: 'Sleep Duration',
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'sleep', 'hoursSlept')),
      backgroundColor: '#44BBA4',
      borderColor: "#061223",
      borderWidth: 1
      }],
    },
    options:{
      title: {
            display: true,
            text: 'Weekly Sleep Duration and Quality'
      },
      scales:{
        yAxes:[{
          ticks: {"beginAtZero":true}
        }],
      },
    },
  };
  let myChart = new Chart(weekOfSleepChart, chartData);
};

//Activity Week
function createWeeklyActivityChart(user, date) {
  let chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'activity', 'numSteps')),
      datasets:[{
      label: 'Number of Steps',
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'numSteps')),
      backgroundColor: '#44BBA4',
      borderColor: "#061223",
      borderWidth: 1
      }],
      datasets:[{
      label: 'Minutes Active',
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'minutesActive')),
      backgroundColor: '#44BBA4',
      borderColor: "#061223",
      borderWidth: 1
      }],
      datasets:[{
      label: 'Flights of Stairs Climbed',
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'flightsOfStairs')),
      backgroundColor: '#44BBA4',
      borderColor: "#061223",
      borderWidth: 1
      }]
    },
    options:{
      title: {
            display: true,
            text: 'Weekly Activity: steps, activity minutes, and stairs'
      },
      scales:{
        yAxes:[{
          ticks: {"beginAtZero":true}
        }],
      },
    },
  };
  let myChart = new Chart(weekOfActivityChart, chartData);
};