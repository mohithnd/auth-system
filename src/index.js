const express = require("express");
const { ServerConfig, Logger } = require("./config");
const cors = require("cors");
const apiRoutes = require("./routes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, () => {
  console.log(`Server Is Started On Port: ${ServerConfig.PORT}`);
  // Logger.info("Successfully Started The Server");
});
