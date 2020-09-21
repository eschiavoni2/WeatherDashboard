$(document).ready(function () {

    $("#weather-btn").on("click", function (event) {
        event.preventDefault();

        console.log("click");

        var cityInput = $("#weather-input").val().trim();
        console.log(cityInput);
        currentWeather(cityInput);
        forecast(cityInput);

        var recentSrch = $("<button>");
        $("#recentSearches").append(recentSrch)
    })

    function currentWeather(city) {

        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
        }).then(function (data) {
            console.log(data);
        })
    }

    function forecast(city) {

        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=e4a0807b709fd21166a9113bc8472380&units=imperial"
        }).then(function (data) {
            console.log(data);
        })
    } 

})