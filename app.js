const express = require("express");
const log = require("lighthouse-logger");
const lighthouse = require("./lighthouse");

const app = express();
const port = 9000;

app.get("/", (req, res) => {
  const opts = {
    logLevel: "info",

    chromeFlags: ["--headless"]
  };
  log.setLevel(opts.logLevel);

  lighthouse
    .launchChromeAndRunLighthouse(
      "https://www.americanexpress.com/us/credit-cards/business?test=test",
      opts
    )
    .then(results => {
      console.log(typeof results.audits);
      res.send(results.audits);
    });
});

console.log(`listening on port ${port}`);
app.listen(port);
