const chai = require('chai');
const expect = chai.expect;

const SleepRepository = require('../src/SleepRepository.js');
const UserRepository = require('../src/UserRepository.js');

describe('Sleep Repository', function() {
  let sleepRepo, userRepo, sleepData, userData;

  beforeEach(function() {
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

    userRepo = new UserRepository(userData);
    sleepRepo = new SleepRepository(sleepData);
  });

  it('should be a function', function() {
    expect(SleepRepository).to.be.a('function');
  });

  it('should instantiate the Sleep Repository', function() {
    expect(sleepRepo).to.be.an.instanceOf(SleepRepository);
  });

  it('should hold data for all nights of sleep for all users', function() {
    expect(sleepRepo.sleepCollection).to.deep.equal(sleepData);
  });

  it('should find all user\'s average sleep quality', function() {
    const averageQuality = sleepRepo.calculateAllUsersAverageSleepQuality();
    expect(averageQuality.toFixed(2)).to.equal('2.91');
  });

  it('should find all users whose average sleep quality is greater than 3 for a given week', function() {
    const highestQuality = sleepRepo.findWeeksGoodSleepers('2019/06/21', userRepo);
    expect(highestQuality).to.deep.equal([2]);
  });

  it('should find the user/users who slept the longest on any given day', function() {
    const nightsLongestSleepers = sleepRepo.findNightsLongestSleepers('2019/06/21');
    expect(nightsLongestSleepers).to.deep.equal([1]);
  });
});
