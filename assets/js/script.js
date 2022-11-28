var cities = [];

var citySearchForm=document.querySelector("#city-search-form");
var cityInput=document.querySelector("#city");
var currentWeather=document.querySelector("#current-weather-container");
var currentCity=document.querySelector("#current-city");
var fiveDayForecastTitle=document.querySelector("#forecast");
var fiveDayForecast=document.querySelector("#fiveday-container");
var searchHistoryButtons=document.querySelector("#search-history-buttons");


var cityInputHandler = function(event){
    event.preventDefault();
    var city = cityInput.ariaValueMax.trim();
    if(city){
        cityWeather(city);
        fiveDayForecast(city);
        cities.unshift({city});
        cityInput.value = "";
    } else {
        alert("Please enter a valid city.");
    }
    saveSearchHistory();
    searchHistory(city);
}

var searchHistoryHandler = function(event){
    var city = event.target.getAttribute("data-city")
    if(city){
        cityWeather(city);
        fiveDay(city);
    }
}

var saveSearchHistory = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var searchHistory = function(searchHistory){

    searchHistoryList = document.createElement("button");
    searchHistoryList.textContent = searchHistory;
    searchHistoryList.classList = "btn btn-dar btn-lg btn-block p-2";
    searchHistoryList.setAttribute("data-city", searchHistory);
    searchHistoryList.setAttribute("type", "submit");

    searchHistoryButtons.prepend(searchHistory);
}

var cityWeather = function(city){
    var apiKey = "7fd1431009ecf06b7da666445b0e111f"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        showWeather(data, city);
    });
};


var showWeather = function(weather, searchCity){
    currentWeather.textContent = "";
    currentCity.textContent=searchCity;

    var weatherImages = document.createElement("img");
    weatherImages.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    currentCity.appendChild(weatherImages);

    var temperature = document.createElement("p");
    temperature.textContent = "Temperature: " + weather.main.temp + "ºF";
    temperature.classList = "list-group-item";

    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + weather.main.humidity + " %";
    humidity.classList = "list-group-item";

    var windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
    windSpeed.classList = "list-group-item";

    currentWeather.appendChild(temperature);

    currentWeather.appendChild(humidity);

    currentWeather.appendChild(windSpeed);
}

var fiveDay = function(city){
    var apiKey = "7fd1431009ecf06b7da666445b0e111f"
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            showFiveDay(data);
        });
    });
};

var showFiveDay = function(weather){
    fiveDayForecast.textContent=""
    fiveDayForecastTitle.textContent = "Five-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
      var dailyForecast = forecast[i];
        
      var fiveDayData = document.createElement("div");
      fiveDayData.classList = "card bg-primary text-light m-4";

      var fiveDayDate = document.createElement("h5")
      fiveDayDate.textContent= moment.unix(dailyForecast.dt).format("ddd, MM/DD/YY")
      fiveDayDate.classList = "card-header text-center";
      
      fiveDayData.appendChild(fiveDayDate);

      var weatherImages = document.createElement("img");
      weatherImages.classList = "card-body text-center";
      weatherImages.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);


      var fiveDayTemp = document.createElement("p")
      fiveDayTemp.classList = "card-text text-center";
      fiveDayTemp.textContent = dailyForecast.main.temp + " ºF";

      fiveDayData.appendChild(fiveDayTemp);

      var fiveDayHumidity = document.createElement("p")
      fiveDayHumidity.classList = "card-text text-center";
      fiveDayHumidity.textContent = "Humidity: " + dailyForecast.main.humidity + " %";

      fiveDayData.appendChild(fiveDayHumidity);

      var fiveDayWindSpeed = document.createElement("p")
      fiveDayWindSpeed.classList = "card-text text-center";
      fiveDayWindSpeed.textContent = "Wind Speed: " + dailyForecast.wind.speed + "MPH";

      fiveDayData.appendChild(fiveDayWindSpeed);

    }

}

citySearchForm.addEventListener("submit", cityInputHandler);
searchHistoryButtons.addEventListener("click", searchHistoryHandler);
