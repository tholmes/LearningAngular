var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/javascript'});
  res.write('angular.callbacks._0({ query: { count: 1, results: { quote: { Ask: 42 } } } });');
  res.end();
}).listen(8080);
console.log('Server running on port 8080');
