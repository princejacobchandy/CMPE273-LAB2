var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";


exports.handle_getmyads = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('product_table');		
			coll.find({seller_email: msg.seller_email}).toArray(function(err, results){
			if (results) {
	
                
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

exports.handle_getthecart = function(msg, callback){
	
			var res = {};
			console.log("inside get the cart function");
			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('shoppingcart');		
			
			coll.find({buyer_uname: msg.buyer_uname}).toArray(function(err, results)	{
			if (results) {
				console.log("in getthecart function; cart not empty");
				console.log("results is: " + results);
				var json_responses;
			
				json_responses = {"statusCode": 300, "itemsInCart": results};
				res.json_responses=json_responses;
				callback(null, res);
				console.log("pushed 300 and the cart info to client");	

	                    var jsonString = JSON.stringify(results);
	                    //console.log("Results Stringify Type:" + (typeof jsonString));
                        console.log("Results Stringify:" + (jsonString)); 
	
            } else {
                
			console.log("in getthecart function; cart empty")
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": 301};
				res.json_responses=json_responses;
				callback(null, res);	
			console.log("pushed 301 client");	
            }
	
			});	
	
			});
	
}


exports.handle_removetheitem = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('shoppingcart');		
			//console.log("recvd cartid is:" + cartID);
			//coll.remove({_id: cartID}, function(err, results){
			coll.remove({product_id: msg.product_id, buyer_uname: msg.buyer_uname}, function(err, results){
			if (results) {
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User removed an item from his shopping cart : ' +msg.buyer_uname+ ' removed ' +msg.product_id+  '\n', function(err){});											
            
			console.log("item removed from the cart")
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": 300};
				res.json_responses=json_responses;
				callback(null, res);	
			console.log("pushed 300 to client");	
			}
	
			});	
			});			
	
}

