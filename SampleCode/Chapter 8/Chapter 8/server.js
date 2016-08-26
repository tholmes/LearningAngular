var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();

app.use(express.static('./'));
app.use(bodyParser.json());
app.post('/save', function(req, res) {
  console.log(JSON.stringify(req.headers));
  if (req.headers['authorization'] === 'Taco') {
    res.json({ ok: true });
  } else {
    // 401 = "Unauthorized"
    res.status(401).json({ ok: false });
  }
});

app.get('/tweets/:id', function(req, res) {
  res.json({ id: req.params.id });
});

app.post('/tweets/:id/send', function(req, res) {
  res.json({ id: req.params.id, ok: 1 });
});

// Twitter API stub
var tweets = {
  '123456': {
    id: '123456',
    status: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
};

var retweets = {};

app.get('/statuses/retweets/:id', function(req, res) {
  return res.json(retweets[req.params.id] || []);
});
app.get('/statuses/show/:id', function(req, res) {
  if (tweets[req.params.id]) {
    return res.json(tweets[req.params.id]);
  }
  res.status(404).json({});
});
app.post('/statuses/destroy/:id', function(req, res) {
  if (tweets[req.params.id]) {
    delete tweets[req.params.id];
    return res.json({});
  }
  res.status(404).json({});
});
app.post('/statuses/update/:id', function(req, res) {
  if (tweets[req.params.id]) {
    tweets[req.params.id] = req.body;
    return res.json(tweets[req.params.id]);
  }
  res.status(404).json({});
});
app.post('/statuses/retweet/:id', function(req, res) {
  if (tweets[req.params.id]) {
    retweets[req.params.id] = retweets[req.params.id] || [];
    retweets[req.params.id].push(req.body);
    return res.json(req.body);
  }
  res.status(404).json({});
});

var io = require('socket.io')();
io.on('connection', function(socket) {
  console.log('Received SocketIO connection');
  
  socket.on('event', function(data) {});
  socket.on('disconnect', function() {});
  socket.on('message', function(data) {
    io.emit('message', data);
  });
});
io.listen(8081);

app.listen(8080);

console.log('Listening on port 8080');
