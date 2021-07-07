import { setLocation } from './api-service';
import { renderOneDayMarkup } from './render-one-day-forecast';
import { dataFiveDays } from './render-five-day-forecast';
import { hideMoreInfo } from './render-more-info';
import { setLocationImg, setImgBg } from './geolocation';
import { allDestroy, renderChartUpdate } from './render-chart';
import { randomQuote } from './quotes';

const inputRef = document.querySelector('.search-city__input');

const formInput = document.querySelector('.search-city__form');

formInput.addEventListener('submit', getCities);

function getCities(e) {
  e.preventDefault();
  const inputValue = inputRef.value;
  const normalizedLoc = inputValue.toLowerCase().trim();
  if (!normalizedLoc) return;

  inputRef.value = '';
  setLocation(normalizedLoc);
  renderOneDayMarkup();
  dataFiveDays();
  hideMoreInfo();
  setLocationImg(normalizedLoc);
  setImgBg();
  setTimeout(() => {
    allDestroy();
    renderChartUpdate();
  }, 300);
  randomQuote();
}