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

    userOneHydrationLog = new HydrationLog(hydrationData, 1);
    userTwoHydrationLog = new HydrationLog(hydrationData, 2);
  });

  it('should be a function', function() {
    expect(HydrationLog).to.be.a('function');
  });

  it('should instantiate HydrationLog', function() {
    expect(userOneHydrationLog).to.be.an.instanceOf(HydrationLog);
  });

  it('should store user id', function() {
    expect(userOneHydrationLog.userID).to.equal(1);
  });

  it('should store different user id', function() {
    expect(userTwoHydrationLog.userID).to.equal(2);
  });

  it('should have users hydration stats for all recorded dates', function() {
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
  });

  it('should be able to have a different users hydration stats for all recorded dates', function() {
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

  it('should store hydration stats in order by date', function() {
    expect(userOneHydrationLog.log).to.have.deep.ordered.members([
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

  it('can calculate the average fluid ounces consumed by user per day for all time', function() {
    expect(userOneHydrationLog.calculateAverageOuncesPerDay()).to.equal(573 / 9);
  });

  it('can calculate the average fluid ounces consumed by different user per day for all time', function() {
    expect(userTwoHydrationLog.calculateAverageOuncesPerDay()).to.equal(166 / 2);
  });

  it('can calculate how many fluid ounces a user consumed on a specific date', function() {
    expect(userOneHydrationLog.calculateOuncesConsumedOnDate('2019/06/16')).to.equal(69);
    expect(userOneHydrationLog.calculateOuncesConsumedOnDate('2019/06/20')).to.equal(31);
  });

  it('can calculate how many fluid ounces a different user consumed on a specific date', function() {
    expect(userTwoHydrationLog.calculateOuncesConsumedOnDate('2019/06/16')).to.equal(91);
  });

  it('can calculate how many fluid ounces a user consumed on each day for the last 7 days', function() {
    expect(userOneHydrationLog.calculateWeeklyConsumption('2019/06/21')).to.deep.equal(
      {
        '2019/06/15': 37,
        '2019/06/16': 69,
        '2019/06/17': 96,
        '2019/06/18': 100,
        '2019/06/19': 20,
        '2019/06/20': 31,
        '2019/06/21': 91
      });
    expect(userOneHydrationLog.calculateWeeklyConsumption('2019/06/22')).to.deep.equal(
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
    const userTwoWeekOfHydration = userTwoHydrationLog.calculateWeeklyConsumption('2019/06/22');
    expect(userTwoWeekOfHydration).to.have.all.keys(["2019/06/15", "2019/06/16"]);
    expect(userTwoWeekOfHydration['2019/06/22']).to.be.undefined;
    expect(userTwoWeekOfHydration['2019/06/16']).to.equal(91);
  });
  
});
