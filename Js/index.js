// DOM Elements
const contactLink = document.getElementById("contact");
const homeLink = document.getElementById("home");
const contactSection = document.getElementById("contactSection");
const homeSection = document.getElementById("homeSection");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
let weatherData;

contactLink.addEventListener("click", function(e) {
  e.preventDefault();  
  homeSection.classList.add("d-none");
  contactSection.classList.remove("d-none");
});

homeLink.addEventListener("click", function(e) {
  e.preventDefault();  
  homeSection.classList.remove("d-none");
  contactSection.classList.add("d-none");
});

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});


async function getWeather(location = "Cairo") {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=05918ec1290d4c6983b04820253006&q=${location}&days=3`
    );
    
    if (!response.ok) throw new Error("Location not found");
    
    weatherData = await response.json();
    displayWeatherData();
  } catch (error) {
    console.error("Error:", error);
    alert("Could not find weather for that location");
  }
}

function displayWeatherData() {
  if (!weatherData) return;

  const { location, current, forecast } = weatherData;
  const today = forecast.forecastday[0];
  const tomorrow = forecast.forecastday[1];
  const dayAfterTomorrow = forecast.forecastday[2];

  // Format dates
  const todayDate = new Date(today.date);
  const tomorrowDate = new Date(tomorrow.date);
  const dayAfterTomorrowDate = new Date(dayAfterTomorrow.date);

  const todayDayName = todayDate.toLocaleDateString("en-US", { weekday: "long" });
  const tomorrowDayName = tomorrowDate.toLocaleDateString("en-US", { weekday: "long" });
  const dayAfterTomorrowDayName = dayAfterTomorrowDate.toLocaleDateString("en-US", { weekday: "long" });

  document.getElementById("data").innerHTML = `
    <div class="row copy p-5 rounded-3">
      <!-- Today's Weather -->
      <div class="col-md-4 light-main">
        <div class="header d-flex justify-content-between px-2 py-1">
          <p>${todayDayName}</p>
          <p>${todayDate.getDate()} ${todayDate.toLocaleDateString("en-US", { month: "long" })}</p>
        </div>
        <section class="p-3">
          <p class="fs-5">${location.name}, ${location.country}</p>
          <h1 class="title text-white">${current.temp_c}°C</h1>
          <img src="https:${current.condition.icon}" alt="${current.condition.text}">
          <p class="blue-text">${current.condition.text}</p>
          <div class="icons">
            <span><i class="fa fa-umbrella"></i> ${current.humidity}%</span>
            <span><i class="fa fa-wind"></i> ${current.wind_kph}km/h</span>
          </div>
        </section>
      </div>

      <!-- Tomorrow's Forecast -->
      <div class="col-md-4 secondary-color text-center">
        <div class="header d-flex justify-content-center px-2 py-1">
          <p>${tomorrowDayName}</p>
        </div>
        <section class="px-2 py-3">
          <h1 class="text-white">${tomorrow.day.avgtemp_c}°C</h1>
          <img src="https:${tomorrow.day.condition.icon}" alt="${tomorrow.day.condition.text}">
          <p class="blue-text">${tomorrow.day.condition.text}</p>
          <div class="weather-details">
            <p> ${tomorrow.day.maxtemp_c}°C</p>
            <p> ${tomorrow.day.mintemp_c}°C</p>
            <p>Rain: ${tomorrow.day.daily_chance_of_rain}%</p>
          </div>
        </section>
      </div>

      <!-- Day After Tomorrow -->
      <div class="col-md-4 light-main text-center">
        <div class="header d-flex justify-content-center px-2 py-1">
          <p>${dayAfterTomorrowDayName}</p>
        </div>
        <section class="px-2 py-3">
          <h1 class="text-white">${dayAfterTomorrow.day.avgtemp_c}°C</h1>
          <img src="https:${dayAfterTomorrow.day.condition.icon}" alt="${dayAfterTomorrow.day.condition.text}">
          <p class="blue-text">${dayAfterTomorrow.day.condition.text}</p>
          <div class="weather-details">
            <p>High: ${dayAfterTomorrow.day.maxtemp_c}°C</p>
            <p>Low: ${dayAfterTomorrow.day.mintemp_c}°C</p>
            <p>Rain: ${dayAfterTomorrow.day.daily_chance_of_rain}%</p>
          </div>
        </section>
      </div>
    </div>
  `;
}

function handleSearch() {
  const location = searchInput.value.trim();
  if (location) {
    getWeather(location);
  } else {
    alert("Please enter a location to search");
  }
}

 

// Initialize with default location
getWeather();