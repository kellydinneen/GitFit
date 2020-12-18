---
# GitFit
###### Wanna get your health on? We can help! 
---

## Table of Contents
* [Introduction](#introduction)
* [Setup](#setup)
* [Features](#features)
* [Technologies](#technologies)
* [Deployment](#deployment)
* [Authors](#authors)

## Introduction

GitFit is a hub for tracking a user's health log. The user can document and keep track of their sleep, hydration, and activity to keep them motivated and determined to keep on keepin' on! 

#### Motivation

This was made so that a user can see their data displayed in a readable and orderly fashion. The details of this project are outlined in [this project spec](http://frontend.turing.io/projects/fitlit.html). 

## Setup

To get started on this project: 

1. should fork this repo - on the top right corner of this page, click the **Fork** button.
2. Clone down the repo by opening your terminal and running `git clone [remote-address]`
3. Once you have cloned the repo, change into the directory and install the project dependencies by running `npm install` in your terminal.
4. Run `open src/index.html` in the terminal to see the page. 
5. _**Git Fit!**_

## Features

The current user is randomly chosen from a `UserRepository` class upon the opening of the page. So, everytime the page is refreshed a different user's information and logged health statistics are displayed. 

<p align = "center">
<img src="https://i.imgur.com/AeJJaLA.png">
</p>

The page displays 4 differenct sections: 
1. User's Information
* Displays a percentage of the user's personal info.
2. User's Activity
* Displays the user's Activity stats for the most recent day and week as well as their rank among all of the users
3. User's Hydration
* Displays how much water a user drank on the latest day, assuming that the goal is to drink 10 cups, and their hydration log entries from the latest week.
4. User's Sleep
* Displays the quality of a user's sleep on a scale of 1 to 5 and the hours of sleep they got, assuming that 8 hours is the goal. These are displayed for the latest day, the latest week, and the user's all time average. 

The small question marks in the corners of some widgets are to explain the information that is displayed when hovered over. For example, the sleep charts' question mark shows that sleep quality is judged based on a scale of 0 to 5. 

The current user's information is displayed from a `User` class that is instantiated within the `UserRepository` class as soon as the page loads. Then the each user is assigned a `WellnessLog` object instance that contains all of the user's documented activity, hydration, and sleep data. Then, all users' data is logged into a `SleepRepository`, `ActivityRepository`, and `HydrationRepository`, where methods calculate information about all users' wellness data. 

Charts are used to display some of the user's data. The charts were created using `Chart js`.

The User Info Area displays a percentage of the user's personal info.


#### 

#### Continuous Improvement/Future Improvements
 In the next iteration we hope to add:
  * Update the date formats to make them more readable
  * Make drag-and-drop widgets to display all of the information that is readily available in the code 
  * Allow users to begin making profiles
---

## Technologies

1. Vanilla JavaScript
2. CSS 
3. HTML
4. `Chart js`
5. `Moment js`

## Deployment

The site can be reached at this [link](https://richardltyler.github.io/GitFit/src/index.html).

## Authors
<table>
    <tr>
        <td> Kelly Dinneen <a href="https://github.com/kellydinneen">GH</td>
        <td> Richard Tyler <a href="https://github.com/richardltyler">GH</td>
    </tr>
<td><img src="https://avatars3.githubusercontent.com/u/70412553?s=400&u=6889ab0a2470a8c4d85c90de53761b160bb9fea6&v=4" alt="Ms. Dinneen"
 width="150" height="auto" /></td>
 <td><img src="https://avatars3.githubusercontent.com/u/70095063?s=460&u=39c274f1a2fbb88cc013de61aa8307596a988255&v=4" alt="Mr. Tyler"
 width="150" height="auto" /></td>
</table>



