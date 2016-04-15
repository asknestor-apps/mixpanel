module.exports = function(error, msg) {
  if (error == "Invalid API key") {
    errorMessage = error + ": " + "Did you set `NESTOR_MIXPANEL_API_KEY` correctly?";
  } else if (error == "Invalid API signature") {
    errorMessage = error + ": " + "Did you set `NESTOR_MIXPANEL_API_SECRET` correctly?";
  } else {
    errorMessage = error;
  }

  return [msg.newRichResponse({
    title: "Oops, Mixpanel returned with an error",
    color: 'danger',
    fields: [
      {
        "title": "Error",
        "value": errorMessage,
        "short": true
      }
    ]
  })];
};

