const searchBar = document.querySelector('#search');
const key = '1fb20811417daf7c9d46bb7f65d1ed60';
let search = '';
let url = '';
searchBar.addEventListener("keyup", function enterKey(e) {
  if (e.keyCode === 13) {
    search = searchBar.value;
    url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=${key}`;
    fetchURL(url)
    .then(data => {
      if (data !== undefined) {
        processData(data);
      }
    });
    searchBar.value = '';
  }
});

async function fetchURL(url) {
  try {
    const response = await fetch(url);
    if (response.status === 404) {
      throw new Error('City not found');
    }
    if (response.status !== 200) {
      throw new Error('Unknow error');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}

function processData(data) {
  const content = document.querySelector('#weather-content');
  content.innerHTML = '';
  const cityDiv = document.createElement("div");
  cityDiv.setAttribute('id', 'city');
  const icon = document.createElement("img");
  icon.setAttribute('alt', 'weather-icon');
  const tempDiv = document.createElement("div");
  tempDiv.setAttribute('id', 'temp');
  const weatherDiv = document.createElement("div");
  weatherDiv.setAttribute('id', 'weather');
  cityDiv.textContent = `${data.name}, ${data.sys.country}`;
  icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  tempDiv.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDiv.textContent = `${data.weather[0].description}`;
  content.appendChild(cityDiv);
  content.appendChild(icon);
  content.appendChild(tempDiv);
  content.appendChild(weatherDiv);
}