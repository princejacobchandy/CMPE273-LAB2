
'use strict';
var crypto = require('crypto');

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";


exports.encrypt=function(text){
  var cipher = crypto.createCipher('aes-256-cbc','CMPE-273-LAB-1');
  var crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  //console.log("ENCRYPED");
  return crypted;
}

exports.decrypt=function(text){
  var decipher = crypto.createDecipher('aes-256-cbc','CMPE-273-LAB-1');
  var dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');
  //console.log("DECRYPTED");
  return dec;
}




