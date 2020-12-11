const chai = require('chai');
const expect = chai.expect;


const ActivityRepository = require('../src/ActivityRepository.js');
// const ActivityLog = require('../src/ActivityLog.js');
describe('UserRepository', function() {
  let activityData;

  beforeEach(function() {
    activityData = [
      {
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/15",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
    ];

    activityRepo = new ActivityRepository(activityData);
  });

  it('should be a function', function() {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should instantiate ActivityRepository', function() {
    expect(activityRepo).to.be.an.instanceOf(ActivityRepository);
  });

  it.skip('should organize user activity by date', function() {
    expect(activityRepo.allUserLog).to.be.an('object');
    expect(activityRepo.allUserLog).to.have.all.keys(['2019/06/15','2019/06/16']);
  });

  it.skip('should store activity for all users on each date', function() {
    var usersActivityOnFifteenth = activityRepo.allUserLog['2019/06/15'];
    expect(usersActivityOnFifteenth).to.be.an('object');
    expect(usersActivityOnFifteenth).to.have.all.keys([1,2,3]);
  });

  it.skip('should store all activity data for each user on a date', function() {
    var userOneActivityOnFifteenth = activityRepo.allUserLog['2019/06/15'][1];
    var userTwoActivityOnFifteenth = activityRepo.allUserLog['2019/06/15'][2];

    expect(userOneActivityOnFifteenth).to.be.an('object');
    expect(userOneActivityOnFifteenth).to.have.all.keys(["numSteps", "minutesActive",
    "flightsOfStairs"]);
    expect(userOneActivityOnFifteenth['flightsOfStairs']).to.equal(16);
    expect(userTwoActivityOnFifteenth['flightsOfStairs']).to.equal(10);
  });

  it('should calculate average number of steps for all users on a specific date', function() {
    expect(activityRepo.calculateAllUserDailyAverage('2019/06/15', 'numSteps')).to.equal(15273  / 3);
  });

  it('should calculate average minutes active for all users on a specific date', function() {
    expect(activityRepo.calculateAllUserDailyAverage('2019/06/15', 'minutesActive')).to.equal(394 / 3);
  });

  it('should calculate average stairs climbed for all users on a specific date', function() {
    expect(activityRepo.calculateAllUserDailyAverage('2019/06/15', 'flightsOfStairs')).to.equal(59 / 3);
  });

  it('should calculate all-user averages for a different date', function() {
    expect(activityRepo.calculateAllUserDailyAverage('2019/06/16', 'numSteps')).to.equal(14860 / 2);
    expect(activityRepo.calculateAllUserDailyAverage('2019/06/16', 'minutesActive')).to.equal(327 / 2);
    expect(activityRepo.calculateAllUserDailyAverage('2019/06/16', 'flightsOfStairs')).to.equal(45 / 2);
  });

});
