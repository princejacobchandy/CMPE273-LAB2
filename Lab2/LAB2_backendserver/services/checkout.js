var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";


exports.handle_loadcheckoutpage = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('shoppingcart');		
			
			coll.find({buyer_uname: msg.buyer_uname}).toArray(function(err, results)	{
			if (results) {
				console.log("in loadcheckoutpage function; cart not empty");
				

				var json_responses;
				//json_responses = {"itemsInCart": req.session.currentcart};
				json_responses = {"statusCode": 300, "itemsInCart": results};
				res.json_responses=json_responses;
				callback(null, res);
				console.log("pushed 300 and the cart info to client");	
				
						//var rows = results;
	                    var jsonString = JSON.stringify(results);
	                   
	                    console.log("Results Stringify Type:" + (typeof jsonString));
	                   
                        console.log("Results Stringify:" + (jsonString)); 

            } else {
                
			console.log("in loadcheckoutpage function; cart empty")
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

exports.handle_loadaddresspayment = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('userdetails');		
			
			
			coll.find({email: msg.email}).toArray(function(err, results)	{
			if (results) {
                //console.log("shopping cart is not empty");
				console.log("in loadaddresspayment function; cart not empty");
				var json_responses;
				
				//console.log("results[0].addressline1 is: " + results[0].addressline1 + ',  results[0].ccard_info is: ' + results[0].ccard_info);
				
				if(results[0].addressline1==''){
					//console.log("addressline1 is null");
				addressline1='';	
				addressline2='';
				addresscity='';
				addressstate='';
				addresspin='';
				}
				else{
					//console.log("addressline1 is not null");
				addressline1=results[0].addressline1;	
				addressline2=results[0].addressline2;
				addresscity=results[0].addresscity;
				addressstate=results[0].addressstate;
				addresspin=results[0].addresspin;
				}	
				
				if(results[0].ccard_info==''){
					//console.log("payment is null");
				mypayment='';
				}
				else {
					//console.log("payment is not null");
				mypayment=results[0].ccard_info;	
				}
				
				
				
				json_responses = {"statusCode": 300, "mypayment": mypayment, "addressline1": addressline1, "addressline1": addressline1, "addressline2": addressline2, "addresscity": addresscity, "addressstate": addressstate, "addresspin": addresspin};
				res.json_responses=json_responses;
				callback(null, res);
				console.log("pushed 300 and address payment to client");	

            } else {
                
			console.log("in loadaddresspayment function; cart empty")
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

exports.handle_addaddresstodb = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

				mongo.connect(mongoURL, function(){
					var coll = mongo.collection('userdetails');
					coll.update({"email": msg.email},{$set:{"addressline1":msg.addressline1, "addressline2":msg.addressline2, "addresscity":msg.addresscity, "addressstate":msg.addressstate, "addresspin":msg.addresspin}},function(err, results){
						//not doing anything here
					});
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User updated his shipping address information : ' +msg.email+ '\n', function(err){});												
							console.log("address info was added/updated properly;")
							var json_responses;
							json_responses = {"statusCode": 200};
				res.json_responses=json_responses;
				callback(null, res);	
							console.log("pushed 200 to client");
					
				});			
	
}

exports.handle_validate = function(msg, callback){
	
			var res = {};
			//console.log("msg.email is:"+ msg.email);

				mongo.connect(mongoURL, function(){
					var coll = mongo.collection('userdetails');
					coll.update({"email": msg.email},{$set:{"ccard_info":msg.ccard_info}},function(err, results){
						//not doing anything here
					});
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User updated his payment information (credit card details) : ' +msg.email+ '\n', function(err){});												
											
							console.log("card info was added/updated properly;")
							//var json_responses;
					
				});			
	
}

exports.handle_finalcheckout = function(msg, callback){
	
			var res = {};
			var i;
			var temp_cart;

			mongo.connect(mongoURL, function(){
			//console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('shoppingcart');		
			
			coll.find({buyer_uname: msg.buyer_uname}).toArray(function(err, results)	{
			if (results) {
				temp_cart=results;
                console.log("temp_cart is:" + temp_cart);
				console.log("in finalcheckout function; cart not empty");
				for(i=0;i<results.length;i++)
					{
					//console.log("here1");
					var var1=results[i].product_id;
					var var2=results[i].product_name;
					var var3=results[i].product_qty;
					var var4=results[i].product_price;
					var var5=results[i].buyer_uname;
					var var6=results[i].seller_email;

						
						
						mongo.connect(mongoURL, function(){
						//console.log('In Register: Connected to mongo at: ' + mongoURL);
						var coll = mongo.collection('bill_table');
//console.log("PRODUCTID(results[i].product_id) IS: " + results[i].product_id);
						coll.insert({"product_id": var1, "product_name": var2, "product_qty": var3, "product_price": var4, "buyer_name": var5, "seller_name": var6, "totalamt": msg.totalamount, "totalitems": msg.noofitems, "buyer_address":msg.buyer_address, "bill_payment":msg.bill_payment}, function(err, user){
							
						//not doing anything
						});
						console.log(" addition iteration no:" + i);
						});		
							
					}
					console.log("ADDED CART INFO TO BILL TABLE");
					
					

					for(i=0;i<temp_cart.length;i++)
					{
					var temp1=temp_cart[i].product_id;
					var temp3=temp_cart[i].buyer_uname;
						
						
						mongo.connect(mongoURL, function(){
						//console.log('In Register: Connected to mongo at: ' + mongoURL);
						var coll = mongo.collection('shoppingcart');

						coll.remove({"product_id": temp1, "buyer_uname": temp3}, function(err, user){
							
						//not doing anything
						});
						console.log(" deletion iteration no:" + i);
						});							
						
							
					}
					console.log("DELETED CART INFO FROM  CART TABLE");
					

					for(i=0;i<temp_cart.length;i++)
					{
					(temp_cart[i].product_totalqty)=(temp_cart[i].product_totalqty) - (temp_cart[i].product_qty);
					
					var prince1=temp_cart[i].product_name;
					//var prince3=temp_cart[i].seller_email;
					var prince2=temp_cart[i].product_totalqty;
					console.log("sub value is: " + prince2);


						mongo.connect(mongoURL, function(){
						//console.log('In Register: Connected to mongo at: ' + mongoURL);
						var coll = mongo.collection('product_table');

						coll.update({"product_name": prince1},{$set:{"product_qty":prince2}},function(err, results){
							
						//not doing anything
						});
						console.log(" updation product table iteration no:" + i);
						});							
						
							
					}
					console.log("UPDATED PRODCT TABLE QUANTITY");
					
					
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User made a new purchase, checkout successful and bill have been generated : ' +msg.buyer_uname+ '\n', function(err){});												


					json_responses = {"statusCode": 200};
				res.json_responses=json_responses;
				callback(null, res);
					console.log("pushed 200 success to client");	


					
				
            } else {
                
			console.log("in finalcheckoutpage function; cart empty")
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": 300};
				res.json_responses=json_responses;
				callback(null, res);
			console.log("pushed 300 error to client");	
            }
	
			});	
	
			});			
	
}

