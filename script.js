const API_KEY = '7dada2212257c8cc7b3c9617eefcbb1c'; // Replace with your OpenWeatherMap API key
const weatherData = document.getElementById('weatherData');
const locationDisplay = document.getElementById('location');

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
        .then(response => {
            if (!response.ok) throw new Error('Weather data unavailable');
            return response.json();
        })
        .then(data => {
            updateWeatherDisplay(data);
        })
        .catch(error => {
            weatherData.textContent = 'Error fetching weather data';
            console.error(error);
        });
}

function updateWeatherDisplay(data) {
    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = (data.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h

    weatherData.innerHTML = `
        <p>${temp}°C</p>
        <p>${condition.charAt(0).toUpperCase() + condition.slice(1)}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind: ${windSpeed} km/h</p>
    `;
    locationDisplay.textContent = `Weather for ${data.name}, ${data.sys.country}`;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeather(lat, lon);
            },
            (error) => {
                weatherData.textContent = 'Location access denied. Using default location ().';
                console.error(error);
                getWeather(); // Default to Lagos, Nigeria
            }
        );
    } else {
        weatherData.textContent = 'Geolocation not supported. Using default location ().';
        getWeather(); // Default to Lagos, Nigeria
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    getLocation();
});








// Disease Detection page functionality (unchanged)
document.querySelector('.select-image')?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const dropZone = document.querySelector('.drop-zone');
            dropZone.textContent = file.name;
        }
    };
    input.click();
});

document.querySelector('.analyze-image')?.addEventListener('click', () => {
    const dropZone = document.querySelector('.drop-zone');
    if (dropZone && dropZone.textContent !== 'Drag & drop a crop image here or click to browse') {
        alert('Analyzing image... (Simulation)');
    } else {
        alert('Please select an image first!');
    }
});