const router = require("express").Router();
const { Department, Employee, Role } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const employeeData = await Employee.findAll();
    res.status(200).json(employeeData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
