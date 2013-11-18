global.req = function(dir, asFunc){
	if(asFunc){
		return require(__dirname + '/' + dir)();
	}else{
		return require(__dirname + '/' + dir);
	}
}

global.sessionSecret = 'Kw8ML7AAQgFKJ7zp0rsT';

var boot = global.req('logic/boot');
var app = boot.app
  , io = boot.io
  , express = boot.express

app.use(express.static(__dirname + '/assets'));
app.use(express.cookieParser());
app.use(express.cookieSession({secret: global.sessionSecret}));

var formListener = require('./logic/formListener')();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
	res.render('index.html');
});
