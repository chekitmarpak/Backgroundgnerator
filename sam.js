import { createServer, Server } from 'http';

createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`Hello World!`);
});

Server.listen(3000);