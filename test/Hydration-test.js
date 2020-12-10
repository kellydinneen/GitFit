const chai = require('chai');
const expect = chai.expect;

const HydrationLog = require('../src/HydrationLog.js');

describe('HydrationLog', function() {
  let hydrationData;

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

    userOneHydrationLogLog = new HydrationLog(hydrationData, 1);
    userTwoHydrationLogLog = new HydrationLog(hydrationData, 2);
  });

  it.skip('should be a function', function() {
    expect(HydrationLog).to.be.a('function');
  });

  it.skip('should instantiate Hydration', function() {
    expect(userOneHydrationLogLog).to.be.an.instanceOf(HydrationLog);
  });

  it.skip('should only have hydration stats for one user', function() {
    expect(userOneHydrationLog.log.length).to.equal(9);
    expect(userTwoHydrationLog.log.length).to.equal(2);
  });

  it.skip('should have users hydration stats for all recorded dates', function() {
    expect(userOneHydrationLog.log).to.have.all.keys('2019/06/15', '2019/06/16', '2019/06/17', '2019/06/18', '2019/06/19', '2019/06/20', '2019/06/21', '2019/06/22', '2019/06/23');
  });

  it.skip('should have hydration stats in order by date', function() {
    expect(userOneHydrationLog.log.keys()).to.have.ordered.members(['2019/06/15', '2019/06/16', '2019/06/17', '2019/06/18', '2019/06/19', '2019/06/20', '2019/06/21', '2019/06/22', '2019/06/23']);
    expect(userOneHydrationLog.log['2019/06/16']).to.equal(69));
    expect(userTwoHydrationLog.log['2019/06/17']).to.equal(96));
  });

  it.skip('can calculate the average fluid ounces consumed by user per day for all time', function() {
    expect(userOneHydrationLog.calculateAverageOuncesPerDay()).to.equal(573 / 9);
    expect(userTwoHydrationLog.calculateAverageOuncesPerDay()).to.equal(166 / 2);
  });

  it.skip('can calculate how many fluid ounces a user consumed on a specific date', function() {
    expect(userOneHydrationLog.calculateOuncesConsumedOnDate('2019/06/17')).to.equal(96);
    expect(userOneHydrationLog.calculateOuncesConsumedOnDate('2019/06/20')).to.equal(31);
  });

  it.skip('will not calculate how many fluid ounces a user consumed on a specific date if user does not have hydration data for that date', function() {
    expect(userTwoHydrationLog.calculateOuncesConsumedOnDate('2019/06/19')).to.be.undefined;
    expect(userOneHydrationLog.calculateOuncesConsumedOnDate('2019/06/27')).to.be.undefined;
  });

  it.skip('can calculate how many fluid ounces a user consumed on each day for the last 7 days', function() {
    expect(userOneHydrationLog.calculateWeeklyConsumption('2019/06/21')).to.deep.equal([91, 31, 20, 100, 96, 69, 37]);
    expect(userOneHydrationLog.calculateWeeklyConsumption('2019/06/22')).to.deep.equal([55, 91, 31, 20, 100, 96, 69]);
    expect(userTwoHydrationLog.calculateWeeklyConsumption('2019/06/22')).to.be.undefined;
  });

});
