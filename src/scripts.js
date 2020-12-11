// const userData = require('../data/users.js');

//query selectors
const displayDate = document.querySelector('#date');
const greeting = document.querySelector('#greeting');
const displayedUserName = document.querySelector('#user-name');
const displayedUserEmail = document.querySelector('#user-email');
const displayedUserAddress = document.querySelector('#user-address');
const displayedUserStepGoalComparison = document.querySelector('#user-step-goal-comparison');
const displayedUserFriendsList = document.querySelector('#user-friends-list');

let userRepo;

//event handlers
window.onload = openSite();

function openSite() {
  userRepo = new UserRepository(userData);
  displayUserDashboard(userRepo.users[10]);
};

function displayUserDashboard(user) {
  displayUserInfo(user);
  greetUser(user);
}

function greetUser(user) {
  greeting.innerText = `Hello, ${user.getFirstName()}`;
};

function displayUserInfo(user) {
  displayedUserName.innerText = `Name: ${user.name}`;
  displayedUserEmail.innerText = `Email: ${user.email}`;
  displayedUserAddress.innerText = `Address: ${user.address}`;
  const averageStepGoal = userRepo.calculateAverageStepGoal();
  displayedUserStepGoalComparison.innerText = `Your daily step goal is ${user.dailyStepGoal} steps, which is ${calculatePercentDifference(user.dailyStepGoal, averageStepGoal)}% ${determineDifferenceDirection(user.dailyStepGoal, averageStepGoal)} than ${averageStepGoal} steps, the average daily step goal of GitFit users`;
  displayedUserFriendsList.innerText = `Friends: ${getFriendNames(user)}`;
}

function getFriendNames(user) {
  const friendNameList = user.friends.map((friendID) => {
    let friend = userRepo.users.find((user) => user.id === friendID);
    return friend.getFirstName();
  });
  return friendNameList.join(', ');
};

function calculatePercentDifference(a, b) {
  const exactPercentDifference =  (a - b) / b * 100;
  return exactPercentDifference.toFixed();
};

function determineDifferenceDirection(a, b) {
  return a - b < 0? 'lower':'higher';
}
