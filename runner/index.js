const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then(results => {
        return Promise.resolve(results)
          .then(chrome.kill())
          .catch(e => console.log("ERROR:", e));
      });
    })
    .catch(e => console.log("NO CHROME:", e));
}

module.exports = {
  launchChromeAndRunLighthouse
};
