const express = require("express");
const { UserController } = require("../../controllers/index");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/signin", UserController.signin);

module.exports = router;
