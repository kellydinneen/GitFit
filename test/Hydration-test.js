const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration.js');

describe('Hydration', function() {
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

    userOneHydration = new Hydration(hydrationData, 1);
    userTwoHydration = new Hydration(hydrationData, 2);
  });

  it.skip('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });

  it.skip('should instantiate Hydration', function() {
    expect(userOneHydration).to.be.an.instanceOf(Hydration);
  });

  it.skip('should only have hydration stats for one user', function() {
    expect(userOneHydration.hydrationCalendar.length).to.equal(3);
    expect(userTwoHydration.hydrationCalendar.length).to.equal(3);
  });

  it.skip('should have users hydration stats for all recorded dates', function() {
    expect(userOneHydration.hydrationCalendar).to.have.all.keys('2019/06/15', '2019/06/16', '2019/06/17');
  });

  it.skip('should have hydration stats in order by date', function() {
    //.keys() returns array of keys. This tests that elements of keys array include elements of this dates array, in order
    expect(userOneHydration.hydrationCalendar.keys()).to.have.ordered.members(['2019/06/15', '2019/06/16', '2019/06/17']);
    expect(userOneHydration.hydrationCalendar['2019/06/16']).to.equal(69));
    expect(userTwoHydration.hydrationCalendar['2019/06/17']).to.equal(96));
  });

  it.skip('can calculate the average fluid ounces consumed by user per day for all time', function() {
    expect(userOneHydration.calculateAverageOuncesPerDay()).to.equal(202 / 3);
  });

  it.skip('can calculate how many fluid ounces a user consumed on a specific date', function() {
    expect(userOneHydration.calculateOuncesConsumedOnDate('2019/06/17')).to.equal(96);
    expect(userOneHydration.calculateOuncesConsumedOnDate('2019/06/19')).to.be.undefined;
  });

  it.skip('can calculate how many fluid ounces a user consumed on each day for the last 7 days', function() {
    expect(userOneHydration.calculateOuncesConsumedOnDate('2019/06/17')).to.equal(96);
    expect(userOneHydration.calculateOuncesConsumedOnDate('2019/06/16')).to.equal(69);
  });


});
