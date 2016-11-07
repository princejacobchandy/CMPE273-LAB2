var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var mq_client = require('../rpc/client');


//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
							
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "homepage" : ' +req.session.username+ '\n', function(err){});						
				
		res.render("homepage",{firstname:req.session.fname,lastLogin: req.session.lastlogin});
			
		
	}
	else
	{
		res.redirect('/');
	}
};




//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User signed out : ' +req.session.username+ '\n', function(err){});
	
	req.session.destroy();
	res.redirect('/');
	console.log("session destroyed");
	console.log("logging out");
	};
	
	
	
	
	
exports.gettheads = function(req,res)
{
		var results_length;
	
		console.log("reading all the ads from the products_table in the database");

	var msg_payload = {
			"seller_email": req.session.email, "product_qty": 0
		};
		mq_client.make_request('gettheads_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 200) {
				
				res.send(results.json_responses);
						

						} 
						else if(results.json_responses.statusCode == 201){

				res.send(results.json_responses);
						

						}
					}
				});


			

};	
	

		
// NOTE: In this function, buyer username is used as buyeremail id and shouldn't be changed
exports.addtocart = function(req,res)
{
	
	console.log("inside addtocart function");
	var prodid, prodqty, prodprice, prodname, proddesc, prodseller, prod_total_qty, itemsInCart=[];
	prodid = req.param("product_id");
	prodqty = req.param("product_qty");
	
	prodprice = req.param("product_price");
	prodname = req.param("product_pname");
	proddesc = req.param("product_pdesc");
	prodseller_email = req.param("product_seller_email");
	prodseller_uname = req.param("product_seller_uname");
	
	
	prod_total_qty=req.param("product_total_qty");
	console.log(prodid + ', ' + prodqty + ', ' + prodprice + ', ' + prodname + ', ' + proddesc + ', ' + prodseller_email + ', ' + prodseller_uname + ', ' + prod_total_qty);
	
	if(req.session.currentcart!=undefined)
	{
		itemsInCart = req.session.currentcart;
	}
	
	itemsInCart.push({"prodid" : prodid, 'prodqty' : prodqty, 'prodprice' : prodprice, 'prodname' : prodname, 'proddesc' : proddesc,  'prodseller_email' : prodseller_email, 'prodseller_uname' : prodseller_uname, });
	req.session.currentcart = itemsInCart;

	var msg_payload = {
			"buyer_uname": req.session.email, "product_id" : prodid, "product_qty": prodqty, "product_name": prodname, "product_desc": proddesc, "product_price": prodprice, "seller_uname": prodseller_uname, "seller_email": prodseller_email, "product_totalqty": prod_total_qty
		};
		mq_client.make_request('addtocart_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 301) {
				
				res.send(results.json_responses);
						

						} 
						else if(results.json_responses.statusCode == 302){

				res.send(results.json_responses);
						

						}
					}
				});	
			
};


exports.placebid = function(req,res)
{
				
	console.log("inside placebid function");
	var prodid, prodqty, prodprice, prodname, proddesc, prodseller, prodbuyer, bidprice;
	prodid = req.param("product_id");
	prodqty = req.param("product_qty");
	prodprice = req.param("product_price");
	prodname = req.param("product_pname");
	proddesc = req.param("product_pdesc");
	prodseller = req.param("product_seller_email");
	prodbuyer = req.session.email;	
	bidprice = req.param("product_bprice");
	bidendtime = req.param("bidendtime");
	

		var msg_payload = {
			"product_id": prodid, "product_name": prodname, "product_desc": proddesc, "product_qty": prodqty, "product_seller": prodseller, "product_buyer": prodbuyer, "bid_price": bidprice, "actual_price": prodprice, "bid_endtime": bidendtime
		};
		mq_client.make_request('placebid_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 200) {
				
				res.send(results.json_responses);
						

						} 
						else if(results.json_responses.statusCode == 201){

				res.send(results.json_responses);
						

						}
					}
				});				
	
	};
	

