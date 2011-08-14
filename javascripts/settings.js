// Settings - Change to your settings - Leave empty string to display nothing
settings = {
  title : "My Dashboard", // Displayed on homepage
	twitter : "skorecky", // http://twitter.com/#!/[XXXXX]
	facebook : "148895398516230", // https://www.facebook.com/pages/XXXXX/[XXXXXXXX]
	weather : {
	  zipcode : "90210", // zip code
	  showForecast : true // Will toggle current conditions with forecast every 5 seconds
	},
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