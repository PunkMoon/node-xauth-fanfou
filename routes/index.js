var express = require('express');
var router = express.Router();
var OAuth = require('mashape-oauth').OAuth;
var consumerKey    = 'yourconsumerKey';
var consumerSecret = 'yourconsumerSecret';
var oa = new OAuth({ 
  accessUrl:"http://fanfou.com/oauth/access_token",
  consumerKey:consumerKey,
  consumerSecret:consumerSecret,
  version:'1.0',
  signatureMethod:'HMAC-SHA1'
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'node-xauth-fanfou' });
});

router.route('/get').get(function(req,res){
	res.render('get',{title:'GET'});
});
router.route('/token').get(function(req, res){
  res.render('token', { title: 'token' });
}).post(function(req,res,next)
{
	var username = req.body.username;  
	var password= req.body.password;
	oa.getXAuthAccessToken(username, password, function (error, oauth_token, oauth_token_secret, results) {
	  if (error){
	  	res.json({
	  		'status':0,
	  		'reason':error
	  	});
	  }
	  else
	  {
	  	res.json({
	  		'status':1,
	  		'token':oauth_token,
	  		'secret':oauth_token_secret
	  	});
	  }
});
});
router.route('/post').get(function(req,res,next){
	res.render('post',{title:'POST'});
}).post(function(req,res,next){
	var path=req.body.path;
	var param=JSON.parse(req.body.param);
	var oauth_token=req.body.token;
	var oauth_token_secret=req.body.secret;
	var options={
	  url:'http://api.fanfou.com/'+path,
	  oauth_token:oauth_token,
	  oauth_token_secret:oauth_token_secret,
	  parameters:param
	};
	oa.post(options,function(error,data){
	    if(error)
	    {
	      res.json({
	        'status':0,
	        'reason':error
	      }); 
	    }
	    else{
	      res.json({
	      	'status':1,
	        "result":data
	      }); 
	    }
	}); 
});
router.route('/get').get(function(req,res,next){
	res.render('get',{title:'get'});
}).post(function(req,res,next){
	var path=req.body.path;
	var param=JSON.parse(req.body.param);
	var oauth_token=req.body.token;
	var oauth_token_secret=req.body.secret;
	var options={
	  url:'http://api.fanfou.com/'+path,
	  oauth_token:oauth_token,
	  oauth_token_secret:oauth_token_secret,
	  parameters:param
	};
	oa.get(options,function(error,data){
	    if(error)
	    {
	      res.json({
	        'status':0,
	        'reason':error
	      }); 
	    }
	    else{
	      res.json({
	      	'status':1,
	      	"result":data
	      }); 
	    }
	}); 
});
module.exports = router;
