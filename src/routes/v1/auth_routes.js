const express = require("express");
const { AuthMiddlewares } = require("../../middlewares");
const { AuthController } = require("../../controllers");

const router = express.Router();

router.post("/validate", AuthMiddlewares.checkAuth, AuthController.validator);

module.exports = router;
