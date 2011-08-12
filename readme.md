## Information
This is something I created for my current job and thought I would share it when other people since this is a popular thing to do for a TV or something in your office.

You can see a demo of it at http://stephenkorecky.com/dashboard

A few notes:
- If you see the "Loading..." not going away, that is the json feed not loading. API's like Twitters limit to 150 requests/hour so if you exceed that, then you'll get this error.
- Twitter, Facebook, and Weather will refresh every 30 minutes by default. Chartbeat every 30 seconds.

## Setup
Setup is super simple. Look inside 'application.js' to change your settings.

    settings = {
      title : "Fuel Collective Dashboard",
    	twitter : "fuelcollective",
    	facebook : "148895398516230",
    	weather : "60304", // zip code
    	chartbeatDomain : "",
    	chartbeatKey : ""
    };
    
anything left blank "", will simply not be displayed on the screen. More services will be added when I have time.