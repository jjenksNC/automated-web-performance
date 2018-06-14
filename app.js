const express = require("express");
const log = require("lighthouse-logger");
const lighthouse = require("./lighthouse");
const config = require("./config");

const app = express();
const port = 9000;

app.get("/", async (req, res) => {
  log.setLevel(config.flags.logLevel);

  try {
    const response = await lighthouse.launchChromeAndRunLighthouse(
      config.url,
      config.flags
    );
    console.log("Sending Results...");
    res.json(response.audits);
  } catch (e) {
    console.log(e);
  }
});

console.log(`listening on port ${port}`);
app.listen(port);
