const pageMod = require("sdk/page-mod");
const prefSet = require('sdk/simple-prefs');



pageMod.PageMod({
  include: /.*7cav\.us.*/,
  contentScriptFile: "./content.js",
  onAttach: function(worker) {
    worker.port.emit("timezoneLabel", prefSet.prefs['timezoneLabel']);
  }
});

