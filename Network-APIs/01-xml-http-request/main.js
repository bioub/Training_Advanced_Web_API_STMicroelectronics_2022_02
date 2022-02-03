import { fetchUserById } from './api.js';

/** @type {HTMLButtonElement} */
const btnLoadEl = document.querySelector('button.load');

btnLoadEl.addEventListener('click', (event) => {
  fetchUserById(1);
});