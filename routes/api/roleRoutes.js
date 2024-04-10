const router = require("express").Router();
const { Department, Employee, Role } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const roleData = await Role.findAll();
    res.status(200).json(roleData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
