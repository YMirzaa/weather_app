import searchIcon from './images/magnify.png';
import celciusIcon from './images/temperature-celsius.png';
import './style.css';

const searchBtn = document.querySelector('.search-box>div>button');
const searchInput = document.querySelector('.search-box>div>input')
const cityWeather = document.querySelector('.city-weather');
const cityName = document.querySelector('.city-name');
const degree = document.querySelector('.degree');
const errorMsg = document.querySelector('.search-err');
const celciusDiv = document.querySelector('.celcius');

let searchImg = new Image() ;
let celcius = new Image();

celcius.src = celciusIcon;
searchImg.src = searchIcon;

searchBtn.appendChild(searchImg);

searchBtn.addEventListener('click', () => {

    let city = searchInput.value;
    getWeather(city);
});


searchInput.addEventListener('keypress', (e) => {
    if(e.key == "Enter"){
        let city = searchInput.value;
        getWeather(city);
    }
});

async function getWeather(city){
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=d08c7c40f13c43ad559b464b54558e9f`, {mode: 'cors'});
        const weatherData = await response.json();
        
        cityWeather.textContent = weatherData.weather[0].description.toUpperCase();

        cityName.textContent =  city.toUpperCase();
        degree.textContent = (weatherData.main.temp - 273.15).toPrecision(2);
        
        celciusDiv.appendChild(celcius);
        errorMsg.textContent = '';
    } catch (error) {

        errorMsg.textContent = `Could not find the ${city.toUpperCase()} information`;
    }

}

getWeather('ankara');
