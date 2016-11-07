/**
 * Routes file for Login
 */
 
var ejs = require("ejs");
var mysql = require('./mysql');
var encryption = require('./encryption');
var fs=require("file-system");
var winston = require('winston');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";

var mq_client = require('../rpc/client');


exports.registeruser = function(req,res)
{
	var fname, lname, uname, email, regpassword, bdate, ulocation, contact, uname_flag=0, email_flag=0, pwd_decrypted, pwd_encrypted;
	fname = req.param("fname");
	lname = req.param("lname");
	uname = req.param("uname");
	email = req.param("email");
	regpassword = req.param("regpassword");
	bdate = req.param("bdate");
	ulocation = req.param("location");
	contact = req.param("contact");
	
	console.log("typeof(bdate) is: " + typeof(bdate));
	console.log("bdate is: " + bdate);
	
	var login_time_stamp=new Date();
	
	if(lname=='undefined')
	{
	lname=0;	
	}
	if(bdate=='undefined')
	{
	bdate=0;	
	}
	if(ulocation=='undefined')
	{
	ulocation=0;	
	}
	if(contact=='undefined')
	{
	contact=0;	
	}
	
	
	pwd_encrypted = encryption.encrypt(regpassword);
	console.log("pwd_encrypted is: " + pwd_encrypted);

           
	var msg_payload = {
			"uname": uname, "pword": pwd_encrypted, "fname": fname, "lname": lname, "email": email, "bday": bdate, "location": ulocation, "contact": contact, "lastlogin":login_time_stamp
		};
		mq_client.make_request('register_queue', msg_payload,
				function(err, results) {

					//console.log("&&& " + results.code);
					if (err) {
						throw err;
					} else {
						if (results.code == 501) {

							//uname = results.user.ops[0].username;
							//fname = results.user.ops[0].firstname;
							//lname = results.user.ops[0].lastname;
							json_responses = {
								"statusCode" : 501
							};
							console.log("%%%%%%");
							res.send(json_responses);

						} 
						else if(results.code == 500){

							console.log("returned false");
							json_responses = {
								"statusCode" : 500
							};
							res.send(json_responses);

						}
					}
				});
};


