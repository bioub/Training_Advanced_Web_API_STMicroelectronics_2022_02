const express = require('express');
const http = require('http');
const { WebSocketServer, WebSocket } = require('ws');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

// will respond with db.json
app.get('/data', (req, res, next) => {
  res.setHeader('Content-type', 'application/json');
  res.sendFile(path.resolve(__dirname, '..', 'db.json'));
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Backend started on PORT 3000');
});


const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data, isBinary) => {
    for (const client of wss.clients) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    }
  });
});