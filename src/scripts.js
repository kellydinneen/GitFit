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
var lastNightsSleepChart = document.querySelector('#sleep-data-last-night_chart');

let userRepo;

//event handlers
window.onload = openSite();

function openSite() {
  userRepo = new UserRepository(userData);
  displayUserDashboard(userRepo.users[10], '2019/09/22');
};

function displayUserDashboard(user, date) {
  user.getHydrationLog(hydrationData);
  user.getSleepLog(sleepData);
  displayUserInfo(user);
  greetUser(user);
  createHydrationChart(user, date);
  createSleepChart(user, date);
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
      labels: Object.keys(user.hydrationLog.calculateWeeklyConsumption(date)),
      datasets:[{
      label: 'none',
      data: Object.values(user.hydrationLog.calculateWeeklyConsumption(date)),
      backgroundColor: '#44BBA4',
      borderColor: "#061223",
      borderWidth: 1
      }]
    },
    options:{
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
  let chartData = {
    type: 'doughnut',
    data: {
      labels: ['Hours Slept'],
      datasets:[{
      label: 'none',
      data: [user.sleepLog.getLastNightsSleep(date, 'hoursSlept'), 12 - (user.sleepLog.getLastNightsSleep(date, 'hoursSlept'))],
      backgroundColor: ['#44BBA4', '#061223'],
      }]
    },
    options:{
      scales:{
        yAxes:[{
          ticks: {"beginAtZero":true}
        }],
      },
    },
  };
  let myChart = new Chart(lastNightsSleepChart, chartData);
}
