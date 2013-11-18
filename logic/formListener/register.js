var userModel = global.req('logic/entities').user;
var _ = require('underscore');
var EventEmitter = new require('events').EventEmitter;
var util = util = require("util");

module.exports = function(formData){
	util.inherits(this, EventEmitter);
	var that = this;

	var data = formData.data;
	var errors = [];
	var result = true;
	console.log(data);
	var user = userModel.findOrCreate({ username: data.username }, { email: data.email })
	.success(function(user, created){
		console.log(user.values, created);
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
		that.emit('formResponse', { result: result, errors: errors });
	}).error(function(error){
		result = false;
		errors.push(error);
		that.emit('formResponse', { result: result, errors: errors });
	})
	return this;
}