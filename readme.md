## Information
This is something I created for my current job and thought I would share it when other people since this is a popular thing to do for a TV or something in your office.

You can see a demo of it at http://skorecky.github.com/Dashboard/

### Features 

- Weather background color changes depending on hot(85+)/cold(60-)
- Turn off what you don't want to see.
- Super easy setup and install. Anything that can serve HTML/JavaScript

### Supported Services
- Twitter
- Facebook
- Weather
- Time
- Chartbeat
- Linode

### Notes:

- If you see the "Loading..." not going away, that is the json feed not loading. API's like Twitters limit to 150 requests/hour so if you exceed that, then you'll get this error. In the future I'll check for this and display an error.
- Twitter, Facebook, and Weather will refresh every 30 minutes by default. Chartbeat and Linode every 30 seconds by default.

## Setup
Setup is super simple. Look inside 'javascripts/settings.js' to change your settings.

    settings = {
      title : "Fuel Collective Dashboard", // Displayed on homepage
    	twitter : "fuelcollective", // http://twitter.com/#!/[XXXXX]
    	facebook : "148895398516230", // https://www.facebook.com/pages/XXXXX/[XXXXXXXX]
    	weather : "60304", // zip code
    	chartbeatDomain : "",
    	chartbeatKey : "",
    	linodeKey : "", // Linode - Look in My Profile for API key
    	slowUpdateTime : 1800000, //update every 30 minutes - for twiiter, facebook, and weather
    	fastUpdateTime : 30000, //update every 30 seconds - for chartbeat
    	showUpDown : true, // show up/down status of twitter, facebook, and chartbeat
    	time: true // show current time
    };
    
anything left blank "", will simply not be displayed on the screen. More services will be added when I have time.