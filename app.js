var DEBUG = process.env.NODE_ENV != 'production';

// Dependencies.
var express = require('express')
  , app = express()

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

// Boot
app.get('/', function(req, res) {
  res.render('home.jade', {});
});

if (!module.parent) {
  var port = process.env.PORT || 3000
  app.listen(port)
  console.log('app running on port %d', port)
}





