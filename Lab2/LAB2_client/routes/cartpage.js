
/*
 * GET cart page.
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var mq_client = require('../rpc/client');


exports.redirectToCartpage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
							
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "shoppingcartpage" : ' +req.session.username+ '\n', function(err){});					
				
		res.render("cartpage",{firstname:req.session.fname});
				
	}
	else
	{
		console.log("redirectToCartpage din't work");
		res.redirect('/');
	}
};




//buyer_uname is email id and dont change it
exports.getthecart = function(req,res)
{
		
	 var msg_payload = {
			"buyer_uname": req.session.email
		};
		mq_client.make_request('getthecart_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 300) {
				
				res.send(results.json_responses);
						

						} 
						else if (results.json_responses.statusCode == 301) {
				
				res.send(results.json_responses);
						

						} 
	
					}
				});		
		
};



exports.removetheitem = function(req,res)
{
	
	var cartID = req.param("cart_id");
	var ptitle = req.param("ptitle");
	var buyname = req.param("buyername");

			
	var msg_payload = {
			"product_id": ptitle, "buyer_uname": buyname
		};
		mq_client.make_request('removetheitem_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 300) {
				
				res.send(results.json_responses);
						

						} 

	
					}
				});				
	
};


	
	
	
	
