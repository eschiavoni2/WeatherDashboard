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

        var recentSrch = $("<h2>");
        recentSrch.text(cityInput);
        recentSrch.attr("value", cityInput);
        recentSrch.attr("class", "recentInput");
        $("#recentSearches").append(recentSrch);


    });
    $("#recentSearches").on("click", function (event) {
        event.preventDefault();
        console.log("click");
        var cityInput = ($(this).siblings());
        console.log(cityInput);
        console.log($(this).siblings())
    })
})

function currentWeather(city) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
    }).then(function (response) {
        console.log(response);
        
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".temp").text("Temperature: " + response.main.temp);
        $(".humidity").text("Humidity: " + response.main.humidity);

        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);

    });
};

function forecast(city) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
    }).then(function (data) {
        console.log(data);
    })
}

    // function uv(city) {
    //     $.ajax({
    //         method: "GET",
    //         url: "https://api.openweathermap.org/data/2.5/uvi?" + city + "&lat=" + latitude + "&lon=" + longitude"&lon=&appid=e4a0807b709fd21166a9113bc8472380&units=imperial";
    //     }).then(function (uvIndex) {
    //         console.log(uvIndex);
    //     })
    // }


// });