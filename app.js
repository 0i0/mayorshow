var DEBUG = process.env.NODE_ENV != 'production';

// Dependencies.
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.configure(function(){
  app.set('views',__dirname + '/views')
  app.set('view engine', 'jade')
  app.set('view options', { layout: false })
  app.use(express.methodOverride())
  app.use(express.static(__dirname + '/client'))
  app.use(require('stylus').middleware({ src:'client' }))
  app.use(express.bodyParser());
  app.use(express.cookieParser())
  app.use(app.router)
})

var port = process.env.PORT || 3000
server.listen(port)
console.log('app running on port %d', port)

app.get('/', function(req, res) {
  res.render('home.jade', {});
});

app.get('/_admin', function(req, res) {
  res.render('control.jade')
});

var colorState = {r: 0, g:0, b:0, interval: 0};

io.sockets.on('connection', function (socket) {
  socket.emit('colorState', colorState);
  socket.on('colorState', function (data) {
      colorState = data;
      socket.broadcast.emit('colorState', colorState);
  });
});
