// URL https://api.openweathermap.org/data/2.5/weather?q=bogota&appid=3257091301d1cca0fd70065a261a4481&units=metric

const apiKey = '3257091301d1cca0fd70065a261a4481';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city = 'bogota') {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    let cityError = (document.querySelector('.error').style.display = 'block');
    let weather = (document.querySelector('.weather').style.display = 'none');
  } else {
    var data = await response.json();

    const cityName = (document.querySelector('.city').innerHTML = data.name);
    const temp = (document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '°c');
    const humidity = (document.querySelector('.humidity').innerHTML =
      data.main.humidity + '%');
    const wind = (document.querySelector('.wind').innerHTML =
      data.wind.speed + ' Km/h');

    switch (data.weather[0].main) {
      case 'Clouds':
        weatherIcon.src = './app/img/cloud.png';
        break;
      case 'Clear':
        weatherIcon.src = './app/img/sun.png';
        break;
      case 'Rain':
        weatherIcon.src = './app/img/rain.png';
        break;
      case 'Drizzle':
        weatherIcon.src = './app/img/rain.png';
        break;
      case 'Mist':
        weatherIcon.src = './app/img/mist.png';
        break;
      case 'Snow':
        weatherIcon.src = './app/img/snow.png';
        break;
      default:
        weatherIcon.src = './app/img/sun.png';
        break;
    }

    let weather = (document.querySelector('.weather').style.display = 'block');
    let cityError = (document.querySelector('.error').style.display = 'none');
  }
}

checkWeather();

searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    checkWeather(searchBox.value);
  }
});

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
