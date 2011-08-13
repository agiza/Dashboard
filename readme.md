## Information
This is something I created for my current job and thought I would share it when other people since this is a popular thing to do for a TV or something in your office.

You can see a demo of it at http://skorecky.github.com/Dashboard/

### Features 

- Weather background color changes depending on hot(85+)/cold(60-)
- Supports: Twitter, Facebook, Weather, Time, and Chartbeat
- Turn off what you don't want to see.
- Super easy setup and install. Anything that can serve HTML/JavaScript

### Notes:

- If you see the "Loading..." not going away, that is the json feed not loading. API's like Twitters limit to 150 requests/hour so if you exceed that, then you'll get this error.
- Twitter, Facebook, and Weather will refresh every 30 minutes by default. Chartbeat every 30 seconds.

## Setup
Setup is super simple. Look inside 'javascripts/settings.js' to change your settings.

    settings = {
      title : "Fuel Collective Dashboard", // Displayed on homepage & Title bar of browser
    	twitter : "fuelcollective", // http://twitter.com/#!/[fuelcollective]
    	facebook : "148895398516230", // https://www.facebook.com/pages/Fuel-Collective/[148895398516230]
    	weather : "60304", // zip code
    	chartbeatDomain : "",
    	chartbeatKey : "",
    	slowUpdateTime : 1800000, //update every 30 minutes - for twiiter, facebook, and weather
    	fastUpdateTime : 30000, //update every 30 seconds - for chartbeat
    	showUpDown : true, // show up/down status of twitter, facebook, and chartbeat
    	time: true // show current time
    };
    
anything left blank "", will simply not be displayed on the screen. More services will be added when I have time.