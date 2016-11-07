
/*
 * GET index page or home page.
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";

//Redirects to the homepage
exports.index = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	//if(0)	
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
							
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User visited "indexpage", redirected to "homepage" : ' +req.session.username+ '\n', function(err){});
				
		res.render("homepage",{firstname:req.session.fname,lastLogin: req.session.lastlogin});
			
		
	}
	else
	{
		//res.redirect('/');
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'Rendered login/register page to new user' + '\n', function(err){});		
		res.render('login');
	}
		
};
