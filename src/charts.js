// charts

// all of the old drafts are still in this file but they are commented out at the bottom
// draft charts start at line 274

Chart.defaults.global.defaultFontFamily = 'Josefin Sans', 'sans-serif';

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
      borderWidth: 1,
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
      events: [],
      rotation: Math.PI
    },
  };
  let myChart = new Chart(todaysHydration, chartData);
}








// This is where the drafts start


// //DYNAMIC HALF-DOUGHNUT
// function createDailyChart(user, date, category, property, labels, colors, title, upperLimit, querySelector) {
//   let value = user.wellnessLog.getTodaysStat(date, category, property);
//   let chartData = {
//     type: 'doughnut',
//     data: {
//       labels: labels,
//       datasets:[{
//       label: false,
//       data: [value, upperLimit - value],
//       backgroundColor: colors,
//       borderWidth: 0
//       }]
//     },
//     options:{
//       title: {
//             display: true,
//             text: title
//       },
//       circumference: Math.PI,
//       events: [],
//       rotation: Math.PI
//     },
//   };
//   let myChart = new Chart(querySelector, chartData);
// }
// //OR DYNAMIC DATA + OPTIONS FOR DONUT:
// function createChartData(labels, data, colors) {
//   let charData = {
//     labels: labels,
//     datasets:[{
//     label: false,
//     data: data,
//     backgroundColor: colors,
//     borderWidth: 0
//   }];
//   return chartData;
// };

// function createChartOptions(title, type) {
//   let options = {
//     title: {
//           display: true,
//           text: title
//     },
//     circumference: Math.PI,
//     events: [],
//     rotation: Math.PI
//   };
//   return options;
// }

// //then inside chart generator function we could create charts like this:
// let myChart = new Chart(querySelector, {
//     type: type,
//     data: createChartData(labels, data, colors),
//     options: createChartOptions(title)
//   });
// }





// //NONDYNAMIC CHARTS
// //Activity: steps
// function createDailyStepsChart(user, date) {
//   let stepsValue = user.wellnessLog.getTodaysStat(date, 'activity', 'numSteps');
//   let upperLimit = 20000
//   let chartData = {
//     type: 'doughnut',
//     data: {
//       labels: labels,
//       datasets:[{
//       label: false,
//       data: [stepsValue, upperLimit - stepsValue],
//       backgroundColor: ['#44BBA4', '#E7E5DF'],
//       borderWidth: 0
//       }]
//     },
//     options:{
//       title: {
//             display: true,
//             text: 'Today\'s Steps'
//       },
//       circumference: Math.PI,
//       events: [],
//       rotation: Math.PI
//     },
//   };
//   let myChart = new Chart(xxxxxxxx, chartData);

// //Activity: minutes
//   function createDailyActivityMinutesChart(user, date) {
//     let activityValue = user.wellnessLog.getTodaysStat(date, 'activity', 'minutesActive');
//     let upperLimit = 200
//     let chartData = {
//       type: 'doughnut',
//       data: {
//         labels: labels,
//         datasets:[{
//         label: false,
//         data: [activityValue, upperLimit - activityValue],
//         backgroundColor: ['#44BBA4', '#E7E5DF'],
//         borderWidth: 0
//         }]
//       },
//       options:{
//         title: {
//               display: true,
//               text: 'Minutes Active Today'
//         },
//         circumference: Math.PI,
//         events: [],
//         rotation: Math.PI
//       },
//     };
//     let myChart = new Chart(xxxxxxxx, chartData);

// //Activity: distance
//     function createDailyDistanceChart(user, date) {
//       let distanceValue = user.wellnessLog.getTodaysStat(date, 'activity', 'distance');
//       let upperLimit = 10
//       let chartData = {
//         type: 'doughnut',
//         data: {
//           labels: labels,
//           datasets:[{
//           label: false,
//           data: [distanceValue, upperLimit - distanceValue],
//           backgroundColor: ['#44BBA4', '#E7E5DF'],
//           borderWidth: 0
//           }]
//         },
//         options:{
//           title: {
//                 display: true,
//                 text: 'Miles Walked Today'
//           },
//           circumference: Math.PI,
//           events: [],
//           rotation: Math.PI
//         },
//       };
//       let myChart = new Chart(xxxxxxxx, chartData);

// //Hydration: Daily
//       function createDailyHydrationChart(user, date) {
//         let ouncesValue = user.wellnessLog.getTodaysStat(date, 'hydration', 'numOunces');
//         let upperLimit = 64,
//         let chartData = {
//           type: 'doughnut',
//           data: {
//             labels: labels,
//             datasets:[{
//             label: false,
//             data: [ouncesValue, upperLimit - ouncesValue],
//             backgroundColor: ['#44BBA4', '#E7E5DF'],
//             borderWidth: 0
//             }]
//           },
//           options:{
//             title: {
//                   display: true,
//                   text: 'Today\'s Hydration'
//             },
//             circumference: Math.PI,
//             events: [],
//             rotation: Math.PI
//           },
//         };
//         let myChart = new Chart(xxxxxxxx, chartData);
//       }

//   //Activity Week
//   function createWeeklyActivityChart(user, date) {
//     let chartData = {
//       type: 'bar',
//       data: {
//         labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'activity', 'numSteps')),
//         datasets:[{
//         label: 'Number of Steps',
//         data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'numSteps')),
//         backgroundColor: '#44BBA4',
//         borderColor: "#061223",
//         borderWidth: 1
//         }],
//         datasets:[{
//         label: 'Minutes Active',
//         data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'minutesActive')),
//         backgroundColor: '#44BBA4',
//         borderColor: "#061223",
//         borderWidth: 1
//         }],
//         datasets:[{
//         label: 'Flights of Stairs Climbed',
//         data: Object.values(user.wellnessLog.getWeekOfStats(date, 'activity', 'flightsOfStairs')),
//         backgroundColor: '#44BBA4',
//         borderColor: "#061223",
//         borderWidth: 1
//         }]
//       },
//       options:{
//         title: {
//               display: true,
//               text: 'Weekly Activity: steps, activity minutes, and stairs'
//         },
//         scales:{
//           yAxes:[{
//             ticks: {"beginAtZero":true}
//           }],
//         },
//       },
//     };
//     let myChart = new Chart(xxxxxxxxxxxx, chartData);
//   };



//   //Sleep Week : As bar
//   function createWeeklySleepChart(user, date) {
//     let chartData = {
//       type: 'bar',
//       data: {
//         labels: Object.keys(user.wellnessLog.getWeekOfStats(date, 'sleep', 'sleepQuality')),
//         datasets:[{
//         label: 'Sleep Quality',
//         data: Object.values(user.wellnessLog.getWeekOfStats(date, 'sleep', 'sleepQuality')),
//         backgroundColor: '#44BBA4',
//         borderColor: "#061223",
//         borderWidth: 1
//         }],
//         datasets:[{
//         label: 'Sleep Duration',
//         data: Object.values(user.wellnessLog.getWeekOfStats(date, 'sleep', 'hoursSlept')),
//         backgroundColor: '#44BBA4',
//         borderColor: "#061223",
//         borderWidth: 1
//         }],
//       },
//       options:{
//         title: {
//               display: true,
//               text: 'Weekly Sleep Duration and Quality'
//         },
//         scales:{
//           yAxes:[{
//             ticks: {"beginAtZero":true}
//           }],
//         },
//       },
//     };
//     let myChart = new Chart(weekOfSleepChart, chartData);
//   };
