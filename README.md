## WorkPatterns Technical Challenge

In this challenge you will add new functionality to the codebase in this repository. Please fork the repository with your solution to the challenge and email us a link to your fork. There is no strict deadline for this challenge, but it should take no more than 4 hours to complete.

## Problem Statement

A key element of WorkPatterns is the discussion topic, which represents something that a user wants to discuss with their teammates. Discussion topics can be created, marked complete, deleted and have subtopics added to them, as shown in the video below:
![Alt Text](https://i.imgur.com/e0SFSs3.gif)


In this challenge, you will take a very simple application that can only create discussion topics and mark them as complete, and add three new pieces of functionality:

1. In the starter code, discussion topics are completed and uncompleted by clicking their checkbox button. A completed discussion topic has a green checkbox. Please add additional functionality so that all completed discussion topics are placed in a separate list below the uncompleted topics. Completed discussion topics should be ordered by when they were completed, with the most recently completed ones at the top. If a completed discussion topic is uncompleted, it should return to its original position in the list.

2. Add the ability to delete a discussion topic.

3. Add the ability to create subtopics for a discussion topic. Subtopics should appear directly below their parent discussion topic and be indented relative to the parent. Subtopics cannot have their own subtopics, i.e. the nesting of discussion topics is only 1 level deep. Subtopics obey the following rules:
    - If the parent topic of a sub-topic is completed, then the sub-topic is also completed.
    - If a subtopic is un-completed, then its parent topic is also un-completed.
    - If the parent topic of a subtopic is deleted, then the subtopic is also deleted.

## How to run the app
1. Clone the app
2. Run `yarn` to install packages
3. Run `yarn start` and navigate to localhost.


## Available Scripts
NOTE: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
