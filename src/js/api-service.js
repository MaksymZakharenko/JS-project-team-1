const MainURL = 'https://api.openweathermap.org/data/2.5/';
const apiKey = 'b97bd7991b77ef6d55cfd7dd50b01e99';

let location = 'Kiev';

// Получить все данные за 1 день

const fetchWeatherDataOneDay = () =>
  fetch(`${MainURL}weather?units=metric&q=${location}&appid=${apiKey}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка! Такого города нет в списке!`);
  });

// Получить все данные за 5 дней

const fetchWeatherDataFiveDays = () =>
  fetch(`${MainURL}forecast?units=metric&q=${location}&appid=${apiKey}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка! Такого города нет в списке!`);
  });

//   Получение текущей локации после нажатия на Сабмит или Enter

const setLocation = (newLocation = 'Kiev') => {
  location = newLocation;
};

export { fetchWeatherDataFiveDays, fetchWeatherDataOneDay, setLocation, location };
