var user_input = document.getElementById("user_input");
var password_input = document.getElementById("password_input");
var submit_button = document.getElementById("submit_button");
var localhosturl = "./";

function showObject(data_object)
{
	console.log(data_object);
}

function send_data()
{
	event.preventDefault();
	var payload = {};
	payload.username = user_input.value;
	payload.password = password_input.value;
	makePostReq(payload, localhosturl, showObject);
}

submit_button.addEventListener("click", send_data);
