const express = require("express");
const { UserController } = require("../../controllers/index");
const { AuthMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post(
  "/signup",
  AuthMiddlewares.validateAuthRequest,
  UserController.createUser
);

router.post(
  "/signin",
  AuthMiddlewares.validateAuthRequest,
  UserController.signin
);

module.exports = router;
