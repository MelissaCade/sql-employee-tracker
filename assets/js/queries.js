//connect to existing db tables
const Employee = require("../../models/employee");
const { Pool } = require("pg");
const util = require("util");
const inquirer = require("inquirer");

// const sequelize = require("./config/connection");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: process.env.DB_NAME,
});

pool.connect();
// const promisePool = util.promisify(pool.query);

//the starting query
const initQuery = [
  {
    type: "list",
    message: "Please choose an option:",
    name: "initialOptions",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee",
      "Exit",
    ],
  },
];

//follow-up question for adding a new department
const addDepartment = [
  {
    type: "input",
    message: "What is the name of the new department you'd like to add?",
    name: "name",
  },
];

const query = (sql, options) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, options, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

//follow-up question for adding a new role

async function addRole() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the new role you'd like to add?",
      name: "roleName",
    },
    {
      type: "input",
      message: "What is the salary for the new role?",
      name: "roleSalary",
    },
    {
      type: "list",
      message: "What department will the new role be in?",
      name: "roleDept",
      choices: await query(
        "SELECT id AS value, name AS name FROM department ORDER BY name ASC LIMIT 9999 OFFSET 1"
      ).then(({ rows }) => rows),
    },
  ]);
}

//follow-up question for adding a new employee
async function addEmployee() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is the new employee's first name?",
      name: "newEmpFirst",
    },
    {
      type: "input",
      message: "What is the new employee's last name?",
      name: "newEmpLast",
    },
    {
      type: "list",
      message: "What role will the new employee perform?",
      name: "newEmpRole",
      choices: await query(
        "SELECT id AS value, title AS name FROM role ORDER BY name ASC LIMIT 9999 OFFSET 1"
      ).then(({ rows }) => rows),
    },
    {
      type: "list",
      message: "Who is the new employee's manager?",
      name: "newEmpManager",
      choices: await query(
        "SELECT id AS value, concat(first_name, ' ', last_name) AS name FROM employee"
      ).then(({ rows }) => rows),
    },
  ]);
}

//follow-up question to update employee role
//use UPDATE command
async function updateEmployee() {
  return inquirer.prompt([
    {
      type: "list",
      message: "Please choose an employee.",
      name: "updateEmpName",
      choices: await query(
        "SELECT id AS value, concat(first_name, ' ', last_name) AS name FROM employee LIMIT 9999 OFFSET 1"
      ).then(({ rows }) => rows),
    },
    {
      type: "list",
      message: "Please choose an updated role for this employee.",
      name: "updateEmpRole",
      choices: await query(
        "SELECT id AS value, title AS name FROM role LIMIT 9999 OFFSET 1"
      ).then(({ rows }) => rows),
    },
    {
      type: "list",
      message: "Please choose an updated manager for this employee.",
      name: "updateEmpManager",
      choices: await query(
        "SELECT id AS value, concat(first_name, ' ', last_name) AS name FROM employee"
      ).then(({ rows }) => rows),
    },
  ]);
}

module.exports = {
  initQuery,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
};
