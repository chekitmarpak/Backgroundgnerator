const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<!DOCTYPE html>
  <html>
  <head>
	  <title>Gradient Background</title>
	  <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body id="gradient">
	  <h1>Background Generator</h1>
	  <input class="color1" type="color" name="color1" value="#00ff00">
	  <input class="color2" type="color" name="color2" value="#ff0000">
	  <h2>Current CSS Background</h2>
	  <h3></h3>
	  <script type="text/javascript" src="script.js"></script>
  </body>
  </html>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});