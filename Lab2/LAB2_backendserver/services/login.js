var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";

function handle_login_request(msg, callback){
	
	var res = {};
	console.log("In login_handle request: msg.username is "+ msg.email);
	
			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('userdetails');
			
			//COMMENT THIS PORTION-UPDATION OF DB WITH TIME BEFORE RUNNING JMETER
			/* mongo.connect(mongoURL, function(){
				var coll = mongo.collection('userdetails');
				var login_time_stamp=new Date();
				login_time_stamp=login_time_stamp.toString();
				console.log("PRINCE JACOB login_time_stamp is: " + login_time_stamp);
				coll.update({"email": msg.email},{$set:{"lastlogin":login_time_stamp}},function(err, results){
				//not doing anything here
				});
			});	*/
			//COMMENT THIS PORTION-UPDATION OF DB WITH TIME BEFORE RUNNING JMETER				

            process.nextTick(function(){
                coll.findOne({email: msg.email, pword: msg.pword}, function(error, user) {
					
				
                    if(error) {
                        //return done(error);
						res.code = {status:"1", "user": user};
						callback(null, res);						
                    }

                    if(!user) {
                        //return done(null, false);
						res.code = {status:"2", "user": user};
						callback(null, res);	
                    }
					if(user){
						console.log("user exists in db");
                    if(user.pword != msg.pword) {
						console.log('useremail is: ' + user.email);
                        //done(null, false);
						res.code = {status:"3", "user": user};
						callback(null, res);							
                    }
					}
                   // connection.close();
                    
                    //done(null, user);
						res.code = {status:"4", "user": user};
						callback(null, res);						
                });
            });
        });
	
	
}

function handle_register_request(msg, callback){
	
	var res = {};
	console.log("In handle_register_request: msg.email is:"+ msg.email);
		
	
		mongo.connect(mongoURL, function(){
		
		var coll = mongo.collection('userdetails');

		coll.findOne({email: msg.email}, function(err, user){
			if (user) {
						console.log("email already in use");
						console.log("Sending 500");
						res.code = "500";
						callback(null, res);			

			} else {
                console.log("email not in use; storing user information to db");
				
				mongo.connect(mongoURL, function(){
						//console.log('In Register: Connected to mongo at: ' + mongoURL);
						var coll = mongo.collection('userdetails');

						coll.insert({"uname": msg.uname, "pword": msg.pword, "fname": msg.fname, "lname": msg.lname, "email": msg.email, "bday": msg.bday, "location": msg.location, "contact": msg.contact, "lastlogin":msg.lastlogin}, function(err, user){
							
						//not doing anything
						});
					});				
				
				
				
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', msg.lastlogin + ' : ' + 'New user signed up succesfully : ' +msg.email+ '\n', function(err){});
				
				console.log("Sending 501");
				res.code = "501";
				callback(null, res);
			}
		});
	});	
	
}

exports.handle_login_request = handle_login_request;
exports.handle_register_request = handle_register_request;