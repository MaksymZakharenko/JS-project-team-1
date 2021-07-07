import fivedays from '../templates/weather-five-days.hbs';
import { fetchWeatherDataFiveDays } from './api-service';

const ulRef = document.querySelector('.five-days__weather-week-list');
const fiveDaysDiv = document.querySelector('.five-days__weather-week');

let newNewWeather = [];

function dataFiveDays() {
  return fetchWeatherDataFiveDays().then(data => {
    const date2 = data.list.map(element => new Date(element.dt * 1000).getDate());
    const date5 = date2.filter((elem, index, arr) => arr.indexOf(elem) === index);
    const allDays = data.list;
    let weatherFiveDays = date5.map(data =>
      allDays.filter(obj => new Date(obj.dt * 1000).getDate() === data),
    );
    if (weatherFiveDays.length > 5) {
      weatherFiveDays = weatherFiveDays.slice(1);
    }

    newNewWeather = weatherFiveDays.map(day => {

      return {
        moreInfo: day,
        week: weekDayNow(day[0].dt),
        month: timeConverter(day[0].dt),
        year: timeConverter2(day[0].dt),
        icon: `http://openweathermap.org/img/wn/${day[0].weather[0].icon}@2x.png`,
        temp: mathTemp(day),
        date: dayConv(day[0].dt),
        wind: windTemp(day),
        tempDay: everageTemp(day),
        pressure: pressure(day),
        humidity: humidity(day),
      };
    });
    ulRef.innerHTML = fivedays(newNewWeather);
    return Promise.resolve(newNewWeather);
  });
}

dataFiveDays();

// ==========================================день недели===================================================

const weekDayNow = data => {
  const date = new Date(data * 1000);
  const weekDay = new Intl.DateTimeFormat('en', { weekday: 'long' }).format(date);
  return weekDay;
};
// =========================================== дата месяц =================================================

const timeConverter = data => {
  const a = new Date(data * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = date + ' ' + month;
  return time;
};
// ============================================средняя температура min/max дня================================

const mathTemp = data => {
  data = data.map(e => Math.floor(e.main.temp_min));
  const temp = {
    TempMin: Math.min(...data),
    TempMax: Math.max(...data),
  };
  return temp;
};
// ===================================================глобальная формула вычисления даты=======================

const getAverageDate = (data, keyBase) => {
  const total = new Date(data * 1000);
  const result = total[keyBase]();
  return result;
};

// =========================================день число===========================================================

const dayConv = data => getAverageDate(data, 'getDate');

// =================================================== год ======================================================

const timeConverter2 = data => getAverageDate(data, 'getFullYear');



// ===================================================глобальная формула по средним значениям=====================
const getAverage = (data, keyBase, key) => {
  const total = data.map(e => Math.floor(e[keyBase][key])).reduce((a, b) => a + b, 0);
  const result = Math.floor(+total / data.length);
  return result;
};

// ================================================скорость ветра=================================================

const windTemp = data => getAverage(data, 'wind', 'speed');

// ============================================средняя температура дня============================================

const everageTemp = data => getAverage(data, 'main', 'temp');

// ============================================среднее давление дня===============================================

const pressure = data => getAverage(data, 'main', 'pressure');

// ============================================средняя влажность дня==============================================

const humidity = data => getAverage(data, 'main', 'humidity');


// ============================================ Стрелки скролл ===================================================

fiveDaysDiv.addEventListener('click', fiveDayScroll);

function fiveDayScroll(e) {
  if (e.target.classList.contains('right-arrow')) {
    scrollRightt();
  } else if (e.target.classList.contains('left-arrow')) {
    scrollLeftt();
  }
}

function scrollRightt(e) {
    ulRef.scrollTo({
      left: 1000,
      behavior: 'smooth',
    });
}

function scrollLeftt(e) {
    ulRef.scrollTo({
      left: -1000,
      behavior: 'smooth',
  });
}

export { dataFiveDays };
export { newNewWeather };
