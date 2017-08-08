var login_button = document.getElementById("login_button");
var signup_button = document.getElementById("signup_button");

function goto_signup()
{
	event.preventDefault();
	location.href="/signup/";
}
function goto_login()
{
	event.preventDefault();
	location.href="login/";
}
signup_button.addEventListener("click",goto_signup);
login_button.addEventListener("click",goto_login);