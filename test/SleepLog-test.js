const chai = require('chai');
const expect = chai.expect;

const SleepLog = require('../src/SleepLog.js');
const User = require('../src/User.js');

describe('SleepLog', function() {
  let sleepLog, user1, user2;

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
    userData = [
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
    user1 = new User(userData[0]);
    user1.getSleepLog(sleepData, user1.userID);
    user2 = new User(userData[1]);
    user2.getSleepLog(sleepData, user2.userID);
    sleepLog = new SleepLog(sleepData, user1.id);
  });

  it('should be a function', function() {
    expect(SleepLog).to.be.a('function');
  });

  it('should instantiate the SleepLog class', function() {
    expect(user1.sleepLog).to.be.an.instanceOf(SleepLog);
    expect(user2.sleepLog).to.be.an.instanceOf(SleepLog);
  });

  it('should hold a list of sleep log entries', function() {
    const user1SleepData = sleepData.filter(entry => entry.userID === user1.id);
    const user2SleepData = sleepData.filter(entry => entry.userID === user2.id);
    expect(user1.sleepLog.log).to.deep.equal(user1SleepData);
    expect(user2.sleepLog.log).to.deep.equal(user2SleepData);
  }); 

  it('should calculate a user\'s all time average hours of sleep', function() {
    const averageHours = user1.sleepLog.calculateAllTimeAverageSleep('hoursSlept');
    const correctAnswer = (56.4 / 7).toFixed(1);
    expect(averageHours).to.equal(correctAnswer);
  });

  it('should calculate a user\'s all time average sleep quality', function() {
    const averageHours = user1.sleepLog.calculateAllTimeAverageSleep('sleepQuality');
    const correctAnswer = (18.3 / 7).toFixed(1);
    expect(averageHours).to.equal(correctAnswer);
  });

  it('should return how many hours a user slept last night', function() {
    const lastNightSleep = user1.sleepLog.getLastNightsSleep('2019/06/21', 'hoursSlept');
    expect(lastNightSleep).to.equal(7.8);
  });

  it('should return the user\'s sleep last night', function() {
    const lastNightSleep = user1.sleepLog.getLastNightsSleep('2019/06/21', 'sleepQuality');
    expect(lastNightSleep).to.equal(4.2);
  });

  it('should find how long a user slept for each night of the last week', function() {
    const weekOfSleepEntries = user1.sleepLog.getWeekOfSleepData('2019/06/21', 'hoursSlept');
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
    const weekOfSleepEntries = user2.sleepLog.getWeekOfSleepData('2019/06/21', 'hoursSlept');
    expect(weekOfSleepEntries).to.deep.equal({
      '2019/06/20': 7.0,
      '2019/06/21': 6.5
    });
  });

  it('should find a user\'s sleep quality for each night of the last week', function() {
    const weekOfSleepEntries = user1.sleepLog.getWeekOfSleepData('2019/06/21', 'sleepQuality');
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
    const weekOfSleepEntries = user2.sleepLog.getWeekOfSleepData('2019/06/21', 'sleepQuality');
    expect(weekOfSleepEntries).to.deep.equal({
      '2019/06/20': 3.9,
      '2019/06/21': 4.0
    });
  });

});