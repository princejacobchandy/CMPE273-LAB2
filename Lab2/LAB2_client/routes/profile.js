
/*
 * GET profile page.
 */

 
var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var mq_client = require('../rpc/client');


exports.redirectToProfile = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
							
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "profilepage" : ' +req.session.username+ '\n', function(err){});							
				
		res.render("profile",{firstname:req.session.fname});
			
		
	}
	else
	{
		console.log("redirectToProfile din't work");		
		res.redirect('/');
	}
};





exports.getprofile = function(req,res)
{
		console.log("reading user profile info from the database");	
			
	var msg_payload = {
			"email": req.session.email
		};
		mq_client.make_request('getprofile_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 200) {
				
				res.send(results.json_responses);
						

						} 
	
					}
				});			
	
};




exports.getmyads = function(req,res)
{
		var results_length;
		console.log("reading all the ads from the products_table in the database");
		

	var msg_payload = {
			"seller_email": req.session.email
		};
		mq_client.make_request('getmyads_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 200) {
				
						res.send(results.json_responses);
						

						} 
						else if (results.json_responses.statusCode == 201) {
				
						res.send(results.json_responses);
						

						} 
	
					}
				});				
		
};





exports.getsolditems = function(req,res)
{
		var results_length;
		console.log("reading all the solditems");
		
	var msg_payload = {
			"seller_name": req.session.email
		};
		mq_client.make_request('getsolditems_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 200) {
				
						res.send(results.json_responses);
						

						} 
						else if (results.json_responses.statusCode == 201) {
				
						res.send(results.json_responses);
						

						} 
	
					}
				});				

};



exports.getpurchaseditems = function(req,res)
{
		var results_length;
		console.log("reading all the purchaseditems");
		
	var msg_payload = {
			"buyer_name": req.session.email
		};
		mq_client.make_request('getpurchaseditems_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 200) {
						res.send(results.json_responses);
						} 
						else if (results.json_responses.statusCode == 201) {
						res.send(results.json_responses);
						} 
	
					}
				});				

};



exports.getbiditems = function(req,res)
{
		var results_length;
		console.log("reading all the biditems");
				
	var msg_payload = {
			"product_buyer": req.session.email
		};
		mq_client.make_request('getbiditems_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 200) {
				
						res.send(results.json_responses);
						

						} 
						else if (results.json_responses.statusCode == 201) {
				
						res.send(results.json_responses);
						

						} 
	
					}
				});				

};




exports.createanad = function(req,res)
{
	console.log("inside createand");
	var ptype,ptitle,pdesc,pqty,pprice,noofdays,suname,shandle,semail;

	shandle = req.session.handle;
	suname = req.session.username;
	semail = req.session.email;
	ptype = req.param("producttype");
	ptitle = req.param("productname");
	pdesc = req.param("productdesc");
	pqty = req.param("productqty");
	pprice = req.param("productprice");
	
	
	
	if(ptype==1){  //NORMAL PRODUCT
		console.log("NORMAL PRODUCT");
		var results_length;
		console.log("creating an ad and storing it to product_table in the database");
		
		

	var msg_payload = {
			"seller_handle": shandle, "seller_uname": suname, "product_name": ptitle, "product_description": pdesc, "product_qty": pqty, "product_price": pprice, "seller_email": semail, "product_type": ptype
		};
		mq_client.make_request('createnormalad_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 200) {
				
						res.send(results.json_responses);
						

						} 

	
					}
				});						
		
		
		
		
		
	}
	else if (ptype==2) {  //BIDDING PRODUCT
		console.log("BIDDING PRODUCT");
		noofdays = req.param("noofdays");
		var results_length;
		console.log("creating an ad and storing it to products_table in the database");
		
		function findenddate(theDate, days) {
        return new Date(theDate.getTime() + days*24*60*60*1000);
		}
		var enddate = findenddate(new Date(),noofdays);
		
	
	var startbid=new Date();
	var msg_payload = {
			"seller_handle": shandle, "seller_uname": suname, "product_name": ptitle, "product_description": pdesc, "product_qty": pqty, "product_price": pprice, "seller_email": semail, "product_type": ptype, "bid_start": startbid, "bid_end": enddate
		};
		mq_client.make_request('createbidad_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.json_responses.statusCode == 200) {
				
						res.send(results.json_responses);
						

						} 

	
					}
				});						
		
		
		
	}

};