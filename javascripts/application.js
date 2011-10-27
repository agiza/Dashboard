// If you're looking to change settings, try the settings.js files. Otherwise you probably know
// what you're doing so have fun!
//
// Copyright 2011 Stephen Korecky

var updateClock = function() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();
  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;
  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;
  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
  // Update the time display
  $("#time").text(currentTimeString);
}



var slideImage = function(){
  $("#wrapper #slider").animate({left: '-=1920'},500,function(){
    $(this).children("div").first().appendTo("#slider");
    $("#wrapper #slider").css({left: '0'});
  });
};
$(function(){
  setInterval(function(){slideImage()},10000);
});

var slowAPIRequests = function(){
  
  // Get Pivotal Tracker Data
  if(settings.twitter !== "") {
    $("#pivotal").show();
    $.ajax({
      type: "GET",
      url: 'http://xml2json.heroku.com',
      data:'url=https://www.pivotaltracker.com/services/v3/projects/'+settings.pivotalTracker.project+'/iterations/current?token='+settings.pivotalTracker.apiToken,
      dataType: 'jsonp',
      success: function(data) {
        var stories = data.iterations[0].stories;
        console.log(stories);
        $(stories).each(function(e, story){
          $("#pivotal ul").append("<li class='"+story.current_state+"'>"+story.name +"</li>");
        });
      }
    });
  }
  
  // Get Twitter API Data
  if(settings.twitter !== "") {
    $("#status li#twitter").show();
    var currentCount = parseFloat($("#status li#twitter span.count").text());
    $.getJSON('http://twitter.com/users/'+settings.twitter+'.json?callback=?', function(data) {
      $("#status li#twitter span.count").text(data.followers_count);
      if(settings.showUpDown) {
        if(data.followers_count >= currentCount) {
          $("#twitter .picto_ud").text("{"); //up 
        } else {
          $("#twitter .picto_ud").text("}"); //up 
        }
      }
    });
  }

  // Get Facebook API Data
  if(settings.facebook !== "") {
    $("#status li#facebook").show();
    var currentCount = parseFloat($("#status li#facebook span.count").text());
    $.getJSON("https://graph.facebook.com/"+settings.facebook+"?callback=?", function(data) {
      $("#status li#facebook span.count").text(data.likes);
      if(settings.showUpDown) {
        if(data.likes >= currentCount) {
          $("#facebook .picto_ud").text("{"); //up 
        } else {
          $("#facebook .picto_ud").text("}"); //up 
        }
      }
    });
  }

  // Get Yahoo Weather API Data
  if(settings.weather.zipcode !== "") {
    $("#weather").show();
    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20location%3D"+settings.weather.zipcode+"&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?", function(data) {
        var temperature = data.query.results.channel.item.condition.temp;
        var high = data.query.results.channel.item.forecast[0].high;
        var low = data.query.results.channel.item.forecast[0].low;
        var foreText = data.query.results.channel.item.forecast[0].text;
      $("#weather span#one").text(temperature+" degress outside and "+data.query.results.channel.item.condition.text);
      $("#weather span#two").text("Todays High: "+high+" Todays Low: "+low+" "+foreText).hide();
      if(temperature > 85){
        $("#weather").addClass("hot");
      } else if(temperature < 60) {
        $("#weather").addClass("cold");
      } else if(temperature < 32) {
        snowStorm.resume();
      } else if((temperature < 85) || (temperature > 32)) {
        $("#weather").removeClass("hot, cold");
        snowStorm.stop();
      }
    });
  }
}

var fastAPIRequests = function(){
  // Get Chartbeat API Data
  if(settings.chartbeatKey !== "") {
    $("#status li#chartbeat").show();
    var currentCount = parseFloat($("#status li#chartbeat span.count").text());
    $.getJSON("http://api.chartbeat.com/quickstats?host="+settings.chartbeat.domainName+"&apikey="+settings.chartbeat.key+"&jsonp=?", function(data) {
      $("#status li#chartbeat span.count").text(data.people);
      if(settings.showUpDown) {
        if(data.people > currentCount) {
          $("#chartbeat .picto_ud").text("{"); //up 
        } else {
          $("#chartbeat .picto_ud").text("}"); //up 
        }
      }
    });
  }
  
  // Get Linode API Data
  if(settings.linodeKey !== "") {
    $("#status li#linode").show();
    $.getJSON("https://api.linode.com/?api_key="+settings.linodeKey+"&api_action=linode.list&callback=?", function(data) {
      var linodes = data.DATA
      $("#linode ul li").remove();
      $(linodes).each(function(e, linode){
        var humanStatus = (linode.STATUS === 1)? "Running" : "Shut Down";
        $("#linode ul").append("<li>"+linode.LABEL +" is "+ humanStatus+"</li>");
      });
    });
  }
  
  $.ajax({
    url: "http://coupontrade.com/api/orders.json",
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "VU_yPMjWuMSLoafBuHp3:x");
    },
    headers: {
      "Access-Control-Allow-Origin":"http://coupontrade.com/api/orders.json",
      "Access-Control-Allow-Headers":"X-Requested-With"
    },
    success: function(data, textStatus, XMLHttpRequest) {
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
    }
  });
  
  
}

var toggleWeather = function(){
  if($("#weather span#one").is(":visible")){
    $("#weather span#one").hide();
    $("#weather span#two").show();
  } else {
    $("#weather span#one").show();
    $("#weather span#two").hide();
  }
}

$(function() {
  snowStorm.stop();
  $("h1").text(settings.title);
  document.title = settings.title;
  slowAPIRequests();
  fastAPIRequests();
  setInterval("slowAPIRequests()", settings.slowUpdateTime);
  setInterval("fastAPIRequests()", settings.fastUpdateTime);
  if(settings.weather.showForecast){
    setInterval("toggleWeather()", 5000);
  }
  if(settings.time){
    $("#time").show();
    updateClock();
    setInterval("updateClock()", 1000); //update every 1 second 
  }
  $(".force_reload").click(function(){
    slowAPIRequests();
    fastAPIRequests();
  });
});