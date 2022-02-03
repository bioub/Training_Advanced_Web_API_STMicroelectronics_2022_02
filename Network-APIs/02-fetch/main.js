import { fetchUserById } from './api.js';

/** @type {HTMLButtonElement} */
const btnLoadEl = document.querySelector('button.load');

const spanEl = document.querySelector('span');

// btnLoadEl.addEventListener('click', (event) => {
//   fetchUserById(1).then((user) => {}).catch((err) => {})
// });

btnLoadEl.addEventListener('click', async (event) => {
  const user = await fetchUserById(1);
  spanEl.innerText = user.name;
});