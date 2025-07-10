const API_KEY = "97f3fdea9bfb328f4cb5f9ac1f38e9f4"
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

//Fetching html elements
const cityInput = document.getElementById("cityInput");
const searchbtn = document.getElementById("searchbtn");
const weatherDisplay = document.getElementById("weatherDisplay");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const errorMessage = document.getElementById("errorMessage");

// weather display elements
const CityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

searchbtn.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        handleSearch()
    }
})
// declaring the handleSearch function
function handleSearch() {
    const city = cityInput.value.trim();
    // input validation
    if(!city) {
        showError("Please enter a city name.");
        return;
    }

    // clear previous results and also show loading
    hideAllSections();
    showLoading();

    // Fetch weather data
    fetchWeatherData(city)

    async function fetchWeatherData(){
        try{
            const url=`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
            // we will now make an API request
            const response = await fetch(url); //this response will be awaited and all other functions will put hold until this is resolved
            if(!response.ok) {
                // handle different errors
                if(response.status === 404) {
                    throw new Error("City not found. Please check the name and try again.");
                }else if (response.status === 401) {
                    throw new Error("Invalid API Key");
                }else{
                    throw new Error("An error occurred while fetching the weather data.");
                }
            }
            // parse the response
            const data = await response.json();
            displayWeatherData(data);
        
        }
        catch(error){
            //Handle errors
            console.error("Error fetching weather data:", error);
            hideLoading();
            showError(error.message);
        }
    }
}

//display weather function
function displayWeatherData(data) {
    hideLoading();
    
    // Extract data from API response
    const cityNameText = `${data.name}, ${data.sys.country}`;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const feelsLikeTemp = Math.round(data.main.feels_like);
    const humidityValue = data.main.humidity;
    const windSpeedValue = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h

    //Update DOM elements with weather data
    // Using textContent for security
    CityName.textContent = cityNameText;
    temperature.textContent = temp
    weatherDescription.textContent = description
    feelsLike.textContent = feelsLikeTemp
    humidity.textContent = humidityValue;
    windSpeed.textContent = windSpeedValue;

    // Show weather display section
    showWeatherDisplay();
}

function showLoading() {
    loading.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function hideError() {
    error.classList.add("hidden");
}
function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

//to show weather
function showWeatherDisplay() {
    weatherDisplay.classList.remove("hidden");
}

function hideWeatherDisplay() {
    weatherDisplay.classList.add("hidden");
}

function hideAllSections() {
   hideLoading();
   hideError();
   hideWeatherDisplay();
}

function clearInput() {
    cityInput.value = "";
}
