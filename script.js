const apiKey = '65a6fe2a08c2ead248886135191ce263'; // replace with your key

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const weatherBox = document.getElementById('weatherResult');
    const errorMsg = document.getElementById('errorMsg');

    if (city === '') {
        errorMsg.textContent = 'Please enter a city name.';
        weatherBox.classList.add('hidden');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();

        console.log(data);
        console.log("Weather icon code is:", data.weather[0].icon);

        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('temp').textContent = data.main.temp;
        document.getElementById('feelsLike').textContent = data.main.feels_like;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind').textContent = data.wind.speed;
        document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        weatherBox.classList.remove('hidden');
        errorMsg.textContent = '';
    } catch (error) {
        errorMsg.textContent = 'City not found. Please try again.';
        weatherBox.classList.add('hidden');
    }
}