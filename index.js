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

const query = async (sql, options) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, options, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

async function start() {
  inquirer.prompt(initQuery).then((answers) => {
    console.log(answers);
    if (answers.initialOptions == "View All Departments") {
      pool.query(
        `SELECT * FROM department ORDER BY name LIMIT 9999 OFFSET 1`,
        (error, { rows }) => {
          if (error) {
            console.log(error);
            return;
          }
          console.table(rows);
          start();
        }
      );
    } else if (answers.initialOptions == "View All Roles") {
      pool.query(
        `SELECT role.title AS title, role.id AS id, department.name AS department_name, role.salary AS salary FROM role JOIN department ON role.department_id = department.id ORDER BY title LIMIT 9999 OFFSET 1;`,
        (error, { rows }) => {
          if (error) {
            console.log(error);
            return;
          }
          console.table(rows);
          start();
        }
      );
    } else if (answers.initialOptions == "View All Employees") {
      pool.query(
        `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS job_title, department.name AS department_name, role.salary AS salary, employee.manager_id AS manager_id
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id ORDER BY last_name ASC, first_name ASC LIMIT 9999 OFFSET 1;`,
        (error, { rows }) => {
          if (error) {
            console.log(error);
            return;
          }
          console.table(rows);
          start();
        }
      );
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
            console.log("New Department Added!");
            start();
          }
        );
      });
    } else if (answers.initialOptions === "Add a Role") {
      addRole().then((data) => {
        pool.query(
          `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`,
          [data.roleName, data.roleSalary, data.roleDept],
          (error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            console.log("New Role Added!");
            start();
          }
        );
      });
    } else if (answers.initialOptions === "Add an Employee") {
      addEmployee().then((data) => {
        pool.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,
          [
            data.newEmpFirst,
            data.newEmpLast,
            data.newEmpRole,
            data.newEmpManager,
          ],
          (error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            console.log("New Employee Added!");
            start();
          }
        );
      });
    } else if (answers.initialOptions === "Update an Employee") {
      updateEmployee().then((data) => {
        pool.query(
          `UPDATE employee SET role_id = $1, manager_id = $2 WHERE id = $3`,
          [data.updateEmpRole, data.updateEmpManager, data.updateEmpName],
          (error, data) => {
            if (error) {
              console.log(error);
              return;
            }
            console.log("Employee Updated!");
            start();
          }
        );
      });
    } else {
      process.exit();
    }
  });
}

start();
