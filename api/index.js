const path = require("path");
const compression = require("compression");
const express = require("express");
const morgan = require("morgan");
const {
  middleware: filemanagerMiddleware,
  logger,
} = require("@opuscapita/filemanager-server");

const config = {
  fsRoot: process.env.STORAGE || path.resolve(__dirname, ".."),
  rootName: "Disk",
};

const app = express();
const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "7000";
const dist = path.resolve(__dirname, "../build");

app.use(compression());
app.use(morgan("combined"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", filemanagerMiddleware(config));
app.get("/-/*", (req, res) => res.sendFile(dist + "/index.html"));
app.use("/", express.static(dist));

app.listen(port, host, function(err) {
  if (err) {
    logger.error(err);
  }

  logger.info(`Server listening at http://${host}:${port}`);
});

process.on("exit", function() {
  logger.warn("Server has been stopped");
});
