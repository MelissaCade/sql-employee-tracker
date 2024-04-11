//connect to existing db tables
const Employee = require("../../models/employee");
const { Pool } = require("pg");
const util = require("util");

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
    client.query(sql, options, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

//follow-up question for adding a new role
const addRole = [
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
    choices: function () {
      query('SELECT NOW() AS "theTime"').then(({ rows }) => {
        console.log(rows[0].theTime);
        client.end();
      });
    },
  },
];

// choices: function () {
//   pool.query(
//     `SELECT id AS value, name as name FROM role`,
//     (error, { rows: choices }) => {
//       console.log(choices);
//       return choices;
//     }
//   );
// },

//follow-up question for adding a new employee
const addEmployee = [
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
    type: "input",
    message: "What is the new employee's role?",
    name: "newEmpRole",
  },
  {
    type: "input",
    message:
      "Who is the new employee's manager? (Enter the manager's employee number, or, if there is no manager, enter 'null'.",
    name: "newEmpManager",
  },
];

//follow-up question to update employee role
const updateEmployee = [
  {
    type: "list",
    message: "Please choose an employee.",
    choices: [
      //list of current employees pulled from sql employee table
    ],
  },
  {
    type: "list",
    message: "Please choose an updated role for this employee.",
    choices: [
      //list of current roles pulled from sql role table
    ],
  },
  {
    type: "list",
    message:
      "Please choose an updated manager for this employee. (If employee has no manager, choose 'null'.",
    choices: [
      //list of current employees pulled from sql employee table
      //null
    ],
  },
];

module.exports = {
  initQuery,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
};
