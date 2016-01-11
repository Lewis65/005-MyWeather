var longitude;
var latitude;
var tempC = true;
var temperature;

function updateWeather() {
	//Set API variables
	var appid = "cdc247054e04a7949fe0fcd9c7a9d73c";
	var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + appid;
	var json = {};
	$.getJSON(url, function(data){
		$.each(data, function(key, val){
			json[key] = val;
		});
		console.log(json);
		//Set city to place name
		var city = json.name;
		$("#city").html(city);
		console.log(json.name + city);
		//Convert temperature
		if (tempC){
			temperature = (json.main.temp - 273.15).toFixed(1) + "°C";
		} else {
			temperature = (((json.main.temp - 273.15)* 1.8) + 32.00).toFixed(1) + "°F";
		}
		//Update temperature
		$("#temp").html(temperature);
		//Update icon
		$(".weathericon").html("<img src='http://openweathermap.org/img/w/" + json.weather[0].icon + ".png'/>");
		//Update weather
		$(".weather").html(json.weather[0].main);
		//Update wind
		var rotate = "rotate(" + json.wind.deg.toFixed(0) + "deg)";
		$('#winddir').css('transform', rotate);
		$("#windspd").html(json.wind.speed + " m/s");
	});
}

$(document).ready(function(){
	//Check location permissions
	if(navigator.geolocation){	navigator.geolocation.getCurrentPosition(
		function(myPosition){
  		longitude = myPosition.coords.longitude;
	  	latitude = myPosition.coords.latitude;
			console.log(myPosition);
			updateWeather();
			$("#centigrade").css("border", "2px solid #FF0055");
			$('.header').slideUp(0);
			$('.header').css('display', 'default');
	  }
	)}
	
	//Header slide
	var timeout;
	$('.header-wrapper').mouseenter(function(){
		timeout = window.clearTimeout(timeout);
		$('.header').stop().slideDown(250);
	});
	$('.header-wrapper').mouseleave(function(){
		timeout = window.setTimeout(
			function(){
				$('.header').slideUp(750)
			}, 750
		);
	});
	
	//tempUnit changes
	$("#centigrade").click(function(){
		$("#centigrade").css("border", "2px solid #FF0055");
		$("#fahrenheit").css("border", "2px solid #999");
		tempC = true;
		updateWeather();
	});
	$("#fahrenheit").click(function(){
		$("#fahrenheit").css("border", "2px solid #FF0055");
		$("#centigrade").css("border", "2px solid #999");
		tempC = false;
		updateWeather();
	});
});