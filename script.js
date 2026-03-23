const API_KEY = "363e3057fa40e26078dc7af190cd7452";

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    document.getElementById("weather").innerHTML = "Please enter a city name 🏙️";
    return;
  }

  document.getElementById("weather").innerHTML = "Loading ☁️...";

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  const data = await res.json();

  if (data.cod !== 200) {
    document.getElementById("weather").innerHTML = `City not found: ${data.message || 'Unknown error'} 😭`;
    return;
  }

  document.getElementById("weather").innerHTML = `
    <h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" style="width:64px;">
    <p>🌡️ ${Math.round(data.main.temp)}°C</p>
    <p>💧 ${data.main.humidity}%</p>
    <p>🌬️ ${data.wind.speed.toFixed(1)} m/s</p>
    <p>${data.weather[0].description}</p>
  `;
}
