var MixpanelExport = require('mixpanel-data-export');

panel = new MixpanelExport({
  api_key: process.env.MIXPANEL_API_KEY,
  api_secret: process.env.MIXPANEL_API_SECRET
});

var $name = 'rodriguez@iazi.ch';

panel.engage({
  where: 'properties["$name"] == "' + $name + '"'
}).then(function(data) {
  var lastSeen = data.results[0].$properties.$last_seen;
  console.log($name, 'was last seen on', lastSeen);
});

module.exports = function(robot) {
  robot.respond(/mixpanel/i, function(msg){
    var today = new Date();

    msg.reply('Glad to hear that you want to have some updated mixpanel stats');
  });
};