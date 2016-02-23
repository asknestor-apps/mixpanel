// Description:
//   Shows you some insights from your Mixpanel
//
// Dependencies:
//   None
//
// Configuration:
//   NESTOR_MIXPANEL_API_KEY     - Your Mixpanel API key
//   NESTOR_MIXPANEL_API_SECRET  - Your Mixpanel API secret
//
// Commands:
//   nestor mixpanel  - List last 10 users of your app

var MixpanelExport = require('mixpanel-data-export');
var moment = require('moment');

var panel = new MixpanelExport({
  api_key: process.env.NESTOR_MIXPANEL_API_KEY,
  api_secret: process.env.NESTOR_MIXPANEL_API_SECRET
});

function compare(a,b) {
  if (a.$properties.$last_seen < b.$properties.$last_seen)
    return 1;
  if (a.$properties.$last_seen > b.$properties.$last_seen)
    return -1;
  return 0;
}

function getStats() {
  return (
    panel
      .engage()
      .then(function(data) {
        message = '';
        data.results.sort(compare);
        data.results.slice(0,10).map(function(user){
          var identifier = user.$properties.$name;
          if(!identifier) { identifier = user.$properties.full_name; }
          if(!identifier) { identifier = user.$properties.first_name; }
          if(!identifier) { identifier = user.$properties.email; }

          message = message + '• ' + identifier + ': ' + moment().to(user.$properties.$last_seen) + '\n\r';
        });
        return message;
      })
      .catch(function(err){ console.log(err); })
  );

}

module.exports = function(robot) {
  robot.respond(/mixpanel/i, function(msg, done){
    msg.reply("Here are your latest users on Mixpanel").then(function() {
      getStats()
      .then(function(message){
        msg.send(message, done);
      });
    });
  });
};
