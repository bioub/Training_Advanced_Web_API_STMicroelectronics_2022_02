import { ws } from './ws.js';

/** @type {HTMLInputElement} */
const inputEl = document.querySelector('input.nameInput');

const spanEl = document.querySelector('span');

inputEl.addEventListener('input', () => {
  const value = inputEl.value;
  ws.send({type: 'upper', data: value});
});

ws.addEventListener('open', (event) => {
  console.log('open');
  ws.addEventListener('message', (event) => {
    console.log('message', event.data);
    spanEl.innerText = event.data;
  });
});

ws.addEventListener('error', (event) => {
  console.log('error');
});