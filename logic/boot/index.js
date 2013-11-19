var express = require('express');
var app = express();
var ioPlain = require('socket.io');
var connect = require("connect");
var cookie = require("cookie");
var session = global.req('logic/session');

module.exports = new function(){
	console.log('boot called');
	// Init and config Socket.io
	if(http === undefined){
		var port = process.env.PORT || 5000;
		var http = app.listen(port);
		console.log('Application started on Port: ', port);
		var io = ioPlain.listen(http);
		io.set('log level', 2);
		io.set('browser client minification', true);
	}

	io.set('authorization', function (handshakeData, accept) {
		if (handshakeData.headers.cookie) {
			handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
			handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['connect.sess'], global.sessionSecret);

			if (handshakeData.cookie['connect.sess'] == handshakeData.sessionID) {
				return accept('Cookie is invalid.', false);
			}
		}else{
			return accept('No cookie transmitted.', false);
		} 
		accept(null, true);
	});

	return {
		app: app,
		io: io,
		express: express
	}
}