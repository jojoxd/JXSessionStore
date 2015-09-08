module.exports = function(sess){
	var Store = sess.Store;

	function JXSessionStore(options){
		var self = this;

		options = options || {};

		Store.call(self, options);

		self.options = options;
	}

	JXSessionStore.prototype.__proto__ = Store.prototype;

	JXSessionStore.prototype.get = function(sessionId, callback){
		console.log("get on thread %s", process.threadId);
		// should get the value from sessionId
		var session = JSON.parse(jxcore.store.shared.read(sessionId));
		//console.log("get %s: %s", sessionId, JSON.stringify(session));
		var err = null;
		callback(err, session);
	}

	JXSessionStore.prototype.set = function(sessionId, session, callback){
		console.log("set on thread %s", process.threadId);
		// should set key sessionId with value session
		//console.log("set %s: %s", sessionId, JSON.stringify(session));
		jxcore.store.shared.set(sessionId, JSON.stringify(session));
		var err = null;
		callback(err, session);
	}

	JXSessionStore.prototype.touch = function(sessionId, session, callback){
		jxcore.store.shared.set(sessionId, session);
		var err = null;
		callback(err);
	}

	JXSessionStore.prototype.destroy = function(sessionId, callback){
		jxcore.store.shared.remove(sessionId);
		callback(err);
	}

	JXSessionStore.prototype.length = function(callback){
		len = -1;
		callback(err, len);
	}

	JXSessionStore.prototype.clear = function(callback){
		var err = new Error("Not Implemented in JXCore ATM");
		// remove all sessions
		callback(err);
	}

	JXSessionStore.prototype.all = function(callback){
		// get all sessions
		var err = new Error("Not Implemented in JXCore ATM");
		callback(err, sessionsArray);
	}

	return JXSessionStore;
}
