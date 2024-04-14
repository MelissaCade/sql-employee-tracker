# sql-employee-tracker

A command-line application to act as a content management system for an employee database.

## Description

This application takes in user data via the terminal to add employees, roles, and departments. It can also allow the user to view a current table of employees, roles, or departments in the terminal. Additionally, employees roles and managers can be updated.

## Demonstrations

<video controls src="assets/video_walkthrough/Recording 2024-04-11 233844.mp4" title="Demonstration Video"></video>

## Screenshots

[Initial Options](./assets/images/Screenshot%202024-04-11%20221404.jpg)

[View All Departments](./assets/images/Screenshot%202024-04-11%20221652.jpg)

[View All Roles](./assets/images/Screenshot%202024-04-11%20224434.jpg)

[View All Employees](./assets/images/Screenshot%202024-04-11%20224639.jpg)

[Add a Department, Role, and Employee](./assets/images/Screenshot%202024-04-11%20225047.jpg)

[Add a Department, Role, and Employee](./assets/images/Screenshot%202024-04-11%20225211.jpg)

[Update an Employee](./assets/images/Screenshot%202024-04-11%20225327.jpg)

## Installation

Navigate to the project directory and use "npm i" in your terminal to install all necessary node packages.

To create your database, type "psql -U postgres" in your terminal, then type "\i db/schema.sql", then "\q" to exit the postgres shell.

To seed your database, type "npm run seed" in your terminal.

## Usage

User should navigate to index.js, then type "node index.js" in their terminal.
User should then answer all prompts as they appear.

## Links

GitHub repository: https://github.com/MelissaCade/sql-employee-tracker

## Credits

This page uses the materials and resources provided in the University of Denver Coding Bootcamp. My tutor through DUBC, Eric, was especially helpful.

I also used the following websites as reference to figure out how to do everything:

stack overflow - https://stackoverflow.com/  
free code camp - https://www.freecodecamp.org/  
geeks for geeks - https://www.geeksforgeeks.org/  
mdn web docs - https://developer.mozilla.org/en-US/  
w3schools - https://www.w3schools.com/
