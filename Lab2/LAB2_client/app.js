var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var index = require('./routes/index');
var login = require('./routes/login')
var homepage = require('./routes/homepage')
var profile = require('./routes/profile')
var cartpage = require('./routes/cartpage')
var checkout = require('./routes/checkout')
var path = require('path')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongo = require('./routes/mongo');
var fs = require("file-system");
require('./routes/passport')(passport);


var mongoURL = "mongodb://localhost:27017/ebay";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var app = express();

// view engine setup
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.logger('dev'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
  secret: "CMPE273_passport",
  resave: false,
  saveUninitialized: false,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 6 * 1000,
  store: new mongoStore({
    url: mongoURL
  })
}));
app.use(app.router);
app.use(passport.initialize());


//GET
app.get('/', routes.index);
app.get('/homepage',homepage.redirectToHomepage);
app.get('/profile',profile.redirectToProfile);
app.get('/cartpage',cartpage.redirectToCartpage);
app.get('/checkout',checkout.redirectToCheckout);
app.get('/successcheckout',checkout.successcheckout);
app.get('/failcheckout',checkout.failcheckout);
app.get('/logout',homepage.logout);  

//POST
app.post('/checklogin',function(req, res, next) {   //AMQPified
	//console.log("CRAP IS " + req.body.username);
  passport.authenticate('checklogin', function(err, user, info) {
    if(err) {
      return next(err);
    }

    if(!user) {
    	console.log("session not initilized");
		console.log("Invalid Login");
				var json_responses = {"statusCode" : 401};
				res.send(json_responses);	
   
    }

    req.logIn(user, {session:false}, function(err) {
      if(err) {
        return next(err);
      }

    req.session.email = user.email;
	req.session.username = user.uname;
	req.session.fname = user.fname;
	req.session.handle = user.seller_handle;
	
	req.session.address=user.addressline1;
	req.session.payment=user.ccard_info;
	req.session.lastlogin=user.lastlogin;
	  
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User signed in succesfully : ' +req.session.email+ '\n', function(err){});	
				
	var json_responses = {"statusCode" : 200};
	res.send(json_responses);
    });
  })(req, res, next);
});


app.post('/registeruser',login.registeruser); //AMQPified
app.post('/gettheads',homepage.gettheads); //AMQPified
app.post('/getprofile',profile.getprofile); //AMQPified
app.post('/getmyads',profile.getmyads); //AMQPified
app.post('/createanad',profile.createanad); //AMQPified
app.post('/addtocart',homepage.addtocart); //AMQPified
app.post('/getthecart',cartpage.getthecart); //AMQPified
app.post('/removetheitem',cartpage.removetheitem); //AMQPified
app.post('/loadcheckoutpage',checkout.loadcheckoutpage); //AMQPified
app.post('/loadaddresspayment',checkout.loadaddresspayment); //AMQPified
app.post('/addaddresstodb',checkout.addaddresstodb); //AMQPified
app.post('/validatecard',checkout.validate); //AMQPified
app.post('/finalcheckout',checkout.finalcheckout); //AMQPified
app.post('/getsolditems',profile.getsolditems); //AMQPified
app.post('/getpurchaseditems',profile.getpurchaseditems); //AMQPified
app.post('/placebid',homepage.placebid); //AMQPified
app.post('/getbiditems',profile.getbiditems); //AMQPified


//connect to the mongo collection session and then createServer
mongo.connect(mongoURL, function(){
	//console.log('Connected to mongo at: ' +mongoURL);
	http.createServer(app).listen(app.get('port'), function(){
	var login_timestamp=new Date();
	console.log('Express server listening on port ' + app.get('port'));
	fs.appendFile('public/logs/ebayLogs.txt', '\n' + login_timestamp + ' : ' + 'eBay server started running; listening on port ' + app.get('port') + '\n', function(err){});
	});  
});
