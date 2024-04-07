const sequelize = require("../config/connection");

const Department = require("../models/department");
const Employee = require("../models/employee");
const Role = require("../models/role");

const departmentSeedData = require("./departmentSeedData.json");
const employeeSeedData = require("./employeeSeedData.json");
const roleSeedData = require("./roleSeedData.json");

const seedDatabase = () => {
  return sequelize.sync({ force: true }).then(() => {
    Department.bulkCreate(departmentSeedData).then(() => {
      Role.bulkCreate(roleSeedData).then(() => {
        Employee.bulkCreate(employeeSeedData).then(() => {
          console.log("All Seeds Planted");
        });
      });
    });
  });

  process.exit(0);
};

seedDatabase();
