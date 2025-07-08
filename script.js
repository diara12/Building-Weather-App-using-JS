const API_KEY = ""
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
        
        }
        catch{

        }
    }
}

