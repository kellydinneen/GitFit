//DYNAMIC HALF-DOUGHNUT
function createDailyChart(user, date, category, property, labels, colors, title, upperLimit, querySelector) {
  let value = user.wellnessLog.getTodaysStat(date, category, property);
  let chartData = {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets:[{
      label: false,
      data: [value, upperLimit - value],
      backgroundColor: colors,
      borderWidth: 0
      }]
    },
    options:{
      title: {
            display: true,
            text: title
      },
      circumference: Math.PI,
      events: [],
      rotation: Math.PI
    },
  };
  let myChart = new Chart(querySelector, chartData);
}
//OR DYNAMIC DATA + OPTIONS FOR DONUT:
function createChartData(labels, data, colors) {
  let charData = {
    labels: labels,
    datasets:[{
    label: false,
    data: data,
    backgroundColor: colors,
    borderWidth: 0
  }];
  return chartData;
};

function createChartOptions(title, type) {
  let options = {
    title: {
          display: true,
          text: title
    },
    circumference: Math.PI,
    events: [],
    rotation: Math.PI
  };
  return options;
}

//then inside chart generator function we could create charts like this:
let myChart = new Chart(querySelector, {
    type: type,
    data: createChartData(labels, data, colors),
    options: createChartOptions(title)
  });
}





//NONDYNAMIC CHARTS
//Activity: steps
function createDailyStepsChart(user, date) {
  let stepsValue = user.wellnessLog.getTodaysStat(date, 'activity', 'numSteps');
  let upperLimit = 20000
  let chartData = {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets:[{
      label: false,
      data: [stepsValue, upperLimit - stepsValue],
      backgroundColor: ['#44BBA4', '#E7E5DF'],
      borderWidth: 0
      }]
    },
    options:{
      title: {
            display: true,
            text: 'Today\'s Steps'
      },
      circumference: Math.PI,
      events: [],
      rotation: Math.PI
    },
  };
  let myChart = new Chart(xxxxxxxx, chartData);

//Activity: minutes
  function createDailyActivityMinutesChart(user, date) {
    let activityValue = user.wellnessLog.getTodaysStat(date, 'activity', 'minutesActive');
    let upperLimit = 200
    let chartData = {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets:[{
        label: false,
        data: [activityValue, upperLimit - activityValue],
        backgroundColor: ['#44BBA4', '#E7E5DF'],
        borderWidth: 0
        }]
      },
      options:{
        title: {
              display: true,
              text: 'Minutes Active Today'
        },
        circumference: Math.PI,
        events: [],
        rotation: Math.PI
      },
    };
    let myChart = new Chart(xxxxxxxx, chartData);

//Activity: distance
    function createDailyDistanceChart(user, date) {
      let distanceValue = user.wellnessLog.getTodaysStat(date, 'activity', 'distance');
      let upperLimit = 10
      let chartData = {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets:[{
          label: false,
          data: [distanceValue, upperLimit - distanceValue],
          backgroundColor: ['#44BBA4', '#E7E5DF'],
          borderWidth: 0
          }]
        },
        options:{
          title: {
                display: true,
                text: 'Miles Walked Today'
          },
          circumference: Math.PI,
          events: [],
          rotation: Math.PI
        },
      };
      let myChart = new Chart(xxxxxxxx, chartData);

//Hydration: Daily
      function createDailyHydrationChart(user, date) {
        let ouncesValue = user.wellnessLog.getTodaysStat(date, 'hydration', 'numOunces');
        let upperLimit = 150
        let chartData = {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets:[{
            label: false,
            data: [ouncesValue, upperLimit - ouncesValue],
            backgroundColor: ['#44BBA4', '#E7E5DF'],
            borderWidth: 0
            }]
          },
          options:{
            title: {
                  display: true,
                  text: 'Today\'s Hydration'
            },
            circumference: Math.PI,
            events: [],
            rotation: Math.PI
          },
        };
        let myChart = new Chart(xxxxxxxx, chartData);

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
    let myChart = new Chart(xxxxxxxxxxxx, chartData);
  };



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
