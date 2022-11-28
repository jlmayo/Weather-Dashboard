var cities = [];

var citySearchForm=document.querySelector("#city-search-form");
var cityInput=document.querySelector("#city");
var currentWeather=document.querySelector("#current-weather-container");
var currentCity=document.querySelector("#current-city");
var fiveDayForecastTitle=document.querySelector("#forecast");
var fiveDayForecast=document.querySelector("#fiveday-container");
var searchHistoryButtons=document.querySelector("#search-history-buttons");


var formSubmitHandler = function(event){
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

var showWeather = function(weather, searchCity){
    currentWeather.textContent = "";
    currentCity.textContent=searchCity;

    var temperature = document.createElement("p");
    temperature.textContent = "Temperature: ";
    temperature.classList = "list-group-item";

    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: ";
    humidity.classList = "list-group-item";

    var windSpeed = document.createElement("p");
    windSpeed.textContent = "Wind Speed: ";
    windSpeed.classList = "list-group-item";
}