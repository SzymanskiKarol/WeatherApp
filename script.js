let weather = {
    apiKey: "2d1f61015728df0c1f8038382cc2c91f",
    fetchWeather: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = `Weather in ${name}`
        document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".temp").innerText = Math.round(temp * 10) / 10 + "°C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerText = `Wind speed: ${Math.round(speed * 10) / 10} m/s`;
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)
    },
};

document.querySelector(".search button").addEventListener('click', function () {
    weather.search();
    document.querySelector(".search-bar").value = '';
});

document.querySelector(".search-bar").addEventListener('keyup', function (e) {
    if (e.key == "Enter") {
        weather.search();
        document.querySelector(".search-bar").value = '';
    }
});

weather.fetchWeather("Kielce");