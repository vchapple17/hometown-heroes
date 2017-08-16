var user_id = document.getElementById("user_id");
var first_name = document.getElementById("first_name");
var last_name = document.getElementById("last_name");
var email = document.getElementById("email");
var mobile = document.getElementById("mobile");
var street1 = document.getElementById("street1");
var street2 = document.getElementById("street2");
var city = document.getElementById("city");
var state = document.getElementById("state");
var zip = document.getElementById("zip");
var localhosturl = "./";

function showObject(data_object)
{
	console.log(data_object);
}

function send_data()
{
	event.preventDefault();
	var payload = {};
	payload.user_id = user_id.value
	payload.first_name = first_name.value;
	payload.last_name = last_name.value;
	payload.email = email.value;
	payload.mobile = mobile.value;
	payload.street1 = street1.value;
	payload.street2 = street2.value;
	payload.city = city.value;
	payload.state = state.value;
	payload.zip = zip.value;
	makePostReq(payload, localhosturl, showObject);
}

submit_button.addEventListener("click", send_data);
