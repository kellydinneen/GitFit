const { expect } = require('chai');
const chai = require('chai');
const expect = chai.expect;

const SleepRepository = require('../src/SleepRepository.js');

describe('Sleep Repository', function() {
  let sleepRepo;
  let sleepData;

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
    // sleepRepo = new SleepRepository(sleepData);
  });

  it.skip('should be a function', function() {
    expect(SleepRepository).to.be.a('function');
  });

  it.skip('should instantiate the Sleep Repository', function() {
    expect(sleepRepo).to.be.an.instanceOf(SleepRepository);
  });

  it.skip('should hold all of the sleep objects', function() {
    expect(sleepRepo.sleep).to.deep.equal(sleepData);
  });

  it.skip('should find all user\'s average sleep quality', function() {
    const averageQuality = sleepRepo.calculateAllUsersAverageSleepQuality();
    expect(averageQuality).to.equal(2.9);
  });

  it.skip('should find all users whose average sleep quality is greater than 3 for a given week', function() {
    const highestQuality = sleepRepo.findWeeksGoodSleepers('2019/06/21');
    expect(highestQuality).to.deep.equal([2]);
  });

  it.skip('should only find users whose average sleep quality for a given week is greater than 3', function() {
    const highestQuality = sleepRepo.findWeeksGoodSleepers('2019/06/21');
    expect(highestQuality).to.not.include(1);
  });

  it.skip('should find the user/users with the highest quality sleep for any given day', function() {
    const todaysHighestQualitySleep = sleepRepo.getHighestSleepQuality('2019/06/21');
    expect(todaysHighestQualitySleep).to.deep.equal(1);
  });
});
