var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";

exports.handle_getprofile = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('userdetails');		
			coll.find({email: msg.email}).toArray(function(err, results){
			if (results) {
				console.log("results.length is " + results.length);
				console.log("results is " + results);
				
						var rows = results;
	                    var jsonString = JSON.stringify(results);
	                    var jsonParse = JSON.parse(jsonString);
	                    console.log("Results Type: " + (typeof results));
	                    //console.log("Result Element Type:" + (typeof rows[0].emailid));
	                    console.log("Results Stringify Type:" + (typeof jsonString));
	                    console.log("Results Parse Type:" + (typeof jsString));
	                    console.log("Results: " + (results));
	                    //console.log("Result Element: "+(rows[0].emailid));
                        console.log("Results Stringify:" + (jsonString)); 
                        console.log("Results Parse:" + (jsonParse));
						
                //console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
				
				var json_responses;
				json_responses = {"statusCode" : 200, "user_details": jsonParse};
				res.json_responses=json_responses;
				callback(null, res);
			}	
			});	
	
			});			
	
}


exports.handle_getmyads = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('product_table');		
			coll.find({seller_email: msg.seller_email}).toArray(function(err, results){
			if (results) {
				results_length=results.length;
				console.log("results.length is " + results.length);
				console.log("results is " + results);
				
						var rows = results;
	                    var jsonString = JSON.stringify(results);
	                    var jsonParse = JSON.parse(jsonString);
	                    console.log("Results Type: " + (typeof results));
	                    //console.log("Result Element Type:" + (typeof rows[0].emailid));
	                    console.log("Results Stringify Type:" + (typeof jsonString));
	                    console.log("Results Parse Type:" + (typeof jsString));
	                    console.log("Results: " + (results));
	                    //console.log("Result Element: "+(rows[0].emailid));
                        console.log("Results Stringify:" + (jsonString)); 
                        console.log("Results Parse:" + (jsonParse));
						console.log("results_length is:" + results_length);
						
                //console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
				
				var json_responses;
				json_responses = {"statusCode" : 200, "product_list": jsonParse, "results_length": results_length};
				res.json_responses=json_responses;
				callback(null, res);
                
            } 
			else {
                console.log("database empty");
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.json_responses=json_responses;
				callback(null, res);
			
            }	
			});	
	
			}); 		
	
}


exports.handle_getsolditems = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('bill_table');		
			coll.find({seller_name: msg.seller_name}).toArray(function(err, results){
			if (results) {
				results_length=results.length;
				console.log("results.length is " + results.length);
				console.log("results is " + results);
				
						var rows = results;
	                    var jsonString = JSON.stringify(results);
	                    var jsonParse = JSON.parse(jsonString);
	                    console.log("Results Type: " + (typeof results));
	                    //console.log("Result Element Type:" + (typeof rows[0].emailid));
	                    console.log("Results Stringify Type:" + (typeof jsonString));
	                    console.log("Results Parse Type:" + (typeof jsString));
	                    console.log("Results: " + (results));
	                    //console.log("Result Element: "+(rows[0].emailid));
                        console.log("Results Stringify:" + (jsonString)); 
                        console.log("Results Parse:" + (jsonParse));
						console.log("results_length is:" + results_length);
						
                //console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
				
				var json_responses;
				json_responses = {"statusCode" : 200, "product_list": jsonParse, "results_length": results_length};
				res.json_responses=json_responses;
				callback(null, res);
                
            } else {
                console.log("database empty");
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.json_responses=json_responses;
				callback(null, res);
			
            }	
			});	
	
			});			
	
}


exports.handle_getpurchaseditems = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('bill_table');		
			coll.find({buyer_name: msg.buyer_name}).toArray(function(err, results){
			if (results) {
				results_length=results.length;
				console.log("results.length is " + results.length);
				console.log("results is " + results);
				
						var rows = results;
	                    var jsonString = JSON.stringify(results);
	                    var jsonParse = JSON.parse(jsonString);
	                    console.log("Results Type: " + (typeof results));
	                    //console.log("Result Element Type:" + (typeof rows[0].emailid));
	                    console.log("Results Stringify Type:" + (typeof jsonString));
	                    console.log("Results Parse Type:" + (typeof jsString));
	                    console.log("Results: " + (results));
	                    //console.log("Result Element: "+(rows[0].emailid));
                        console.log("Results Stringify:" + (jsonString)); 
                        console.log("Results Parse:" + (jsonParse));
						console.log("results_length is:" + results_length);
						
                //console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
				
				var json_responses;
				json_responses = {"statusCode" : 200, "product_list": jsonParse, "results_length": results_length};
				res.json_responses=json_responses;
				callback(null, res);;
                
            } else {
                console.log("database empty");
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.json_responses=json_responses;
				callback(null, res);
			
            }
	
			});	
	
			});	 		
	
}


exports.handle_getbiditems = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('bidding_table');		
			coll.find({product_buyer: msg.product_buyer}).toArray(function(err, results){
			if (results) {
				results_length=results.length;
				console.log("results.length is " + results.length);
				console.log("results is " + results);
				
						var rows = results;
	                    var jsonString = JSON.stringify(results);
	                    var jsonParse = JSON.parse(jsonString);
	                    console.log("Results Type: " + (typeof results));
	                    //console.log("Result Element Type:" + (typeof rows[0].emailid));
	                    console.log("Results Stringify Type:" + (typeof jsonString));
	                    console.log("Results Parse Type:" + (typeof jsString));
	                    console.log("Results: " + (results));
	                    //console.log("Result Element: "+(rows[0].emailid));
                        console.log("Results Stringify:" + (jsonString)); 
                        console.log("Results Parse:" + (jsonParse));
						console.log("results_length is:" + results_length);
						
                //console.log("results[0] is " + results[0] +"  results[0].fname is "+ results[0].fname);
				
				var json_responses;
				json_responses = {"statusCode" : 200, "product_list": jsonParse, "results_length": results_length};
				res.json_responses=json_responses;
				callback(null, res);
                
            } else {
                console.log("database empty");
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.json_responses=json_responses;
				callback(null, res);
			
            }
	
			});	
	
			});	 		
	
}


exports.handle_createnormalad = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

				mongo.connect(mongoURL, function(){
						//console.log('In Register: Connected to mongo at: ' + mongoURL);
						var coll = mongo.collection('product_table');
						coll.insert({"seller_handle": msg.seller_handle, "seller_uname": msg.seller_uname, "product_name": msg.product_name, "product_description": msg.product_description, "product_qty": msg.product_qty, "product_price": msg.product_price, "seller_email": msg.seller_email, "product_type": msg.product_type}, function(err, user){						
						//not doing anything
						});

var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User created a new advertisement (normal product) : ' +msg.seller_email+ ' is selling ' +msg.product_name+ '; ' +msg.product_qty+'(Quantity)'+ '\n', function(err){});											
				console.log("normal data successfully inserted and data succesfully created");				
				var json_responses;
				json_responses = {"statusCode" : 200};
				res.json_responses=json_responses;
				callback(null, res);						
					});	 		
	
}


exports.handle_createbidad = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

				mongo.connect(mongoURL, function(){
						//console.log('In Register: Connected to mongo at: ' + mongoURL);
						var coll = mongo.collection('product_table');
						coll.insert({"seller_handle": msg.seller_handle, "seller_uname": msg.seller_uname, "product_name": msg.product_name, "product_description": msg.product_description, "product_qty": msg.product_qty, "product_price": msg.product_price, "seller_email": msg.seller_email, "product_type": msg.product_type, "bid_start": msg.bid_start, "bid_end": msg.bid_end }, function(err, user){						
						//not doing anything
						});

var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User created a new advertisement (bid product) : ' +msg.seller_email+ ' is selling ' +msg.product_name+ '; ' +msg.product_qty+'(Quantity)'+ '\n', function(err){});											
				console.log("bidding data successfully inserted and data succesfully created");				
				var json_responses;
				json_responses = {"statusCode" : 200};
				res.json_responses=json_responses;
				callback(null, res);						
					});		 		
	
}



					