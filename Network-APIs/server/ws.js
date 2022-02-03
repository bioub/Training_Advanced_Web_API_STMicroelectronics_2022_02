const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 9999 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    const answer = data.toString().toUpperCase()
    ws.send(answer);
  });
});