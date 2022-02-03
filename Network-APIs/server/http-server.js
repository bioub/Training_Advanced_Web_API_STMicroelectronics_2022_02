const http = require('http');

const user = {
  id: 1,
  name: 'Romain Bohdanowicz',
};

const server = http.createServer((req, res) => {
  const body = JSON.stringify(user);
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(body);
});

server.listen(9000, () => {
  console.log('Server started on port 9000');
});