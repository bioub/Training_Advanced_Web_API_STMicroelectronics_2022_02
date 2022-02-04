import { MyCard } from './my-card.js';

async function fetchData() {
  const res = await fetch('http://localhost:3000/data');
  const data = await res.json();
  return data;
}


fetchData().then((cardsData) => {
  for (const cardData of cardsData) {
    /** @type {MyCard} */
    const myCardEl = document.createElement('my-card');
    myCardEl.cardId = cardData.id;
    myCardEl.cardTitle = cardData.title;
    myCardEl.src = cardData.src;
    myCardEl.likes = cardData.likes;
    document.body.appendChild(myCardEl);
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

    /** @type {MyCard} */
    const myCardEl = document.querySelector(`my-card[card-id="${cardId}"]`);
    myCardEl.likes++;
  }
});

const messageToSend = [];

document.body.addEventListener('click', (event) => {
  /** @type {HTMLElement} */
  const target = event.target;

  /** @type {MyCard} */
  const myCardEl = target.closest('my-card');
  if (myCardEl) {
    if (ws.OPEN) {
      ws.send(JSON.stringify({ type: 'card-increment', cardId: myCardEl.cardId }))
      myCardEl.likes++;
      /** @type {HTMLSpanElement} */
      // const spanEl = myCardEl.shadowRoot.querySelector('span');
      // spanEl.innerText = (parseInt(spanEl.innerText, 10) + 1) + ' likes';
    }
    else {
      messageToSend.push({ type: 'card-increment', cardId: myCardEl.cardId });
    }
  }
});