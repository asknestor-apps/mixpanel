var MixpanelExport = require('mixpanel-data-export');
var moment = require('moment');

panel = new MixpanelExport({
  api_key: process.env.MIXPANEL_API_KEY,
  api_secret: process.env.MIXPANEL_API_SECRET
});

var $name = 'rodriguez@iazi.ch';

/*
panel.engage({
  where: 'properties["$name"] == "' + $name + '"'
}).then(function(data) {
  var lastSeen = data.results[0].$properties.$last_seen;
  console.log($name, 'was last seen on', lastSeen);
});
*/

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