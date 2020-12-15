
//query selectors
const displayDate = document.querySelector('#date');
const greeting = document.querySelector('#greeting');
const displayedUserName = document.querySelector('#user-name');
const displayedUserStepGoal = document.querySelector('#user-step-goal');
const displayedUserStepGoalComparison = document.querySelector('#user-step-goal_comparison');
const displayedUserFriendsList = document.querySelector('#user-friends-list');
var weeklyHydrationChart = document.querySelector('#hydration-data-week_chart').getContext('2d');
var lastNightsSleepQualityChart = document.querySelector('#sleep-data-last-night-quality_chart');
var lastNightsSleepQualityValue = document.querySelector('#sleep-data-last-night-quality_value');
var allTimeSleepQualityChart = document.querySelector('#sleep-data-all-time-quality_chart');
var allTimeSleepQualityValue = document.querySelector('#sleep-data-all-time-quality_value');
var weekOfSleepChart = document.querySelector('#sleep-data-week_chart');
var todaysActivityMinutes = document.querySelector('#activity-data_today-minutes');
var todaysStepCount = document.querySelector('#activity-data_today-steps');
var todaysDistanceWalked = document.querySelector('#activity-data_today-distance');
var weekOfActivityChart = document.querySelector('#activity-data-week_chart');
var todaysHydration = document.querySelector('#hydration-data_today_chart');
var todaysHydrationValue = document.querySelector('#hydration-data_today_number');


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
  createTodaysSleepChart(user, date);
  lastNightsSleepQualityValue.innerText = `${user.wellnessLog.getTodaysStat(date, 'sleep', 'sleepQuality')} out  of 5`;
  allTimeSleepQualityValue.innerText = `${user.wellnessLog.calculateAllTimeAverage('sleep', 'sleepQuality')} out  of 5`;
  todaysHydrationValue.innerText = `${(user.wellnessLog.getTodaysStat(date, 'hydration', 'numOunces') / 8).toFixed(1)} out of 10 cups`
  createAllTimeSleepChart(user, date);
  createWeeklySleepChart(user, date);
  createWeeklyActivityChart(user, date);
  createDailyHydrationChart(user, date)
}

function greetUser(user, date) {
  greeting.innerText = `Hello, ${user.getFirstName()}!`;
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

Chart.defaults.global.defaultFontFamily = 'Josefin Sans', sans-serif;

function createHydrationChart(user, date) {
  let chartData = {
    type: 'bar',
    data: {
      labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'hydration', 'numOunces')),
      datasets:[{
      label: 'ounces',
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'hydration', 'numOunces')),
      backgroundColor: '#7398C4',
      borderColor: "#061223",
      borderWidth: 1
      }]
    },
    options:{
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      responsive: true,
      title: {
            fontSize: 16,
            fontColor: '#081D36',
            display: true,
            text: 'This Week\'s Hydration'
      },
      scales:{
        yAxes:[{
          scaleLabel: {
            display: true,
            labelString: 'ounces'
          },
          ticks: {"beginAtZero":true, maxTicksLimit: 8}
        }],
      },
    },
  };
  let myChart = new Chart(weeklyHydrationChart, chartData);
}

function createTodaysSleepChart(user, date) {
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
      legend: {
        display: false
      },
      title: {
            display: true,
            text: 'Quality'
      },
      responsive: true,
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
      legend: {
        display: false
      },
      title: {
            display: true,
            text: 'Average Quality'
      },
      responsive: true,
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
      label: 'quality',

      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'sleep', 'sleepQuality')),
      yAxisID: 'yAxis2',
      backgroundColor: '#791289',
      borderColor: "#061223",
      borderWidth: 1
      },
      {
      label: 'duration',
      data: Object.values(user.wellnessLog.getWeekOfStats(date, 'sleep', 'hoursSlept')),
      backgroundColor: '#AD94CD',
      borderColor: "#061223",
      borderWidth: 1
      }],
    },
    options:{
      maintainAspectRatio: false,
      responsive: true,
      title: {
        fontColor: '#081D36',
        fontSize: 16,
        display: true,
        text: 'Weekly Sleep'
      },
      scales:{
        yAxes:[{
          scaleLabel: {
            display: true,
            labelString: 'hours'
          },
          ticks: {"beginAtZero":true, maxTicksLimit: 8}
        },
        {
          scaleLabel: {
            display: true,
            labelString: 'quality'
          },
          id: 'yAxis2',
          position: 'right',
          ticks: {"beginAtZero":true, maxTicksLimit: 8, suggestedMax: 5},
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
        label: 'minutes active',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'minutesActive')),
        backgroundColor: '#D45E5E',
        borderColor: "#061223",
        borderWidth: 1
        },
        {
        label: 'stairs climbed',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'flightsOfStairs')).map(value => value * 10),
        backgroundColor: '#EDC610',
        borderColor: "#061223",
        borderWidth: 1
        },
        {
        label: 'steps',
        data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'numSteps')),
        yAxisID: 'yAxis2',
        backgroundColor: '#F79D03',
        borderColor: "#061223",
        borderWidth: 1
        },
      ]
    },
    options:{
      maintainAspectRatio: false,
      responsive: true,
      title: {
        fontColor: '#081D36',
        fontSize: 16,
        display: true,
        text: 'Weekly Activity'
      },
      scales:{
        yAxes:[{
          ticks: {"beginAtZero":true, maxTicksLimit: 8},
          scaleLabel: {
            display: true,
            labelString: 'stairs / active minutes'
          },
          position: 'left',
          gridLines: {'display': false}
        },
        {
          ticks: {"beginAtZero":true, maxTicksLimit: 8},
          scaleLabel: {
            display: true,
            labelString: 'number of steps'
          },
          id: 'yAxis2',
          position: 'right',
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
  let upperLimit = 80;
  let chartData = {
    type: 'doughnut',
    data: {
      labels: ['ounces'],
      datasets:[{
      label: {display: false},
      data: [ouncesValue, upperLimit - ouncesValue >= 0? upperLimit - ouncesValue : 0],
      backgroundColor: ['#7398C4', '#E7E5DF'],
      borderWidth: 0
      }]
    },
    options:{
      legend: {
        display: false
      },
      maintainAspectRatio: false,
      responsive: true,
      title: {
        fontColor: '#081D36',
        fontSize: 16,
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
