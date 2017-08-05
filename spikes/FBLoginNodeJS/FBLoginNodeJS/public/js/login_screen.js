var user_input = document.getElementById("user_input");
var password_input = document.getElementById("password_input");
var submit_button = document.getElementById("submit_button");
var facebook_button = document.getElementById("facebook_button");
var flip2 = "http://flip2.engr.oregonstate.edu:46662/";

function showObject(data_object)
{
	console.log(data_object);
}

function send_data()
{

	event.preventDefault();
	var payload = {};
	payload.pw = password_input.value;
	payload.user = user_input.value;
	makePostReq(payload, flip2 + "echo", showObject);
}

function FBlogin()
{
	event.preventDefault();
	var FBlogin = flip2 + "login/FB/";
	console.log(FBlogin);
	location.href=FBlogin;
}

submit_button.addEventListener("click", send_data);
facebook_button.addEventListener("click", FBlogin);
