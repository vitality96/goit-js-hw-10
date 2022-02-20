import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countryList from './templates/country-list.hbs';
import countryInfo from './templates/country-info.hbs';
import { Notify } from 'notiflix';


const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');


const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const onCountriesFetch = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue.length === 0) {
        countryListEl.innerHTML = "";
        return;
    } else {
        fetchCountries(inputValue).then(markupCountryInfo).catch(() => {
            countryListEl.innerHTML = "";
            Notify.failure('Oops, there is no country with that name');
        });
    };
}

inputEl.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));

const markupCountryInfo = (country) => {
    if (country.length > 10) {
        countryInfoEl.innerHTML = "";
        return Notify.info("Too many matches found. Please enter a more specific name.");
    } if (country.length === 1) {
        countryInfoEl.innerHTML = countryInfo(country[0]);
    } else {
        countryListEl.innerHTML = countryList(country);
    }
}
