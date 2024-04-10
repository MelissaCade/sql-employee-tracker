const router = require("express").Router();
const { Department, Employee, Role } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const departmentData = await Department.findAll();
    res.status(200).json(departmentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
