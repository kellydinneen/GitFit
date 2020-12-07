const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('..src/UserRepository.js');


describe('UserRepository', function() {
  let userRepo;
  let userData;

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
      },
      {
        "id": 3,
        "name": "Herminia Witting",
        "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
        "email": "Elwin.Tromp@yahoo.com",
        "strideLength": 4.4,
        "dailyStepGoal": 5000,
        "friends": [
          19,
          11,
          42,
          33
        ]
      }
    ];

    userRepo = new UserRepository(userData);
  });

  it.skip('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it.skip('should instantiate UserRepository', function() {
    expect(userRepo).to.be.an.instanceOf(UserRepository);
  });

  it.skip('should hold collection of Users', function() {
    expect(userRepo.users[0]).to.be.an.instanceOf(User));
    expect(userRepo.users[1]).to.be.an.instanceOf(User));
    expect(userRepo.users[2]).to.be.an.instanceOf(User));
  });

  it.skip('users should have names', function() {
    expect(userRepo.users[0]).to.have.property('name');
    expect(userRepo.users[0].name).to.equal(userData[0].name);
  });

  it.skip('should return a users information', function() {
    const userInfo = userRepo.getUserInfo(1);
    expect(userInfo.name).to.equal(userData[0].name);
    expect(userInfo.address).to.equal(userData[0].address);
    expect(userInfo.friends).to.equal(userData[0].friends);
    expect(userInfo.email).to.equal(userData[0].email);
    expect(userInfo.dailyStepGoal).to.equal(userData[0].dailyStepGoal);
    expect(userInfo.strideLength).to.equal(userData[0].strideLength);
  });

  it.skip('should only return a users information if the user is in the repository', function() {
    const userInfo = userRepo.getUserInfo(4);
    expect(userInfo).to.be.undefined;
  });

  it.skip('should return average step goal of all users', function() {
    const averageStepGoal = userRepo.calculateAverageStepGoal();
    expect(averageStepGoal).to.equal(20000 / 3);
  });

});
