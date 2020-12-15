
//query selectors
const displayDate = document.querySelector('#date');
const greeting = document.querySelector('#greeting');
const displayedUserName = document.querySelector('#user-name');
const displayedUserStepGoal = document.querySelector('#user-step-goal');
const displayedUserStepGoalComparison = document.querySelector('#user-step-goal_comparison');
const displayedUserFriendsList = document.querySelector('#user-friends-list');
var weeklyHydrationChart = document.querySelector('#hydration-data-week_chart').getContext('2d');
var lastNightsSleepQualityChart = document.querySelector('#sleep-data-last-night_chart');
var allTimeSleepQualityChart = document.querySelector('#sleep-data-all-time_chart');
var weekOfSleepChart = document.querySelector('#sleep-data-week_chart');
var todaysActivityMinutes = document.querySelector('#activity-data_today-minutes');
var todaysStepCount = document.querySelector('#activity-data_today-steps');
var todaysDistanceWalked = document.querySelector('#activity-data_today-distance');
var weekOfActivityChart = document.querySelector('#activity-data-week_chart');
var todaysHydration = document.querySelector('#hydration-data_today_chart');


let userRepo;
let currentUser;

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}



//event handlers
window.onload = openSite();

function openSite() {
  userRepo = new UserRepository(userData);
  currentUser = userRepo.users[getRandomIndex(userRepo.users)];
  console.log(currentUser);
  displayUserDashboard(currentUser, '2019/09/22');
};

function displayUserDashboard(user, date) {
  user.getWellnessLog(hydrationData, sleepData, activityData);
  displayUserInfo(user);
  greetUser(user, date);
  displayUserData(todaysActivityMinutes, user, date, 'activity', 'minutesActive');
  displayUserData(todaysStepCount, user, date, 'activity', 'numSteps');
  displayUserData(todaysDistanceWalked, user, date, 'activity', 'distance');
  createCharts(user, date);
}

function createCharts(user, date) {
  createHydrationChart(user, date);
  createSleepChart(user, date);
  createAllTimeSleepChart(user, date);
  createWeeklySleepChart(user, date);
  createWeeklyActivityChart(user, date);
  createDailyHydrationChart(user, date)
}

function greetUser(user, date) {
  greeting.innerText = `Hello, ${user.getFirstName()}`;
  displayDate.innerText = date;
};

function displayUserInfo(user) {
  displayedUserName.innerText = `${user.name}`;
  const averageStepGoal = userRepo.calculateAverageStepGoal();
  displayedUserStepGoalComparison.innerText = `The average daily step goal is ${userRepo.calculateAverageStepGoal()}`;
  displayedUserStepGoal.innerText = `${user.dailyStepGoal}`;
  displayedUserFriendsList.innerText = `${getFriendNames(user)}`;
}

function getFriendNames(user) {
  const friendNameList = user.friends.map((friendID) => {
    let friend = userRepo.users.find((user) => user.id === friendID);
    return friend.getFirstName();
  });
  return friendNameList.join(', ');
};

function displayUserData(location, user, date, category, section) {
  location.innerText = user.wellnessLog.getTodaysStat(date, category, section, userRepo.users);
}

function createHydrationChart(user, date) {
  let chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'hydration', 'numOunces')),
      datasets:[{
      label: 'ounces of water',
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'hydration', 'numOunces')),
      backgroundColor: '#7398C4',
      borderColor: "#061223",
      borderWidth: 1
      }]
    },
    options:{
      responsive: true,
      title: {
            display: true,
            text: 'This Week\'s Hydration'
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
      backgroundColor: ['#791289', '#E7E5DF'],
      borderWidth: 0
      }]
    },
    options:{
      responsive: true,
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
      labels: ['Average Sleep Quality'],
      datasets:[{
      label: false,
      data: [sleepValue, highestPossibleQuality - sleepValue],
      backgroundColor: ['#791289', '#E7E5DF'],
      borderWidth: 0
      }]
    },
    options:{
      responsive: true,
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
      yAxisID: 'yAxis2',
      backgroundColor: '#791289',
      borderColor: "#061223",
      borderWidth: 1
      },
      {
      label: 'Sleep Duration',
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'sleep', 'hoursSlept')),
      backgroundColor: '#AD94CD',
      borderColor: "#061223",
      borderWidth: 1
      }],
    },
    options:{
      responsive: true,
      title: {
            display: true,
            text: 'Weekly Sleep Duration and Quality'
      },
      scales:{
        yAxes:[{
          scaleLabel: {
            display: true,
            labelString: 'Hours and Quality'
          },
          ticks: {"beginAtZero":true}
        },
        {
          scaleLabel: {
            display: true,
            labelString: 'Quality'
          },
          id: 'yAxis2',
          position: 'right',
          ticks: {"beginAtZero": true},
          // callback: (value) => value * 5},
          gridLines: {'display': false}
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
      datasets:[
        {
        label: 'Minutes Active',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'minutesActive')),
        backgroundColor: '#D45E5E',
        borderColor: "#061223",
        borderWidth: 1
        },
        {
        label: 'Stairs Climbed',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'flightsOfStairs')).map(value => value * 10),
        backgroundColor: '#EDC610',
        borderColor: "#061223",
        borderWidth: 1
        },
        {
        label: 'Number of Steps',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'numSteps')),
        yAxisID: 'yAxis2',
        backgroundColor: '#F79D03',
        borderColor: "#061223",
        borderWidth: 1
        },
      ]
    },
    options:{
      responsive: true,
      title: {
            display: true,
            text: 'Weekly Activity: steps, activity minutes, and stairs'
      },
      scales:{
        yAxes:[{
          scaleLabel: {
            display: true,
            labelString: 'Stairs Climbed and Minutes Active'
          },
          position: 'left',
          ticks: {"beginAtZero": true},
          gridLines: {'display': false}
        },
        {
          scaleLabel: {
            display: true,
            labelString: 'Number of Steps'
          },
          id: 'yAxis2',
          position: 'right',
          ticks: {"beginAtZero": true},
          gridLines: {'display': false}
        }],
      },
    },
  };
  let myChart = new Chart(weekOfActivityChart, chartData);
};

//Hydration: Daily
function createDailyHydrationChart(user, date) {
  let ouncesValue = user.wellnessLog.getTodaysStat(date, 'hydration', 'numOunces');
  let upperLimit = 64;
  let chartData = {
    type: 'doughnut',
    data: {
      labels: ['ounces of water'],
      datasets:[{
      label: {display: false},
      data: [ouncesValue, upperLimit - ouncesValue],
      backgroundColor: ['#7398C4', '#E7E5DF'],
      borderWidth: 0
      }]
    },
    options:{
      responsive: true,
      title: {
            display: true,
            text: 'Today\'s Hydration'
      },
      circumference: 2 * Math.PI,
      // events: [],
      rotation: Math.PI
    },
  };
  let myChart = new Chart(todaysHydration, chartData);
}
