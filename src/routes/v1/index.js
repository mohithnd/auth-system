const express = require("express");
const { InfoController } = require("../../controllers/index");
const UserRoutes = require("./user_routes");
const { AuthMiddlewares } = require("../../middlewares");
const AuthRoutes = require("./auth_routes");

const router = express.Router();

router.get("/info", AuthMiddlewares.checkAuth, InfoController.info);

router.use("/users", UserRoutes);

router.use("/auth", AuthRoutes);

module.exports = router;
