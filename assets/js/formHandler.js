// -------------------- SOCKET EVENTS -------------------- //

socket.on('formResponse', function (data) {
	console.log('Form Response:', data);
	switch(data.action){
		case 'register':
			if(data.result){
				alert('User was registered!');
			}else{
				for(i in data.response.errors){
					var error = data.response.errors[i];
					for(field in error){
						alert('Error in field "'+ field +'": '+ error[field]);
					}
				}
			}
		break;
		case 'login':
			if(data.result){
				alert('User logged in!');
			}else{
				for(i in data.response.errors){
					var error = data.response.errors[i];
					for(field in error){
						alert('Error in field "'+ field +'": '+ error[field]);
					}
				}
			}
		break;
	}
});

// -------------------- JQUERY EVENTS -------------------- //

$(function(){
	$(document).on('submit', 'form', function(e){
		var submitAction = $(this).attr('name');
		socket.emit('formSubmit', { action: submitAction, data: formatForm($(this)) });
		console.log('Sent Values: ', submitAction, formatForm($(this)));
		e.preventDefault();
	});
})

function formatForm(form){
	var values = form.serializeArray();
	var formattedObject = {};
	$(values).each(function(k, v){
		formattedObject[v.name] = v.value;
	});
	return formattedObject;
}