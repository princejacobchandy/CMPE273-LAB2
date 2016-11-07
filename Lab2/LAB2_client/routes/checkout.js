
/*
 * GET home page.
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var mq_client = require('../rpc/client');


exports.redirectToCheckout = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		//res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
							
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "shoppingcartpage" : ' +req.session.username+ '\n', function(err){});					
				
		res.render("checkout",{firstname:req.session.fname});
				
	}
	else
	{
		console.log("redirectToCheckout din't work");
		res.redirect('/');
	}
};





//buyer_uname is email id and dont change it
exports.loadcheckoutpage = function(req,res)
{
		
	 var msg_payload = {
			"buyer_uname": req.session.email
		};
		mq_client.make_request('loadcheckoutpage_queue', msg_payload,
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

exports.loadaddresspayment= function(req,res)
{
				
	 var msg_payload = {
			"email": req.session.email
		};
		mq_client.make_request('loadaddresspayment_queue', msg_payload,
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



exports.addaddresstodb = function(req,res)
{
			var address1 = req.param("address1");
			var address2 = req.param("address2");
			var address3 = req.param("address3");
			var address4 = req.param("address4");
			var address5 = req.param("address5");
			req.session.address=address1 + ', ' +  address2 + ', ' +  address3 + ', ' +  address4 + ', ' +  address5;
			

	 var msg_payload = {
			"email": req.session.email, "addressline1":address1, "addressline2":address2, "addresscity":address3, "addressstate":address4, "addresspin":address5
		};
		mq_client.make_request('addaddresstodb_queue', msg_payload,
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




exports.validate = function(req, res) {

    var cardno = req.param("cardno");
	cardno=cardno.toString();
	var cardno_string=cardno;
    var cvvno = req.param("cvvno");
	cvvno=cvvno.toString();
	var edate = req.param("edate");
	var exMonth = "";
    var exYear = "";
	var exDay = "";
	var cardnumber = "";
	
	console.log("cardno_string is: " + cardno_string);
	
	for(var i=0;i<=3;i++)
	{
	exYear+=edate[i];	
	}
	
	for(var i=5;i<=6;i++)
	{
	exMonth+=edate[i];		
	}
	
	for(var i=8;i<=9;i++)
	{
	exDay+=edate[i];		
	}
	
	for(var i=12;i<=15;i++)
	{
	cardnumber+=cardno_string[i];		
	}

	
	console.log(cardno + ', ' + cvvno + ', ' + edate + ', ' + exMonth + ', ' + exYear);
    
    var cardno1 = /^(?:[0-9]{16})$/;
    var cardno2 = /^(?:[0-9]{3})$/;
    var today;
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var results, result_code;
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
	
	console.log(dd + ', ' + mm + ', ' + yyyy);
	

	
    if (cardno.match(/^(?:[0-9]{16})$/)) {
        if (cvvno.match(/^(?:[0-9]{3})$/)) {
            if ((exMonth > 0 && exMonth < 13 && (exYear.match(/^(?:[0-9]{4})$/)) )) {
                if ((mm <= exMonth) && (yyyy <= exYear) && (dd <= exDay)) {
                    results = "Valid Credit Card";
					result_code=200;
					req.session.payment='************'+cardnumber;
					
					
					/*var getUser ="UPDATE `ebay`.`userdetails` SET `ccard_info`='************"+cardnumber+"' WHERE email = '"+req.session.email+"'";
						//var getUser = "INSERT INTO `ebay`.`userdetails` (`uname`, ) VALUES ('"+uname+"');"
						console.log("Query is:" + getUser);
						mysql.fetchData(function(err, results) {
						if (err) {
							throw err;
								} 
						else {
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User updated his payment information (credit card details) : ' +req.session.username+ '\n', function(err){});												
											
							console.log("card info was added/updated properly;")
							//var json_responses;
							}
						}, getUser); */
						
						
				/* mongo.connect(mongoURL, function(){
					var coll = mongo.collection('userdetails');
					coll.update({"email": req.session.email},{$set:{"ccard_info":'************'+cardnumber}},function(err, results){
						//not doing anything here
					});
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User updated his payment information (credit card details) : ' +req.session.username+ '\n', function(err){});												
											
							console.log("card info was added/updated properly;")
							//var json_responses;
					
				});	*/


	 var msg_payload = {
			"email": req.session.email, "ccard_info":'************'+cardnumber
		};
		mq_client.make_request('validate_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
	
					console.log("card info was added/updated properly (client side)")
	
					}
				});	
						

					
                } else {
                    results = "Invalid Credit Card: Card Expired";
					result_code=201;
                }
            } else {
                results = "Invalid Credit Card: Invalid Date";
				result_code=201;
            }
        } else {
            results = "Invalid Credit Card: Invalid CVV";
			result_code=201;
        }

    } else {
        results = "Invalid Credit Card: Invalid Card Number";
		result_code=201;
    }

			console.log("credit card checked; results is: " + results);
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": result_code, "results" : results};
			res.send(json_responses);	
			console.log("pushed result to client which is " + result_code);
};






exports.finalcheckout = function(req,res)
{
			var noofitems = req.param("noofitems");
			var totalamount = req.param("totalamount"); 
			var i;
			var temp_cart;
 
	 var msg_payload = {
			"buyer_uname": req.session.email, "noofitems": noofitems, "totalamount": totalamount, "buyer_address":req.session.address, "bill_payment":req.session.payment
		};
		mq_client.make_request('finalcheckout_queue', msg_payload,
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


exports.successcheckout = function(req, res){
	
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "successcheckoutpage" : ' +req.session.username+ '\n', function(err){});							
	
  res.render('successcheckout');
};

exports.failcheckout = function(req, res){
	
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "failcheckoutpage" : ' +req.session.username+ '\n', function(err){});							
	
  res.render('failcheckout');
};



