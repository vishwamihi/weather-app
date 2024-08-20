const apiKey = '2d61a72574c11c4f36173b627f8cb177';

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const city = cityInput.value;

    if (!city) {
        weatherInfo.innerHTML = '<p class="alert alert-danger">Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            weatherInfo.innerHTML = '<p class="alert alert-danger">City not found. Please try again.</p>';
        } else {
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
            const temperature = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const pressure = data.main.pressure;
            const visibility = data.visibility / 1000; // Convert to km
            const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
            const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

            weatherInfo.innerHTML = `
                <div class="weather-card">
                    <div class="text-center">
                        <img src="${iconUrl}" alt="Weather icon" class="weather-icon">
                        <div class="temperature">${temperature}°C</div>
                        <div class="description">${data.weather[0].description}</div>
                        <div class="location">${data.name}, ${data.sys.country}</div>
                    </div>
                    <div class="details mt-3">
                        <div class="detail">
                            <i class="fas fa-thermometer-half"></i>
                            <div class="detail-info">
                                <div>Feels like</div>
                                <div>${feelsLike}°C</div>
                            </div>
                        </div>
                        <div class="detail">
                            <i class="fas fa-tint"></i>
                            <div class="detail-info">
                                <div>Humidity</div>
                                <div>${humidity}%</div>
                            </div>
                        </div>
                        <div class="detail">
                            <i class="fas fa-wind"></i>
                            <div class="detail-info">
                                <div>Wind</div>
                                <div>${windSpeed} m/s</div>
                            </div>
                        </div>
                        <div class="detail">
                            <i class="fas fa-compress-arrows-alt"></i>
                            <div class="detail-info">
                                <div>Pressure</div>
                                <div>${pressure} hPa</div>
                            </div>
                        </div>
                        <div class="detail">
                            <i class="fas fa-eye"></i>
                            <div class="detail-info">
                                <div>Visibility</div>
                                <div>${visibility} km</div>
                            </div>
                        </div>
                        <div class="detail">
                            <i class="fas fa-sun"></i>
                            <div class="detail-info">
                                <div>Sunrise</div>
                                <div>${sunrise}</div>
                            </div>
                        </div>
                        <div class="detail">
                            <i class="fas fa-moon"></i>
                            <div class="detail-info">
                                <div>Sunset</div>
                                <div>${sunset}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        weatherInfo.innerHTML = '<p class="alert alert-danger">An error occurred. Please try again.</p>';
        console.error('Error:', error);
    }
}

document.getElementById('cityInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

document.getElementById('searchButton').addEventListener('click', getWeather);