const API_KEY = "YOUR API KEY" // Replace with your actual API key

function handleFormSubmit(event) {
  event.preventDefault();
  const city = document.getElementById('city').value.trim();
  if (!city) return;
  fetchCurrentWeather(city);
  fetchFiveDayForecast(city);
}

function fetchCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`;
  fetch(url)
    .then(resp => resp.json())
    .then(json => displayCurrentWeather(json));
}

function displayCurrentWeather(json) {
  document.getElementById('temp').innerHTML = json.main?.temp || '';
  document.getElementById('low').innerHTML = json.main?.temp_min || '';
  document.getElementById('high').innerHTML = json.main?.temp_max || '';
  document.getElementById('humidity').innerHTML = json.main?.humidity || '';
  document.getElementById('cloudCover').innerHTML = json.clouds?.all || '';
}

function fetchFiveDayForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`;
  fetch(url)
    .then(resp => resp.json())
    .then(json => displayFiveDayForecast(json));
}

function displayFiveDayForecast(json) {
  const aside = document.querySelector('aside');
  aside.innerHTML = '';
  if (!json.list) return;
  json.list.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${item.dt_txt}</strong><br>
      Temp: ${item.main.temp}<br>
      Humidity: ${item.main.humidity}
    `;
    aside.appendChild(div);
  });
}

function createChart(json) {
  // Bonus: render temperature chart using five day forecast data and ChartJS
  if (!json.list) return;
  const ctx = document.getElementById('WeatherChart').getContext('2d');
  const labels = json.list.map(item => item.dt_txt);
  const temps = json.list.map(item => item.main.temp);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperature',
        data: temps,
        borderColor: 'rgba(75,192,192,1)',
        fill: false
      }]
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cityForm').addEventListener('submit', handleFormSubmit);
});