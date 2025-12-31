
const apiKey = "7ebc6335c5ff22af3b0d9a1a4d48f5c6";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchBox = document.querySelector(".search input");
const button = document.querySelector(".b");
let weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".humidity").style.display = "none";
        document.querySelector(".wind").style.display = "none";
        return;
    }

    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Set weather icon based on condition
    const condition = data.weather[0].main;
    if (condition === "Clear") {
        weatherIcon.src = "../s_image/sun.png";
    } else if (condition === "Clouds") {
        weatherIcon.src = "../s_image/cloudy.jpeg";
    } else if (condition === "Rain") {
        weatherIcon.src = "../s_image/rain.jpeg";
    } else if (condition === "Drizzle") {
        weatherIcon.src = "../s_image/clear.jpeg";
    } else if (condition === "Mist") {
        weatherIcon.src = "../s_image/mist.jpeg";
    } else {
        weatherIcon.src = "../s_image/sun.png"; // fallback icon
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".details").style.display = "flex";
    document.querySelector(".error").style.display = "none";
}

// Handle button click
button.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});

