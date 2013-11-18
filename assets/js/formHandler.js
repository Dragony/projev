// -------------------- SOCKET EVENTS -------------------- //

socket.on('formResponse', function (data) {
	console.log('Form Response:', data);
	switch(data.action){
		case 'register':
			alert('Congratulations, you registered a user!');
		break;
	}
});

// -------------------- JQUERY EVENTS -------------------- //

$(function(){
	$(document).on('submit', 'form', function(e){
		var submitAction = $(this).attr('name');
		socket.emit('formSubmit', { action: submitAction, data: formatForm($(this)) });
		console.log('Sent Values: ', formatForm($(this)));
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