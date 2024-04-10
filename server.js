const fs = require("fs");
const routes = require("./routes");
const inquirer = require("inquirer");
const sequelize = require("./config/connection");
const express = require("express");
const Department = require("./models/department");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

const {
  initQuery,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
} = require("./assets/js/queries");


async () => {
  try {
    const departments = await Department.findAll();
    console.log(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
  }
};

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now Listening"));
});