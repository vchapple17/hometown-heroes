// Taken from FB Spike. Possibly need to adjust

// Flip:
//http://flip2.engr.oregonstate.edu:16661/login/facebook/callback

// localhost:
// http://127.0.0.1:16661/login/facebook/callback
module.exports = {
	'facebookAuth' : {
		'clientID': '263087834190352',
		'clientSecret': 'f06fdc70a0a796673b3423bdf340eb1f',
		'callbackURL': 'http://localhost:16661/login/facebook/callback'
	},
	'twitterAuth' : {
		'consumerKey': 'uuN5yhYRz00wf7KTohhfT1RQg',
		'consumerSecret': 'S320dXit2DXYlIERX2behoN9s5W0zNJFc5iObZGIGPHTlMDfp6',
		'callbackURL': 'http://localhost:16661/login/twitter/callback'
	}
}
