var cityName = "albany";
var stateName = "Georgia";



// get the weather data using lat/lon
var getWeatherApi =function(cityLat,cityLon, city, state) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + cityLat + "&lon="+cityLon+"&exclude=minutely,hourly,alerts&appid=9b8bdab4f43757c17c5fae2dcf99bd2a";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                //pass current to function to populate the current information
                popCurrent(data.current);

                //pass daily to function to pupulate the daily information
                popFuture(data.daily);

              //console.log(data);
             



              //console.log(currentTemp, currentHum, currentWind, currentUV);
            });
        };
    });
};

// get lat and lon from city
var getCoorApi = function(city, state) {
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"+&limit=5&appid=9b8bdab4f43757c17c5fae2dcf99bd2a";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                for (i=0; i< data.length; i++) {
                    if (data[i].state == state) {
                        //console.log(data);
                        var cityLon = data[i].lon;
                        var cityLat = data[i].lat;
                        //console.log(cityLat,cityLon, cityState, cityCountry);
                        getWeatherApi(cityLat, cityLon, city, state);
                        
                    }
            }
            });
        };
    });
}

var popCurrent = function(current){
    var currentTemp = current.temp;
    var currentHum = current.humidity;
    var currentWind = current.wind_speed;
    var currentUV  = current.uvi;

};

var popFuture = function(daily){
    console.log(daily);

}

getCoorApi(cityName,stateName);

