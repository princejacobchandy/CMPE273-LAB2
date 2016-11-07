var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";

exports.handle_gettheads = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);
	
			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('product_table');		
			//coll.find({seller_email: req.session.email}).toArray(function(err, results){
			//coll.find({"seller_email": {$ne:req.session.email}}).toArray(function(err, results)	{
			coll.find({"seller_email": {$ne:msg.seller_email}, "product_qty": {$ne:msg.product_qty}}).toArray(function(err, results)	{
				
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


exports.handle_placebid = function(msg, callback){
	
			var res = {};
			
			
			//currenttime=currenttime.toISOString();
			
			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('product_table');		
			coll.find({product_name: msg.product_name}).toArray(function(err, results){
			
			var bidendtime= new Date(results[0].bid_end);
			var currenttime=new Date();
			
			var currenttimer=(bidendtime) - (currenttime);
			console.log("bidendtime: " + bidendtime);
			console.log("currenttime: " + currenttime);
			console.log("(bidendtime) - (currenttime): " + currenttimer);
			
			var secs=Math.round(currenttimer/1000);;			
			var mins=Math.round(secs/60);
			var hrs=Math.round(mins/60);
			var dys=Math.round(hrs/24);
			//currenttimer = dys + ' day, ' + hrs + ' hours, ' + mins + ' minutes, ' + secs + ' seconds';  
			if(dys>1) {
			var days=" days"; }
			else {
			var days=" day"; }
			currenttimer = dys + days;
			if ((bidendtime) - (currenttime)) {
			
						mongo.connect(mongoURL, function(){
						//console.log('In Register: Connected to mongo at: ' + mongoURL);
						var coll = mongo.collection('bidding_table');

						coll.insert({"product_id": msg.product_id, "product_name": msg.product_name, "product_desc": msg.product_desc, "product_qty": msg.product_qty, "product_seller": msg.product_seller, "product_buyer": msg.product_buyer, "bid_price": msg.bid_price, "actual_price": msg.actual_price, "bid_endtime": msg.bid_endtime}, function(err, user){
							
						//not doing anything
						});
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User bid an item : ' +msg.product_buyer+ ' bid ' +msg.product_name+ '; ' +msg.product_qty+'(Quantity)'+ '\n', function(err){});											
									console.log("new info was added to bidding table")
									var json_responses;
									json_responses = {"statusCode": 200, "currenttimer": currenttimer};
				res.json_responses=json_responses;
				callback(null, res);

						});			
				
			}
			else {
									console.log("bidding time is over")
									var json_responses;
									json_responses = {"statusCode": 201};
				res.json_responses=json_responses;
				callback(null, res);			
			}
			});	
	
			});

}



exports.handle_addtocart = function(msg, callback){
	
			var res = {};
			
		mongo.connect(mongoURL, function(){
		//console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('shoppingcart');

		coll.findOne({buyer_uname: msg.buyer_uname, product_id: msg.product_id}, function(err, user){
			if (user) {

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('shoppingcart');

		coll.find({buyer_uname: msg.buyer_uname, product_id: msg.product_id}).toArray(function(err, results){	
			if (results) {
				var new_quantity=results[0].product_qty + msg.product_qty;
			
				mongo.connect(mongoURL, function(){
					var coll = mongo.collection('shoppingcart');
					coll.update({"cart_id": results[0].cart_id},{$set:{"product_qty":new_quantity}},function(err, results){
						//not doing anything here
					});
				});				

var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User updated an item in his shopping cart : ' +msg.buyer_uname+ ' added ' +msg.product_name+ '; ' +msg.product_qty+'(Quantity)' +'\n', function(err){});											
							console.log("existing cart info was updated properly;")
							var json_responses;
							//json_responses = {"itemsInCart": req.session.currentcart};
							json_responses = {"statusCode": 301};
				res.json_responses=json_responses;
				callback(null, res);
				

			} 
		});
		});				

			} else {
                console.log("respective user entry for this product not present in db, so insering the respective info to shoppingcart table");
				mongo.connect(mongoURL, function(){
						//console.log('In Register: Connected to mongo at: ' + mongoURL);
						var coll = mongo.collection('shoppingcart');
						coll.insert({"buyer_uname": msg.buyer_uname, "product_id": msg.product_id, "product_qty": msg.product_qty, "product_name": msg.product_name, "product_desc": msg.product_desc, "product_price": msg.product_price, "seller_uname": msg.seller_uname, "seller_email": msg.seller_email, "product_totalqty": msg.product_totalqty}, function(err, user){						
						//not doing anything
						});
						
					});	
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User added an item to his shopping cart : ' +msg.buyer_uname+ ' added ' +msg.product_name+ '; ' +msg.product_qty+'(Quantity)' +'\n', function(err){});											
					
							console.log("new info was added to shopping cart")
							//console.log("added item to the cart and added that to session")
							var json_responses;
							//json_responses = {"itemsInCart": req.session.currentcart};
							json_responses = {"statusCode": 302};
				res.json_responses=json_responses;
				callback(null, res);			
			
			}
		});
	});			
	
}



