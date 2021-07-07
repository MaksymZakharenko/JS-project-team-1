import dateToday from '../templates/date.hbs';
import { fetchWeatherDataOneDay } from './api-service';
import sansetImg from '../images/svg/sunset.svg';
import sunriseImg from '../images/svg/sunrise.svg';
import renderOneDayMarkup from './render-one-day-forecast'
const dateRef = document.querySelector('.today__date');
const numberDateRef = document.querySelector('.date-day');
const monthRef = document.querySelector('.date-month');

// --------------------------------------
const th = function (d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

function initRender() {
  const { weekDayNow, dayNow, MonthNow, result } = time();

  dateRef.innerHTML = dateToday({
    sansetImg,
    sunriseImg,
    month: MonthNow,
    time: result,
    date: dayNow,
    weekDay: weekDayNow,
    th: th(dayNow),
  });
}
initRender();


// function renderDate() {
//   const currentTimeRef = document.querySelector('.date-time');
//   const numberDateRef = document.querySelector('.date-day');
//   const monthRef = document.querySelector('.date-month');

//   const { weekDayNow, dayNow, MonthNow, result } = time();
//   // currentTimeRef.textContent = result;
// }

// setInterval(renderDate, 1000);

function pad(value) {
  return String(value).padStart(2, '0');
}
function time(timeZone = new Date() ) {
  const date = new Date();

  const weekDayNow = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);

  const dayNow = date.getDate();

  const MonthNow = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);

  let result = pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
  return { weekDayNow, dayNow, MonthNow, result };
}

