async function fetchData() {
  const res = await fetch('http://localhost:3000/data');
  const data = await res.json();
  return data;
}

/**
 * @param {object} cardData
 * @param {number} cardData.id
 * @param {string} cardData.title
 * @param {string} cardData.src
 * @param {number} cardData.likes
 */
function createMyCard(cardData) {
  const divEl = document.createElement('div');
  divEl.className = 'my-card';
  divEl.dataset.cardId = cardData.id;
  
  const imgEl = document.createElement('img');
  imgEl.src = cardData.src;

  const h2El = document.createElement('h2');
  h2El.innerText = cardData.title;

  const spanEl = document.createElement('span');
  spanEl.innerText = cardData.likes + ' likes';

  divEl.append(imgEl, h2El, spanEl);

  return divEl;
}

fetchData().then((cardsData) => {
  for (const cardData of cardsData) {
    document.body.appendChild(createMyCard(cardData));
  }
});

const ws = new WebSocket('ws://localhost:3000');
ws.addEventListener('open', () => {
  for (const msg of messageToSend) {
    ws.send(JSON.stringify(msg));
  }
});

ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);

  if (msg.type === 'card-increment') {
    const cardId = msg.cardId;

    /** @type {HTMLSpanElement} */
    const spanEl = document.querySelector(`.my-card[data-card-id="${cardId}"] span`);
    spanEl.innerText = (parseInt(spanEl.innerText, 10) + 1) + ' likes';
  }
});

const messageToSend = [];

document.body.addEventListener('click', (event) => {
  /** @type {HTMLElement} */
  const target = event.target;
  const myCardEl = target.closest('.my-card');
  if (myCardEl) {
    if (ws.OPEN) {
      ws.send(JSON.stringify({ type: 'card-increment', cardId: myCardEl.dataset.cardId }))

      const cardId = myCardEl.dataset.cardId;
      
      /** @type {HTMLSpanElement} */
      const spanEl = document.querySelector(`.my-card[data-card-id="${cardId}"] span`);
      spanEl.innerText = (parseInt(spanEl.innerText, 10) + 1) + ' likes';
    }
    else {
      messageToSend.push({ type: 'card-increment', cardId: myCardEl.dataset.cardId });
    }
  }
});