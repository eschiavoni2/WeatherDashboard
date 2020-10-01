// prepare document for jquery
$(document).ready(function () {
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
            $("#recentSearches").append('<p><ul><button id="myBtn">' + city + '</button></ul></p>');
              // conditional - if =-1 don't push
        }
        // weather button on click event
        $("#weather-btn").on("click", function (event) {
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
        // click function for recent searches (click a recent one to see weather)
        $("#recentSearches").on("click", function (event) {
            // returning the DOM element = city
            var city = event.target.textContent;
            // console loggging city
            console.log(city);
            // saving last searched in local storage
            localStorage.setItem("lastCitySearched", city);
            // saving last five in love storage
            localStorage.setItem("lastFive", city);
            // calling current weather function with variable city
            currentWeather(city);
        });
    }
});
// current weather function
function currentWeather(city) {
    // ajax method, api with city and imperial units 
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
        // taking up success/failure of the promise
    }).then(function (response) {
        console.log(response);
        // variables = to parameters
        var long = response.coord.lon;
        var lat = response.coord.lat;
        // Grabbing text for city name/wind/temp/humidity
        $(".city").html("<h1>" + response.name + "</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".temp").text("Temperature: " + response.main.temp);
        $(".humidity").text("Humidity: " + response.main.humidity);


        // Console lots for wind, humidity, temp, name
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
        console.log("<h1>" + response.name + " Weather Details</h1>");
        // uv call for lat/long + saving lastcitysearched to local storage
        uv(lat, long);
        localStorage.setItem("lastCitySearched", city);

    });
}
// function for forecast
function forecast(city) {
    // ajax method with api, city, imperial units
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
        // then checking promise for forecast data
    }).then(function (forecastData) {
        // console log forecast data
        console.log(forecastData);
        // variable forecastDiv = to forecast id
        var forecastDiv = $("#forecast");
        // for loop with length and index += 8 to get 5 columns of data
        for (var index = 0; index < forecastData.list.length; index += 8) {
            console.log(forecastData.list[index]);
            // make the forecast card
            var cardFS = $("<div class='col-md-2 card bg-primary text-white'>");
            // make the icons in forecast
            var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + forecastData.list[index].weather[0].icon + ".png");
            // editing size to not be warped
            icon.attr('width', '75px')
            icon.attr('height', '75px')
            // putting icons on page
            cardFS.append(icon);
            // pulling date
            var date = forecastData.list[index].dt_txt
            // putting date on page
            cardFS.append("<p>Date: " + date + "</p>");
            // pulling temp
            var temperature = forecastData.list[index].main.temp_max
            // putting temp on page
            cardFS.append("<p>Temp: " + temperature + "</p>");
            // pulling humidity
            var humidity = forecastData.list[index].main.humidity
            // putting humidity on page
            cardFS.append("Humidity: ", humidity)
            // putting the cards on the page
            forecastDiv.append(cardFS);
        }
        // saving last five to local storage
        localStorage.setItem("lastFive", city);
    

    });
}

// uv function
function uv(latitude, longitude) {
    // ajax method, api with lat and long
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=e4a0807b709fd21166a9113bc8472380"
    // promise uvindex and console logging it 
    }).then(function (uvIndex) {
        console.log("uv", uvIndex);
        // uv into text
        $(".uv").text("UV Index: " + uvIndex.value);
    });
}