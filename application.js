// Settings - Change to your settings - Leave empty string to display nothing
settings = {
  title : "Fuel Collective Dashboard", // Displayed on homepage
	twitter : "fuelcollective", // http://twitter.com/#!/[fuelcollective]
	facebook : "148895398516230", // https://www.facebook.com/pages/Fuel-Collective/[148895398516230]
	weather : "60304", // zip code
	chartbeatDomain : "",
	chartbeatKey : "",
	slowUpdateTime : 1800000, //update every 30 minutes - for twiiter, facebook, and weather
	fastUpdateTime : 30000 //update every 30 seconds - for chartbeat
};

var slowAPIRequests = function(){

  // Get Twitter API Data
  if(settings.twitter !== "") {
    $("#status h2#twitter").show();
    $.getJSON('http://twitter.com/users/'+settings.twitter+'.json?callback=?', function(data) {
      $("#status h2#twitter span.count").text(data.followers_count);
    });
  }

  // Get Facebook API Data
  if(settings.facebook !== "") {
    $("#status h2#facebook").show();
    $.getJSON("https://graph.facebook.com/"+settings.facebook+"?callback=?", function(data) {
      $("#status h2#facebook span.count").text(data.likes);
    });
  }

  // Get Yahoo Weather API Data
  if(settings.weather !== "") {
    $("#weather").show();
    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20location%3D"+settings.weather+"&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?", function(data) {
      $("#weather").text(data.query.results.channel.item.condition.temp+" degress outside and "+data.query.results.channel.item.condition.text);
    });
  }

  // Show time so we can see last refresh
  $("#updated").text(Date());
}

var fastAPIRequests = function(){
  // Get Chartbeat API Data
  if(settings.chartbeatKey !== "") {
    $("#status h2#chartbeat").show();
    $.getJSON("http://api.chartbeat.com/quickstats?host="+settings.chartbeatDomain+"&apikey="+settings.chartbeatKey+"&jsonp=?", function(data) {
      $("#status h2#chartbeat span.count").text(data.people);
      console.log(data)
    });
  }
}


$(function() {
  $("h1").text(settings.title);
  slowAPIRequests();
  fastAPIRequests();
  setInterval("makeAPIRequests()", settings.slowUpdateTime); //update every 30 minutes
  setInterval("fastUpdates()", settings.fastUpdateTime); //update every 30 seconds
});