// required modules: express & express-session

var HTTPSERVER = {};

HTTPSERVER.define = function(){
	process.keepAlive();
	
	var express = require('express'),
		session = require('express-session'),
		JXSessionStore = require('./jxsessionstore.js')(session);
}

HTTPSERVER.logic = function(serverID){
	var app = express(),
		server = require('http').createServer(app);
	
	app.use(new session({
		store: new JXSessionStore(),
		cookie: {
			secure: false
		},
		resave: true,
		saveUninitialized: false,
		secret: Math.random().toString(33).substring(2),
	}));
	
	app.get('/', function(req, res){
		console.log("get on thread %s", process.threadId);
		res.jsonp( req.session.test ? {data: req.session.test, thread: process.threadId} : {err: "no session found"});
	});
	
	app.get('/set', function(req, res){
		console.log("set on thread %s", process.threadId);
		req.session.test = "haii";
		
		res.end("done");
	});
	
	server.listen(80, function(){
		console.log("server %s (thread %s) listening on port 80", serverID, process.threadId);
	});
}

jxcore.tasks.addTask(HTTPSERVER, 0);
jxcore.tasks.addTask(HTTPSERVER, 1);