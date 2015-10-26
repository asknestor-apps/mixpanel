#Installation

1) Set your keys in your environment variables:

    export MIXPANEL_API_KEY=xxxxx
    export MIXPANEL_API_SECRET=xxxxx

2) Install hubot-mixpanel

    npm install --save hubot-mixpanel

3) Add hubot-mixpanel to external-scripts.json

    [
      ...,
      "hubot-mixpanel"
    ]

#Usage

Get some mixpanel insights by calling `hubot mixpanel`