var Session = function(){
	var values = {};

	function get(key, defaultVal){
		if(values[key] === undefined){
			return defaultVal ? defaultVal : undefined;
		}else{
			return values[key];
		}
	}

	function set(key, value){
		values[key] = value;
		return this;
	}

	this.get = get;
	this.set = set;
}

module.exports = new function(){
	var sessions = {};

	function getById(sessionId){
		if(sessions[sessionId] === undefined){
			sessions[sessionId] = new Session();
		}
		return sessions[sessionId];
	}

	setTimeout(function(){
		console.log('Total user sessions: ', Object.keys(sessions).length);
	}, 5000);

	this.getById = getById;
}