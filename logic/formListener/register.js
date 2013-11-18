var userModel = global.req('logic/entities').user;
var _ = require('underscore');
var events = global.req('logic/events');
var util = require("util");

module.exports = function(formData){
	var that = this;

	var data = formData.data;
	var errors = [];
	var result = true;
	var user = userModel.findOrCreate({ username: data.username }, { email: data.email })
	.success(function(user, created){
		if(created){
			result = true;
			user.updateAttributes(data).error(function(error){
				result = false;
				errors.push(error);
			});
		}else{
			result = false;
			if(user.username == data.username){
				errors.push({ username: 'Username already taken'});
			}
			if(user.email == data.email){
				errors.push({ email: 'E-Mail already taken' });
			}
		}
		events.emit('formResponse', { action: 'register', data: { result: result, errors: errors } });
	}).error(function(error){
		result = false;
		errors.push(error);
		events.emit('formResponse', { action: 'register', data: { result: result, errors: errors } });
	})
	return this;
}