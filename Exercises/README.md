# Exercises

## WebSockets

Install the `ws` package : `npm i ws`

In `backend/index.js` create a WebSocket server on port `9000`.

In `frontend/index.js` connect to this WebSocket server

When the user clicks on the `<div class="my-card">` element, emit a message through the WebSocket in this format : `{ "type": "card-increment", "cardId": 4 }` where 4 is the id of the card clicked.

In `backend/index.js` broadcast this message to other clients like this example (only if the message type is `"card-increment"`) :

https://github.com/websockets/ws#server-broadcast

In `frontend/index.js` listen to the message event of the WebSocket and increment the corresponding card likes (only if the message type is `"card-increment"`)

Bonus : In `backend/index.js` store the new increment count in `db.json` with the `fs` or `fs-extra` module.
