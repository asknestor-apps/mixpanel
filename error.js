module.exports = function(error, msg) {
  if (error == "Invalid API Key") {
    errorMessage = error + ": " + "Did you set `NESTOR_MIXPANEL_API_KEY` correctly?";
  } else {
    errorMessage = error;
  }

  return [msg.newRichResponse({
    title: "Oops, Mixpanel returned with an error",
    color: 'danger',
    fields: [
      {
        "title": "Response Code",
        "value": error.statusCode,
        "short": true
      },
      {
        "title": "Error",
        "value": errorMessage,
        "short": true
      }
    ]
  })];
};

