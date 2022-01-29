
//get elements from html that will be needed
var formEl = document.querySelector("#search-btn");
var stateEl = document.querySelector("#state");
var historyEl = document.querySelector("#history-buttons")

//create search history array
var searchHistory = [];




// get the weather data using lat/lon
var getWeatherApi =function(cityLat,cityLon, city, state) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + cityLat + "&lon="+cityLon+"&exclude=minutely,hourly,alerts&appid=9b8bdab4f43757c17c5fae2dcf99bd2a";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                //pass current to function to populate the current information
                popCurrent(data.current, city, state);

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
    //console.log ("running coordinates " + city + " " + state);
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"+&limit=5&appid=9b8bdab4f43757c17c5fae2dcf99bd2a";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                for (i=0; i< data.length; i++) {
                    if (data[i].state == state) {
                        //console.log(data);
                        var cityLon = data[i].lon;
                        var cityLat = data[i].lat;
                        var city = data[i].name;
                        //run save to local then run to get coordinates/weather
                        saveLocal (city, state);
                        loadLocal();
                        //console.log(cityLat,cityLon, cityState, cityCountry);
                        i = data.length+1;
                        getWeatherApi(cityLat, cityLon, city, state);
                        
                        
                    }
            }
            });
        } else {console.log("NOT OKAY")};
    });
}

// function to populate teh current weather conditions
var popCurrent = function(current, city, state){

    //getdate
    var date = calcDate (current.dt);

    //day/month/year
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();

    //console.log(current);

    //get weather icon
    var conditionIcon = current.weather[0].icon;

    var conditionUrl = "https://openweathermap.org/img/wn/"+ conditionIcon +"@2x.png"
    
    //get container for current weather
    var currentContainer = document.querySelector("#current-city");

    //create container to be removed when new city selected
    var tempContainer = document.createElement("div");
    tempContainer.setAttribute("class", "card temp")

    //city name and weather icon up top
    var cityNameContainer = document.createElement("div");
    cityNameContainer.setAttribute("class", "align-center flex-row");

    var cityNameEl = document.createElement("p");
    cityNameEl.textContent = city + ", " + state + " (" + month + "/" + day +"/" + year + ")";
    
    var weatherEl = document.createElement("img");
    weatherEl.setAttribute("src", conditionUrl);
    
    cityNameContainer.appendChild(cityNameEl);
    cityNameContainer.appendChild(weatherEl);

    tempContainer.appendChild(cityNameContainer);
    
    //get current temp, hum, wind, uv
    var currentTemp = current.temp;
    var currentHum = current.humidity;
    var currentWind = current.wind_speed;
    var currentUV  = current.uvi;
    
    

    //create p elements to hold weather data
    var tempEl = document.createElement("p");
    var humEl = document.createElement("p");
    var winEl = document.createElement("p");
    var uvEl = document.createElement("p");

    //append weather data to temp container
    tempEl.textContent = "Temperature: " + currentTemp;
    var tempSpan = document.createElement("span");
    tempSpan.innerHTML= "&#176";
    tempEl.appendChild(tempSpan);
    humEl.textContent ="Humidity: " + currentHum + "%";
    winEl.textContent = "Wind Speed: " + currentWind + "mph";
    uvEl.textContent = "UV Index: " + currentUV;

    //determine UV color
    if (currentUV <= 2.5) {
        uvEl.setAttribute("class", "uv-green")
        } if (currentUV >2.5 && currentUV <=5.5) {
        uvEl.setAttribute("class", "uv-yellow")
            } if (currentUV > 5.5 && currentUv <= 7.5) {
                uvEl.setAttribute("class", "uv-orange")
                } if (currentUV > 7.5) {
                    uvEl.setAttribute("class", "uv-red")
                    }


    tempContainer.appendChild(tempEl);
    tempContainer.appendChild(humEl);
    tempContainer.appendChild(winEl);
    tempContainer.appendChild(uvEl);

    

    //append temp container to current weather container
    currentContainer.appendChild(tempContainer);

};


//populate futur edate
var popFuture = function(daily){
    //console.log(daily);

    for (i=1; i<6; i ++) {
        var date = calcDate (daily[i].dt);

        //day/month/year
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();

        var conditionIcon = daily[i].weather[0].icon
        //console.log (conditionIcon);
        var conditionUrl = "https://openweathermap.org/img/wn/"+ conditionIcon +"@2x.png"
    


        //get container for date weather
        var currentContainer = document.querySelector("#day-" + i);

        //create container to be removed when new city selected
        var tempContainer = document.createElement("div");
        tempContainer.setAttribute("class", "card temp");
 
        //append date
        var futureEl = document.createElement("p");
        futureEl.textContent = "(" + month + "/" + day +"/" + year + ")";
        tempContainer.appendChild(futureEl);

        
        var weatherEl = document.createElement("img");
         weatherEl.setAttribute("src", conditionUrl);
     
        //get current temp, hum, wind, uv
        var currentTemp = daily[i].temp.day;
        var currentHum = daily[i].humidity;
        var currentWind = daily[i].wind_speed;
        var currentUV  = daily[i].uvi;
 
        //create p elements to hold weather data
        var tempEl = document.createElement("p");
        var humEl = document.createElement("p");
        var winEl = document.createElement("p");
        var uvEl = document.createElement("p");
 
        //append weather data to temp container
        tempEl.textContent = "Temperature: " + currentTemp;
        var tempSpan = document.createElement("span");
        tempSpan.innerHTML= "&#176";
        tempEl.appendChild(tempSpan);
        humEl.textContent ="Humidity: " + currentHum + "%";
        winEl.textContent = "Wind Speed: " + currentWind + "mph";
        uvEl.textContent = "UV Index: " + currentUV;
        tempContainer.appendChild(weatherEl);
        tempContainer.appendChild(tempEl);
        tempContainer.appendChild(humEl);
        tempContainer.appendChild(winEl);
        tempContainer.appendChild(uvEl);

        //append temp container to current weather container
        currentContainer.appendChild(tempContainer);

    }
    

    



}

//function to get date
var calcDate = function(unixTimeStamp) {
var milliseconds = unixTimeStamp * 1000 
var dateObject = new Date(milliseconds)
//console.log (dateObject);
return (dateObject);
}


var taskButtonHandler = function (event) {
    event.preventDefault();
    //get city and state input

    //check what button is clicked
    var targetEl = event.target;
    if (targetEl.matches("#search-btn")) {
        var cityInput = document.querySelector("input[name='city']").value.trim();
            if (cityInput) {
                //console.log ("input is " + cityInput);
            }
      
    //console.log(cityInput);

        var stateInput = document.querySelector("select[id='state'").value;
    };
    if (targetEl.matches("#state-history")) {
        cityState = targetEl.textContent.split(',');
        cityInput = cityState[0].trim();
        stateInput = cityState[1].trim();
        //console.log (stateInput);
    }
          
    //run function to get coordinates   
    getCoorApi(cityInput,stateInput);
}

var saveLocal = function(city, state) {

    searchHistory.unshift([city,state]);
    //console.log (searchHistory);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));


}
//load any search history information
var loadLocal = function() {

    //remove temp information
    var taskSelected = document.getElementsByClassName("temp ");
    //console.log (taskSelected.length);
        if (taskSelected) {
            //console.log ("length is " + taskSelected.length)
            while (taskSelected.length > 0) {
                taskSelected[0].remove();
            };
                       
        };


    //set search history to old search history
    searchHistory = localStorage.getItem("searchHistory");
    // if there are no tasks, set tasks to an empty array and return out of the function
    if (!searchHistory) {
      return false;
    }
    //console.log("Saved tasks found!");
    // else, load up saved tasks
  
    // parse into array of objects
    searchHistory = JSON.parse(searchHistory);
  
    // loop through savedTasks array
    for (var i = 0; i < searchHistory.length; i++) {
      if (i<8) {
         popHistory(searchHistory[i]);
      }
    }
  };

//function to save data


//popluate history list
popHistory = function(searchHistory) {
    var historyContent = document.querySelector("#history-buttons");

    var stateBtn = document.createElement("button");
    stateBtn.setAttribute("class", "btn temp");
    stateBtn.setAttribute("id", "state-history");
    
    stateBtn.textContent = searchHistory[0] + ", " + searchHistory[1];

    historyContent.appendChild(stateBtn);

};
//load saved history on open
loadLocal();


//listen for clicks on search history or on new search
formEl.addEventListener("click", taskButtonHandler);
historyEl.addEventListener("click", taskButtonHandler);