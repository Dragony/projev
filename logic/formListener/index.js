fs = require('fs');
var events = require('events');
var emitter = new events.EventEmitter();

module.exports.listen = function(io){
	console.log('Inited Form listener');
	io.sockets.on('connection', function (socket){
		socket.on('formSubmit', function(formData){
			fs.exists(__dirname + '/' + formData.action + '.js', function(exists){
				if(exists){
					var form = require(__dirname + '/' + formData.action)(formData);
					form.on('formResponse', function(response){
						io.sockets.socket(socket.id).emit('formResponse', { action: response.action, response: response.data});
					})
				}else{
					console.log('Form not found: ', formData.action);
				}
			})
		});
	});
}