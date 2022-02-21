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
    if (inputValue.length === "") {
        return clearAll();
    } else {
        fetchCountries(inputValue).then(markupCountryInfo).catch(() => {
            Notify.failure('Oops, there is no country with that name');
            clearAll();
        });
    };
}

inputEl.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));

const markupCountryInfo = (country) => {
    if (country.length > 10) {
        clearAll();
        return Notify.info("Too many matches found. Please enter a more specific name.");
    } if (country.length >= 2 && country.length <= 10) {
        countryListEl.innerHTML = countryList(country);
    } else {
        countryInfoEl.innerHTML = countryInfo(country[0]);
    }
}

function clearAll() {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
}