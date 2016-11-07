/**
 * New node file
 */
var request = require('request')
, express = require('express')
,assert = require("assert")
,http = require("http");

describe('http tests', function(){

	
	
	it('Load sigin page', function(done){
		http.get('http://localhost:3000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		});
	});
	
	it('Validate Login Operation', function(done) {
		request.post(
			    'http://localhost:3000/checklogin',
			    { form: { username: "princeofalltimes@gmail.com", password: "prince" } },
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });

	it('Load Profile', function(done) {
		request.get(
			    'http://localhost:3000/profile',
			  
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });

	
	it('Load Shopping Cart', function(done) {
		request.get(
			    'http://localhost:3000/cartpage',
			   
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });
	
	it('Checkout', function(done) {
		request.get(
			    'http://localhost:3000/checkout',
			   
			    function (error, response, body) {
			    	assert.equal(200, response.statusCode);
			    	done();
			    }
			);
	  });

});