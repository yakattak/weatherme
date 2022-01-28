var cityName = "New York";
var stateName = "NY";



// get the data from api
var getWeatherApi =function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityName + ",US-" + stateName+ "&cnt=5&appid=9b8bdab4f43757c17c5fae2dcf99bd2a";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        };
    });
};


getWeatherApi();