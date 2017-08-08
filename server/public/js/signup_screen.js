
var email_signup_button = document.getElementById("email_signup_button");
var facebook_button = document.getElementById("facebook_button");
var twitter_button = document.getElementById("twitter_button");

function EMlogin()
{
	location.href="http://localhost:16661/signup/email/";
}
function FBlogin()
{
	location.href="http://localhost:16661/login/facebook";
}
function TWlogin()
{
	location.href="http://localhost:16661/login/twitter";
}

email_signup_button.addEventListener("click", EMlogin);
facebook_button.addEventListener("click", FBlogin);
twitter_button.addEventListener("click", TWlogin);