var events = require('events');

module.exports = new function(){
	var emitter = new events.EventEmitter();
	return emitter;
}