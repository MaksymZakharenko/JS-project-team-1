import { setLocation, location } from './api-service';
import { renderOneDayMarkup } from './render-one-day-forecast';
import { dataFiveDays } from './render-five-day-forecast';

const bodyRef = document.querySelector('body');

let locationImg = location;

const fetchImg = () =>
  fetch(
    `https://pixabay.com/api/?image_type=backgrounds&orientation=horizontal&q=${locationImg}&per_page=20&key=21708715-c005b8eff9b2107cefe751bb8`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка! Такого города нет в списке!`);
  });

//   Получение текущей локации после нажатия на Сабмит или Enter

const setLocationImg = newLocation => {
  locationImg = newLocation;
};

function setImgBg() {
  fetchImg().then(data => {
    const contryImgUrl = data.hits[11].largeImageURL;
    const styleValue = `background: url(${contryImgUrl}) center fixed; background-size: cover;`;
    bodyRef.setAttribute('style', styleValue);
  }).catch(error => console.log('Такого изображения не существует'));
}
setImgBg();

export { setImgBg, setLocationImg };

//=====================================================ОПРЕДЕЛЕНИЕ ГЕОДАННЫХ=============================
navigator.geolocation.getCurrentPosition(success, error)
function error() {
  setLocation();
  renderOneDayMarkup();
  dataFiveDays();
  setLocationImg();
  setImgBg();
}

function success(position) {
  const apikey = '993fb22893a947dbb2d0ca6e36241a91';
  
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apikey}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка! Такого города нет в списке!`);
  })
  .then(data => {
    const myCity = data.results[0].components.city;
    setLocation(myCity);
    renderOneDayMarkup();
    dataFiveDays();
    setLocationImg(myCity);
    setImgBg();
  })
}





