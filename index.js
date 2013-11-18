global.req = function(dir){
	return require(__dirname + '/' + dir);
}

var express = require('express')
var app = express()
  , ioPlain = require('socket.io')
  , user = require('./logic/entities')

var http = app.listen(8080);
app.use(express.static(__dirname + '/assets'));

var io = ioPlain.listen(http);
io.set('log level', 2);
io.set('browser client minification', true);

var formListener = require('./logic/formListener').listen(io);

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
	res.render('index.html');
});
