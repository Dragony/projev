var userModel = global.req('logic/entities').user;
var _ = require('underscore');
var events = global.req('logic/events');
var session = global.req('logic/session');

module.exports = function(formData, socket){
	var that = this;

	var data = formData.data;
	var errors = [];
	var result = true;
	console.log('login recieved', {username: data.username, password: data.pwd});
	userModel.find({ where: {username: data.username, password: data.pwd} }).success(function(user){
  		if(user === null){
  			events.emit('formResponse', { action: 'login', data: { result: false, errors: [{ username: 'You could not be logged in. Invalid Information.' }]} });
  		}else{
  			session.getById(socket.manager.handshaken[socket.id].sessionID).set('validated', true);
  			events.emit('formResponse', { action: 'login', data: { result: true } });
  		}
	})
	return this;
}