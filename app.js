const express = require("express");
const log = require("lighthouse-logger");
const lighthouse = require("./lighthouse");
const config = require("./config");

const app = express();
const port = 9000;

app.get("/", (req, res) => {
  log.setLevel(config.flags.logLevel);

  lighthouse
    .launchChromeAndRunLighthouse(config.url, config.flags)
    .then(results => {
      console.log("Sending results...");
      res.send(results.audits);
    });
});

console.log(`listening on port ${port}`);
app.listen(port);
