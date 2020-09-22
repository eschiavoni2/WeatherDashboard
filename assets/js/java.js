$(document).ready(function () {

    // var cities = [];
    // var citiesDiv = document.getElementById("searched-cities");
    // init();

    // function init() {
    //     var savedCities = JSON.parse(localStorage.getItem("cities"));

    //     if (savedCities !== null) {
    //         cities = savedCities
    //     }
    // }

    // function storingCities () {
    //     localStorage.setItem("cities", JSON.stringify(cities));
    // }

    $("#weather-btn").on("click", function (event) {
        event.preventDefault();

        console.log("click");

        var cityInput = $("#weather-input").val().trim();
        console.log(cityInput);
        currentWeather(cityInput);
        forecast(cityInput);
        // uvIndex(cityInput);

        $("#recentSearches").on("click", function (event) {
            event.preventDefault();

            var recentSrch = $("<h2>");
            recentSrch.text(cityInput);
            recentSrch.attr("value", cityInput);
            recentSrch.attr("class", "recentInput");
            $("#recentSearches").append(recentSrch);
        });

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
    })
}

{
    //     "lat": 38.75,
    //     "lon": 40.25,
    //     "date_iso": "2017-06-23T12:00:00Z",
    //     "date": 1498219200,
    //     "value": 10.16
    //   }

    function uv(latitude, longitude) {
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=e4a0807b709fd21166a9113bc8472380"
        }).then(function (uvIndex) {
            console.log("uv", uvIndex);
            $(".uv").text("UV Index: " + uvIndex.value);
        })
    }


};