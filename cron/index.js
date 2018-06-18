const cron = require("node-cron");
const lighthouse = require("./lighthouse");
const config = require("./config");

const task = cron.schedule(
  "30 * * * * *",
  async () => {
    const response = await lighthouse.launchChromeAndRunLighthouse(
      config.url,
      config.flags
    );
    console.log("$$", response);
    console.log("------------------");
  },
  false
);

task.start();

// task.destroy();
console.log("job started");
