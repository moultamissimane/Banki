const { Router } = require("express");
const { check } = require("express-validator");
const { loginController } = require("../Controllers/LoginController");
const validateFields = require("../Middlewares/ValidateFields");

const router = Router();

router.post(
  "/",
  [check("email").isEmail(), check("password").notEmpty(), validateFields],
  loginController
);

module.exports = router;
