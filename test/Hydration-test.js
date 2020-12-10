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

  it.skip('should have users hydration stats for all recorded dates', function() {
    expect(userOneHydrationLog.log).to.have.deep.members([
      {
        "date": "2019/06/15",
        "numOunces": 37
      },
      {
        "date": "2019/06/16",
        "numOunces": 69
      },
      {
        "date": "2019/06/17",
        "numOunces": 96
      },
      {
        "date": "2019/06/18",
        "numOunces": 100
      },
      {
        "date": "2019/06/19",
        "numOunces": 20
      },
      {
        "date": "2019/06/20",
        "numOunces": 31
      },
      {
        "date": "2019/06/21",
        "numOunces": 91
      },
      {
        "date": "2019/06/22",
        "numOunces": 55
      },
      {
        "date": "2019/06/23",
        "numOunces": 74
      }]);
    expect(userTwoHydrationLog.log).to.have.deep.members([
      {
        "date": "2019/06/15",
        "numOunces": 75
      },
      {
        "date": "2019/06/16",
        "numOunces": 91
      }]);
  });

  it.skip('should have hydration stats in order by date', function() {
    expect(userOneHydrationLog.log.keys()).to.have.ordered.members([
      {
        "date": "2019/06/15",
        "numOunces": 37
      },
      {
        "date": "2019/06/16",
        "numOunces": 69
      },
      {
        "date": "2019/06/17",
        "numOunces": 96
      },
      {
        "date": "2019/06/18",
        "numOunces": 100
      },
      {
        "date": "2019/06/19",
        "numOunces": 20
      },
      {
        "date": "2019/06/20",
        "numOunces": 31
      },
      {
        "date": "2019/06/21",
        "numOunces": 91
      },
      {
        "date": "2019/06/22",
        "numOunces": 55
      },
      {
        "date": "2019/06/23",
        "numOunces": 74
      }]);
  });

  it.skip('can calculate the average fluid ounces consumed by user per day for all time', function() {
    expect(userOneHydrationLog.calculateAverageOuncesPerDay()).to.equal(573 / 9);
    expect(userTwoHydrationLog.calculateAverageOuncesPerDay()).to.equal(166 / 2);
  });

  it.skip('can calculate how many fluid ounces a user consumed on a specific date', function() {
    expect(userOneHydrationLog.calculateOuncesConsumedOnDate('2019/06/16')).to.equal(69);
    expect(userOneHydrationLog.calculateOuncesConsumedOnDate('2019/06/20')).to.equal(31);
  });

  it.skip('can calculate how many fluid ounces a different user consumed on a specific date', function() {
    expect(userTwoHydrationLog.calculateOuncesConsumedOnDate('2019/06/16')).to.equal(91);
  });

  it.skip('will not calculate how many fluid ounces a user consumed on a specific date if user does not have hydration data for that date', function() {
    expect(userTwoHydrationLog.calculateOuncesConsumedOnDate('2019/06/19')).to.be.undefined;
    expect(userOneHydrationLog.calculateOuncesConsumedOnDate('2019/06/27')).to.be.undefined;
  });

  it.skip('can calculate how many fluid ounces a user consumed on each day for the last 7 days', function() {
    expect(userOneHydrationLog.calculateWeeklyConsumption('2019/06/21')).to.deep.equal([91, 31, 20, 100, 96, 69, 37]);
    expect(userOneHydrationLog.calculateWeeklyConsumption('2019/06/22')).to.deep.equal([55, 91, 31, 20, 100, 96, 69]);
  });

  it.skip('will not calculate how many fluid ounces a user consumed on each day for the last 7 days if user does not have data for last 7 days', function() {
    expect(userTwoHydrationLog.calculateWeeklyConsumption('2019/06/22')).to.be.undefined;
  });

});
