$(document).ready(function () {

    var cities = [];
    var citiesDiv = document.getElementById("searched-cities");
    init();
    displayCities();

    function init() {
        var savedCities = JSON.parse(localStorage.getItem("cities"));

        if (savedCities !== null) {
            cities = savedCities
        }
    }



    function displayCities() {
        $('#recentSearches').html('');
        for (let index = 0; index < cities.length; index++) {
            const city = cities[index];
            $("#recentSearches").append('<li><button>'+city+'</button></li>');
        }
        // use the cities array to list out all of the cities in the html page
    }

    // var fruits = ['apple', 'banana', 'pear']
    // fruits.indexOf("apple") => 0
    // fruits.indexOf('strawberry') => -1

     $("#weather-btn").on("click", function (event) {
        event.preventDefault();

    //     console.log("click");

        var cityInput = $("#weather-input").val().trim();
        console.log(cityInput);

        if (cities.indexOf(cityInput) === -1) {
        cities.push(cityInput);

        }

        localStorage.setItem("cities", JSON.stringify(cities));
        displayCities();
        // push to the cities array
        // set the cities value in localStorage to the cities array
        // call displayCities()
        


        currentWeather(cityInput);
        forecast(cityInput);
        //uvIndex(cityInput);

    });
    $("#recentSearches").on("click", function (event) {
        var city = event.target.textContent
        currentWeather(city)
    })
})

function currentWeather(city) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
    }).then(function (response) {
        console.log(response);

        var long = response.coord.lon;
        var lat = response.coord.lat;

        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".temp").text("Temperature: " + response.main.temp);
        $(".humidity").text("Humidity: " + response.main.humidity);



        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
        console.log("<h1>" + response.name + " Weather Details</h1>");

        uv(lat, long);
    });
};

function forecast(city) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
    }).then(function (forecastData) {
        console.log(forecastData);
       for (let index = 0; index < forecastData.list.length; index+=8) {
           console.log(forecastData.list[index].main.temp);
            
       }
    })
}


    function uv(latitude, longitude) {
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=e4a0807b709fd21166a9113bc8472380"
        }).then(function (uvIndex) {
            console.log("uv", uvIndex);
            $(".uv").text("UV Index: " + uvIndex.value);
        })
    }
