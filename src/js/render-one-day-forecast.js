import { fetchWeatherDataOneDay,fetchWeatherDataFiveDays, setLocation } from './api-service'
import weatherOneDay from '../templates/weather-one-day.hbs'

const todayWetherRef = document.querySelector('.today__wether');
const firstTitleCurrentCityRef = document.querySelector('.five-days__title');
const secondTitleCurrentCityRef = document.querySelector('.five-days__weather-week-title-city');

function pad(value) {
    return String(value).padStart(2, '0');
};
let timeZone;
function renderOneDayMarkup() {
    return fetchWeatherDataOneDay().then(data => {
        const allWeatherParam = {temp: Math.round(data.main.temp),
            tempmin: Math.round(data.main.temp_min),
            tempmax: Math.round(data.main.temp_max),
            name: data.name,
            syscountry: data.sys.country,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
        };
        todayWetherRef.innerHTML = weatherOneDay(allWeatherParam);
//==============================================================таймер
        timeZone = data.timezone
//===============================================================таймер
        const sunrise = timeConverter(allWeatherParam.sunrise);
        const sunset = timeConverter(allWeatherParam.sunset);
        const sunriseRef = document.querySelector('.date-sunrise-time');
        const sunsetRef = document.querySelector('.date-sunset-time');

        function addSunriseSunset (sunUp, sunDown) {
            sunriseRef.textContent = sunUp;
            sunsetRef.textContent = sunDown;
        }

        addSunriseSunset(sunrise, sunset);
        addCurrentCityTitle(allWeatherParam.name, allWeatherParam.syscountry);
    }).catch(error => {
        console.log(error)
    })
}
setInterval(() => {
    const dateUTC = new Date(Date.now() + new Date().getTimezoneOffset() * 60 * 1000);
    const localDate = new Date(dateUTC.getTime() + timeZone * 1000);
    const curentTime = pad(localDate.getHours()) + ':' + pad(localDate.getMinutes()) + ':' + pad(localDate.getSeconds());
    const timeRef = document.querySelector('.date-time');
    timeRef.textContent = curentTime;
}, 1000);


function timeConverter(UNIX_timestamp){
    const UNIX_timestamps = UNIX_timestamp * 1000; 
    const dateUTC = new Date(UNIX_timestamps + new Date().getTimezoneOffset() * 60 * 1000); 
    const localDate = new Date(dateUTC.getTime() + timeZone * 1000);
    const msec = Date.parse(localDate) / 1000 ;
    var a = new Date(msec * 1000)
    const hour = pad(a.getHours());

    const min = pad(a.getMinutes());
    const time = hour + ':' + min ;
    return time;
}

function addCurrentCityTitle ( name, CountryCode ) {
    firstTitleCurrentCityRef.textContent = `${name}, ${CountryCode}`;
    secondTitleCurrentCityRef.textContent = `${name}, ${CountryCode}`;
}

export { renderOneDayMarkup };

