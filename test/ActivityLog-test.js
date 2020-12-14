const chai = require('chai');
const expect = chai.expect;

const ActivityLog = require('../src/ActivityLog.js');
const User = require('../src/User.js');

describe('ActivityLog', function() {
  let activityLog, user1, user2;

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
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 1,
        "date": "2019/06/19",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 1,
        "date": "2019/06/20",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 1,
        "date": "2019/06/21",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 1,
        "date": "2019/06/22",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
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
    user1.getActivityLog(activityData, user1.id);
    user2 = new User(userData[1]);
    user2.getActivityLog(activityData, user2.id);
    activityLog = new ActivityLog(activityData, user1.id);
  });

  it('should be a function', function() {
    expect(ActivityLog).to.be.a('function');
  });

  it('should instantiate the ActivityLog class', function() {
    expect(user1.activityLog).to.be.an.instanceOf(ActivityLog);
    expect(user2.activityLog).to.be.an.instanceOf(ActivityLog);
  });

  it('should hold a list of activity log entries', function() {
    const user1ActivityData = activityData.filter(entry => entry.userID === user1.id);
    const user2ActivityData = activityData.filter(entry => entry.userID === user2.id);
    expect(user1.activityLog.log).to.deep.equal(user1ActivityData);
    expect(user2.activityLog.log).to.deep.equal(user2ActivityData);
  });

  it('should return miles user walked on a given day', function() {
    //using number of steps and stridelength
    const milesWalked = user1.activityLog.getDistanceWalked('2019/06/16');
    //7402 * 4.3 /5280 = 6.02814393939
    expect(milesWalked).to.equal(6.03);
  });

  it('should return a user\'s active minutes on a given day', function() {
    const activeMinutes = user1.activityLog.getActiveMinutes('2019/06/16');
    expect(activeMinutes).to.equal(116);
  });

  it('should notify a user if they don\'t have data for a given day', function() {
    const activeMinutes = user2.activityLog.getActiveMinutes('2019/06/16');
    expect(activeMinutes).to.equal('You don\'t have any activity data for this day');
    const milesWalked = user2.activityLog.getDistanceWalked('2019/06/16');
    expect(milesWalked).to.equal('You don\'t have any activity data for this day');
  });


  it('should return a user\'s total active minutes for a given week', function() {
    const weeklyActiveMinutesTotal = user1.activityLog.getTotalWeeklyActiveMinutes('2019/06/22');
    expect(weeklyActiveMinutesTotal).to.equal(1097);
  });

  it('should notify a user if they don\'t have data for a week', function() {
    const weeklyActiveMinutesTotal = user2.activityLog.getTotalWeeklyActiveMinutes('2019/06/22');
    expect(weeklyActiveMinutesTotal).to.equal('You don\'t have any activity data for this week');
  });

  it('should know when user met step goal', function() {
    const stepGoalEvaluation = user1.activityLog.evaluateStepGoal('2019/06/18');
    expect(stepGoalEvaluation).to.be.true;
  });

  it('should know when user did not meet step goal', function() {
    const stepGoalEvaluation = user2.activityLog.evaluateStepGoal('2019/06/15');
    expect(stepGoalEvaluation).to.be.false;
  });

  it('should find all the days when user met step goal', function() {
    const stepGoalSuccesses = user1.activityLog.findDaysWhenStepGoalWasMet();
    expect(stepGoalSuccesses).to.deep.equal(["2019/06/18", "2019/06/20", "2019/06/21"]);
  });

  it('should return no days when a user never met step goal', function() {
    const stepGoalSuccesses = user2.activityLog.findDaysWhenStepGoalWasMet();
    expect(stepGoalSuccesses).to.deep.equal([]);
  });

  it('should find a user\'s all time stair climbing record', function() {
    const stairClimbingRecord = user1.activityLog.findStairClimbingRecord();
    expect(stairClimbingRecord).to.equal(33);
  });

  it('should find a different user\'s all time stair climbing record', function() {
    const stairClimbingRecord = user2.activityLog.findStairClimbingRecord();
    expect(stairClimbingRecord).to.equal(10);
  });

});
