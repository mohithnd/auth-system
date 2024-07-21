const express = require("express");
const { InfoController } = require("../../controllers/index");
const UserRoutes = require("./user_routes");

const router = express.Router();

router.get("/info", InfoController.info);

router.use("/users", UserRoutes);

module.exports = router;
