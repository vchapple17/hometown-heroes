var email_input = document.getElementById("signup_email");
var username_input = document.getElementById("signup_username");
var password_input = document.getElementById("signup_password");
var submit_button = document.getElementById("signup_submit");
var flip2 = "http://flip2.engr.oregonstate.edu:16661/signup/email/create";

// import validator script
var imported = document.createElement('script');
imported.src = '/js/validator.min.js';
document.head.appendChild(imported);

function showObject(data_object)
{
	console.log(data_object);
}

function send_data()
{
	var payload = {};
	payload.email = email_input.value;
	payload.username = username_input.value;
	payload.password = password_input.value;
	makePostReq(payload, flip2, showObject);

    window.location.replace("email/success");
}

function validate()
{
	event.preventDefault();
    if(validator.isEmail(email_input.value)) {
        send_data();
    }
    else {
        alert('Invalid Email Address');
    }
}

submit_button.addEventListener("click", validate);
