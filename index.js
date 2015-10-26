// Description:
//   Shows you some insights from your Mixpanel
//
// Dependencies:
//   None
//
// Configuration:
//   MIXPANEL_API_KEY     - Your Mixpanel API key
//   MIXPANEL_API_SECRET  - Your Mixpanel API secret
//
// Commands:
//   hubot mixpanel  - List last 10 users of your app

var MixpanelExport = require('mixpanel-data-export');
var moment = require('moment');

panel = new MixpanelExport({
  api_key: process.env.MIXPANEL_API_KEY,
  api_secret: process.env.MIXPANEL_API_SECRET
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
      data.results.sort(compare);
      var message = '*These are your latest users:* \n\r';
      data.results.slice(0,10).map(function(user){
        message = message + '  • ' + user.$properties.$name + ': ' + moment().to(user.$properties.$last_seen) + '\n\r';
      });
      return message;
    })
    .catch(function(err){ console.log(err); })
  );

}

module.exports = function(robot) {
  robot.respond(/mixpanel/i, function(msg){
    getStats()
    .then(function(message){
      msg.reply(message);
    });
  });
};