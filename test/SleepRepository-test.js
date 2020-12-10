const { expect } = require('chai');
const chai = require('chai');
const expecet = chai.expect;

const SleepRepository = require('../src/SleepRepository.js');

describe('Sleep Repository', function() {
  let sleepRepo;

  beforeEach(function() {
    sleepRepo = new SleepRepository();
  });

  it.skip('should be a function', function() {
    expect(SleepRepository).to.be.be.a('function');
  });

  it.skip('should instantiate the Sleep Repository', function() {
    expect(sleepRepo).to.be.an.instanceOf(SleepRepository);
  });

  it.skip('should hold all of the sleep objects', function() {
    expect(sleepRepo.sleepData).to.deep.equal()
  });
})