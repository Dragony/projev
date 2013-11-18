fs = require('fs');
var events = global.req('logic/events');
var ioPlain = global.req('logic/boot');
var io = ioPlain.io;

module.exports = function(){
	console.log('Inited Form listener');
	io.sockets.on('connection', function (socket){
		console.log('Connection recieved');
		socket.on('formSubmit', function(formData){
			console.log('Form recieved');
			fs.exists(__dirname + '/' + formData.action + '.js', function(exists){
				if(exists){
					console.log('Form Found: ', formData.action);
					var form = require(__dirname + '/' + formData.action)(formData, socket);
					events.on('formResponse', function(response){
						console.log('formResponse event recieved');
						io.sockets.socket(socket.id).emit('formResponse', { action: response.action, response: response.data});
					});
				}else{
					console.log('Form not found: ', formData.action);
				}
			})
		});
	});
}