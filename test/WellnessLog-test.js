const chai = require('chai');
const expect = chai.expect;

const WellnessLog = require('../src/WellnessLog.js');
const User = require('../src/User.js');

let userData = [
  {
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [
      16,
      4,
      8
    ]
  },
  {
    "id": 2,
    "name": "Jarvis Considine",
    "address": "30086 Kathryn Port, Ciceroland NE 07273",
    "email": "Dimitri.Bechtelar11@gmail.com",
    "strideLength": 4.5,
    "dailyStepGoal": 5000,
    "friends": [
      9,
      18,
      24,
      19
    ]
  }
];

let user1 = new User(userData[0]);
let user2 = new User(userData[1]);

describe('WellnessLog', function() {

  let wellnessLog1, wellnessLog2;

  beforeEach(function() {
    user1.getWellnessLog([], [], []);
    wellnessLog1 = user1.wellnessLog;
    user2.getWellnessLog([], [], []);
    wellnessLog2 = user2.wellnessLog;
  });

  it('should be a function', function() {
    expect(WellnessLog).to.be.a('function');
  });

  it('should instantiate WellnessLog', function() {
    expect(wellnessLog1).to.be.an.instanceOf(WellnessLog);
  });

  it('should store user id', function() {
    expect(wellnessLog1.userID).to.equal(1);
  });

  it('should store different user id', function() {
    expect(wellnessLog2.userID).to.equal(2);
  });
});

describe('WellnessLog.sleep', function() {

  let sleepData, wellnessLog1, wellnessLog2;

  beforeEach(function() {
    sleepData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "hoursSlept": 4.1,
        "sleepQuality": 3.8
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "hoursSlept": 8,
        "sleepQuality": 2.6
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "hoursSlept": 10.4,
        "sleepQuality": 3.1
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "hoursSlept": 10.7,
        "sleepQuality": 1.2
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "hoursSlept": 9.3,
        "sleepQuality": 1.2
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "hoursSlept": 7.8,
        "sleepQuality": 4.2
      },
      {
        "userID": 2,
        "date": "2019/06/20",
        "hoursSlept": 7.0,
        "sleepQuality": 3.9
      },
      {
        "userID": 2,
        "date": "2019/06/21",
        "hoursSlept": 6.5,
        "sleepQuality": 4.0
      }
    ];

    user1.getWellnessLog([], sleepData, []);
    wellnessLog1 = user1.wellnessLog;
    user2.getWellnessLog([], sleepData, []);
    wellnessLog2 = user2.wellnessLog;
  });

  it('should hold a list of sleep entries', function() {
    const user1SleepData = sleepData.filter(entry => entry.userID === user1.id);
    const user2SleepData = sleepData.filter(entry => entry.userID === user2.id);
    expect(wellnessLog1.sleep).to.deep.equal(user1SleepData);
    expect(wellnessLog2.sleep).to.deep.equal(user2SleepData);
  });

  it('should calculate a user\'s all time average hours of sleep', function() {
    const averageHoursSlept = wellnessLog1.calculateAllTimeAverage('sleep','hoursSlept');
    const correctAnswer = (56.4 / 7).toFixed(1);
    expect(averageHoursSlept).to.equal(correctAnswer);
  });

  it('should calculate a user\'s all time average sleep quality', function() {
    const averageSleepQuality = wellnessLog1.calculateAllTimeAverage('sleep','sleepQuality');
    const correctAnswer = (18.3 / 7).toFixed(1);
    expect(averageSleepQuality).to.equal(correctAnswer);
  });

  it('should return how many hours a user slept last night', function() {
    const lastNightSleepTime = wellnessLog1.getTodaysStat('2019/06/21', 'sleep','hoursSlept');
    expect(lastNightSleepTime).to.equal(7.8);
  });

  it('should return the user\'s sleep quality from last night', function() {
    const lastNightSleepQuality = wellnessLog1.getTodaysStat('2019/06/21', 'sleep','sleepQuality');
    expect(lastNightSleepQuality).to.equal(4.2);
  });

  it('should find how long a user slept for each night of the last week', function() {
    const weekOfSleepEntries = wellnessLog1.getWeekOfStats('2019/06/21', 'sleep','hoursSlept');
    expect(weekOfSleepEntries).to.deep.equal({
      '2019/06/15': 6.1,
      '2019/06/16': 4.1,
      '2019/06/17': 8,
      '2019/06/18': 10.4,
      '2019/06/19': 10.7,
      '2019/06/20': 9.3,
      '2019/06/21': 7.8
    });
  });

  it('should find a user\'s hours of sleep for each night of the last week even if they have less than a week of entries', function() {
    const weekOfSleepEntries = wellnessLog2.getWeekOfStats('2019/06/21', 'sleep','hoursSlept');
    expect(weekOfSleepEntries).to.deep.equal({
      '2019/06/20': 7.0,
      '2019/06/21': 6.5
    });
  });

  it('should find a user\'s sleep quality for each night of the last week', function() {
    const weekOfSleepEntries = wellnessLog1.getWeekOfStats('2019/06/21', 'sleep','sleepQuality');
    expect(weekOfSleepEntries).to.deep.equal({
      '2019/06/15': 2.2,
      '2019/06/16': 3.8,
      '2019/06/17': 2.6,
      '2019/06/18': 3.1,
      '2019/06/19': 1.2,
      '2019/06/20': 1.2,
      '2019/06/21': 4.2
    });
  });

  it('should find a user\'s sleep quality for each night of the last week even if they have less than a week of entries', function() {
    const weekOfSleepEntries = wellnessLog2.getWeekOfStats('2019/06/21', 'sleep','sleepQuality');
    expect(weekOfSleepEntries).to.deep.equal({
      '2019/06/20': 3.9,
      '2019/06/21': 4.0
    });
  });

});

describe('WellnessLog.hydration', function() {

  let hydrationData, wellnessLog1, wellnessLog2;

  beforeEach(function() {
    hydrationData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numOunces": 37
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numOunces": 75
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numOunces": 69
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "numOunces": 91
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numOunces": 96
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numOunces": 100
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "numOunces": 20
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "numOunces": 31
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "numOunces": 91
      },
      {
        "userID": 1,
        "date": "2019/06/22",
        "numOunces": 55
      },
      {
        "userID": 1,
        "date": "2019/06/23",
        "numOunces": 74
      }
    ];

    user1.getWellnessLog(hydrationData, [], []);
    wellnessLog1 = user1.wellnessLog;
    user2.getWellnessLog(hydrationData, [], []);
    wellnessLog2 = user2.wellnessLog;
  });

  it('should have users hydration stats for all recorded dates', function() {
    const user1HydrationData = hydrationData.filter(entry => entry.userID === user1.id);
    const user2HydrationData = hydrationData.filter(entry => entry.userID === user2.id);
    expect(wellnessLog1.hydration).to.deep.equal(user1HydrationData);
    expect(wellnessLog2.hydration).to.deep.equal(user2HydrationData);
  });

  it('can calculate the average fluid ounces consumed by user per day for all time', function() {
    expect(wellnessLog1.calculateAllTimeAverage('hydration','numOunces')).to.equal('63.7');
  });

  it('can calculate the average fluid ounces consumed by different user per day for all time', function() {
    expect(wellnessLog2.calculateAllTimeAverage('hydration','numOunces')).to.equal('83.0');
  });

  it('can calculate how many fluid ounces a user consumed on a specific date', function() {
    expect(wellnessLog1.getTodaysStat('2019/06/16', 'hydration', 'numOunces')).to.equal(69);
    expect(wellnessLog1.getTodaysStat('2019/06/20', 'hydration', 'numOunces')).to.equal(31);
  });

  it('can calculate how many fluid ounces a different user consumed on a specific date', function() {
    expect(wellnessLog2.getTodaysStat('2019/06/16', 'hydration', 'numOunces')).to.equal(91);
  });

  it('can calculate how many fluid ounces a user consumed on each day for the last 7 days', function() {
    expect(wellnessLog1.getWeekOfStats('2019/06/21', 'hydration', 'numOunces')).to.deep.equal(
      {
        '2019/06/15': 37,
        '2019/06/16': 69,
        '2019/06/17': 96,
        '2019/06/18': 100,
        '2019/06/19': 20,
        '2019/06/20': 31,
        '2019/06/21': 91
      });
    expect(wellnessLog1.getWeekOfStats('2019/06/22', 'hydration', 'numOunces')).to.deep.equal(
      {
        '2019/06/16': 69,
        '2019/06/17': 96,
        '2019/06/18': 100,
        '2019/06/19': 20,
        '2019/06/20': 31,
        '2019/06/21': 91,
        '2019/06/22': 55
      });
  });

  it('will calculate how many fluid ounces a user consumed only on those of the last 7 days that have user data', function() {
    const userTwoWeekOfHydration = wellnessLog2.getWeekOfStats('2019/06/22', 'hydration', 'numOunces');
    expect(userTwoWeekOfHydration).to.have.all.keys(["2019/06/15", "2019/06/16"]);
    expect(userTwoWeekOfHydration['2019/06/22']).to.be.undefined;
    expect(userTwoWeekOfHydration['2019/06/16']).to.equal(91);
  });

});
