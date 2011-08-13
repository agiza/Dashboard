// Settings - Change to your settings - Leave empty string to display nothing
settings = {
  title : "My Dashboard", // Displayed on homepage
	twitter : "myusername", // http://twitter.com/#!/[XXXXX]
	facebook : "12345678", // https://www.facebook.com/pages/XXXXX/[XXXXXXXX]
	weather : "90210", // zip code
	chartbeatDomain : "",
	chartbeatKey : "",
	linodeKey : "", // Linode - Look in My Profile for API key
	slowUpdateTime : 1800000, //update every 30 minutes - for twiiter, facebook, and weather
	fastUpdateTime : 30000, //update every 30 seconds - for chartbeat
	showUpDown : true, // show up/down status of twitter, facebook, and chartbeat
	time: true // show current time
};
// Do not remove this
document.getElementById("setup").style.display = "none"