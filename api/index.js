const fs = require("fs");
const path = require("path");
const compression = require("compression");
const express = require("express");
const morgan = require('morgan');
const filemanagerMiddleware = require("@opuscapita/filemanager-server").middleware;
const logger = require("@opuscapita/filemanager-server").logger;

const config = {
  fsRoot: process.env.STORAGE || path.resolve(__dirname, ".."),
  rootName: "Disk",
};

const app = express();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "7000";

app.use(compression());
app.use(morgan('combined'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", filemanagerMiddleware(config));
app.use("/", express.static(path.resolve(__dirname, "../build")));

app.listen(port, host, function(err) {
  if (err) {
    logger.error(err);
  }

  logger.info(`Server listening at http://${host}:${port}`);
});

process.on("exit", function() {
  logger.warn("Server has been stopped");
});
