// prepare document for jquery
$(document).ready(function() {
	// variable for my cities with an empty array
	var cities = [];
	// variable for lastcitysearched with an empty string
    var lastCitySearched = "";
    var lastFive = "";
	// call functions 
	init();
	displayCities();
	currentWeather();
	currentWeather(localStorage.getItem("lastCitySearched"));
    forecast(localStorage.getItem("lastFive"));
	// function to run when loading the page
	function init() {
		// go get cities array from local storage
		var savedCities = JSON.parse(localStorage.getItem("cities")) || [];
		// check if local storage is empty
		if (savedCities !== null) {
			// if not empty, update array from local storage
			cities = savedCities;

		}
	}
	// function to show cities searched
	function displayCities() {
		// Looking for element of id recent searches, changning html to empty string
		$('#recentSearches').html('');
		// for loop going over cities in local storage
		for (var index = 0; index < cities.length; index++) {
			// grabbing city from array to put on page
			var city = cities[index];
			// appending city button in the recent searches
			$("#recentSearches").append('<li><button>' + city + '</button></li>');
		}
		// weather button on click event
		$("#weather-btn").on("click", function(event) {
			// if the event does not get explicitly handled, its default action should not be taken as it normally would be
			event.preventDefault();
			// city input equal to set value that removes spaces
			var cityInput = $("#weather-input").val().trim();
			// console log city input
			console.log(cityInput);
			// conditional - if =-1 don't push
			if (cities.indexOf(cityInput) === -1) {
				// push the cities to the screen
				cities.push(cityInput);
				// console log cities
				console.log(cities);
            }
            if (lastFive.indexOf(cityInput) === -1) {
				// push the cities to the screen
				lastFive.push(cityInput);
				// console log cities
                console.log(lastFive);
            }
			// saving cities to local storage 
			localStorage.setItem("cities", JSON.stringify(cities));
			// saving lastcitysearched to local storage 
            localStorage.setItem("lastCitySearched", JSON.stringify(cityInput));
            localStorage.setItem("lastFive", JSON.stringify(cityInput));
			// calling display cities
			displayCities();
			// calling currentweather/forecast function with cityinput
			currentWeather(cityInput);
			forecast(cityInput);
		});

		$("#recentSearches").on("click", function(event) {
			var city = event.target.textContent;
			console.log(city);
            localStorage.setItem("lastCitySearched", city);
            localStorage.setItem("lastFive", city);
			currentWeather(city);
		});
	}
});

function currentWeather(city) {

	$.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
	}).then(function(response) {
		console.log(response);

		var long = response.coord.lon;
		var lat = response.coord.lat;

		$(".city").html("<h1>" + response.name + "</h1>");
		$(".wind").text("Wind Speed: " + response.wind.speed);
		$(".temp").text("Temperature: " + response.main.temp);
		$(".humidity").text("Humidity: " + response.main.humidity);


		// localStorage.setItem("currentCity", response.wind.speed)
		console.log("Wind Speed: " + response.wind.speed);
		console.log("Humidity: " + response.main.humidity);
		console.log("Temperature (F): " + response.main.temp);
        console.log("<h1>" + response.name + " Weather Details</h1>");
        
        // for (var index = 0; index < forecastData.list.length; index += 8) {
        // }   

        uv(lat, long);
        localStorage.setItem("lastCitySearched", city);

	});
}

function forecast(city) {

	$.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
	}).then(function(forecastData) {
        console.log(forecastData);
        var forecastDiv = $("#forecast");
		for (var index = 0; index < forecastData.list.length; index += 8) {
        console.log(forecastData.list[index]);
        // make the forecast card
        var cardFS = $("<div class='col-md-2 card bg-primary text-white'>");
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecastData.list[index].weather[0].icon + ".png");
        cardFS.append(icon);
        var temperature = forecastData.list[index].main.temp_max
        cardFS.append("<p>Temp: "+ temperature + "</p>");
        var humidity = forecastData.list[index].main.humidity
        cardFS.append("Humidity: ", humidity)
        // putting the cards on the page
        forecastDiv.append(cardFS);
        }
        localStorage.setItem("lastFive", city);

	});
}


function uv(latitude, longitude) {
	$.ajax({
		method: "GET",
		url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=e4a0807b709fd21166a9113bc8472380"
	}).then(function(uvIndex) {
		console.log("uv", uvIndex);
		$(".uv").text("UV Index: " + uvIndex.value);
	});
}