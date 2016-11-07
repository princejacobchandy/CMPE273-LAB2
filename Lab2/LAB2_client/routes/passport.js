/**

 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/ebay";
var encryption = require('./encryption');
var mq_client = require('../rpc/client');

module.exports = function(passport) {
    passport.use('checklogin', new LocalStrategy(function(username, password, done) {
	//console.log("username, pwd is : " + username + ', ' + password);
	password = encryption.encrypt(password);
		   
	var msg_payload = {
			"email": username, "pword": password
		};
	mq_client.make_request('login_queue', msg_payload, function(err, results) {

		//console.log(results);
		if (err) {
			throw err;
		} else {
			if (results.code.status == 1) {
			return done(error);

			} 
			else if (results.code.status == 2) {
			return done(null, false);

			
			}
			else if (results.code.status == 3) {
						//console.log('useremail is: ' + user.email);
                        done(null, false);		

			
			}
			else if (results.code.status == 4) {
		
			done(null, results.code.user);
			
			}			
	}});		
    
	}));


};

