const express = require("express");
const { InfoController } = require("../../controllers/index");
const UserRoutes = require("./user_routes");
const { AuthMiddlewares } = require("../../middlewares");

const router = express.Router();

router.get("/info", AuthMiddlewares.checkAuth, InfoController.info);

router.use("/users", UserRoutes);

module.exports = router;
