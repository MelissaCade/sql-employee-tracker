const inquirer = require("inquirer");
const fs = require("fs");
const { Pool } = require("pg");
const postgres = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: process.env.DB_NAME,
});

pool.connect();

const {
  initQuery,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
} = require("./assets/js/queries");

function start() {
  inquirer.prompt(initQuery).then((answers) => {
    console.log(answers);
    if (answers.initialOptions == "View All Departments") {
      pool.query(`SELECT * FROM department`, (error, { rows }) => {
        if (error) {
          console.log(error);
          return;
        }
        console.table(rows);
        start();
      });
    } else if (answers.initialOptions == "View All Roles") {
      pool.query(`SELECT * FROM role`, (error, { rows }) => {
        if (error) {
          console.log(error);
          return;
        }
        console.table(rows);
        start();
      });
    } else if (answers.initialOptions == "View All Employees") {
      pool.query(`SELECT * FROM employee`, (error, { rows }) => {
        if (error) {
          console.log(error);
          return;
        }
        console.table(rows);
        start();
      });
    } else if (answers.initialOptions == "Add a Department") {
      inquirer.prompt(addDepartment).then((data) => {
        pool.query(
          `INSERT INTO department (name) VALUES ($1)`,
          [data.name],
          (error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            start();
          }
        );
      });
    } else if (answers.initialOptions === "Add a Role") {
      inquirer.prompt(addRole).then((data) => {
        console.log(data);
      });
    }
  });
}

start();
