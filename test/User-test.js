const chai = require('chai');
const expect = chai.expect; 

const User = require('../src/User.js');

describe('User', function () {
  let  userData, user1, user2; 

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
    user1 = new User(userData[0]);
    user2 = new User(userData[1]);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should instantiate User', function() {
    expect(user1).to.be.an.instanceOf(User);
  });

  it('should have an id', function() {
    expect(user1).to.have.property('id');
    expect(user2.id).to.equal(2);
    expect(user1.id).to.equal(1);
    expect(user1.id).to.not.equal(2);
  });

  it('should have a name', function() {
    expect(user1).to.have.property('name');
    expect(user2.name).to.equal('Jarvis Considine');
    expect(user1.name).to.equal('Luisa Hane');
  });

  it('should have an address', function() {
    expect(user1).to.have.property('address');
    expect(user2.address).to.equal('30086 Kathryn Port, Ciceroland NE 07273');
    expect(user1.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });
  
  it('should have an email', function() {
    expect(user1).to.have.property('email');
    expect(user2.email).to.equal('Dimitri.Bechtelar11@gmail.com');
    expect(user1.email).to.equal('Diana.Hayes1@hotmail.com');
  });
  
  it('should have a stride length', function() {
    expect(user1).to.have.property('strideLength');
    expect(user2.strideLength).to.equal(4.5);
    expect(user1.strideLength).to.equal(4.3);
  });
    
  it('should have a daily step goal', function() {
    expect(user1).to.have.property('dailyStepGoal');
    expect(user2.dailyStepGoal).to.equal(5000);
    expect(user1.dailyStepGoal).to.equal(10000);
  });
    
  it('should have a list of friends', function() {
    expect(user1).to.have.property('friends');
    expect(user2.friends).to.deep.equal([9, 18, 24, 19]);
    expect(user1.friends).to.deep.equal([16, 4, 8]);
  });

  it('should return their first name', function () {
    const userName1 = user1.getFirstName();
    const userName2 = user2.getFirstName();

    expect(userName1).to.equal('Luisa');
    expect(userName2).to.equal('Jarvis');
  });
});