const boxEl = document.querySelector('.box');

boxEl.addEventListener('click', () => {
  boxEl.innerText++;
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((res) => res.json())
    .then((user) => console.log(user));
});

window.addEventListener('load', async () => {
  try {
    const reg = await navigator.serviceWorker.register('sw.js');
    console.log('Registration of sw.js succeeded');
  } catch (err) {
    console.log('Registration of sw.js failed');
  }
});