
var sio = require("socket.io");
var io;
var	EventBus = require("../model/EventBus.js").eventBus,
	Bus = new EventBus();

	
exports.init = function(app){
	/* Listen on top of Express then configure */
	io = sio.listen(app);
	io.configure(function(){
		io.set("heartbeat timeout", 50);
		io.set("heartbeat interval", 60);
		io.set("authorization", function(data, callback) {

			console.log("----- authorize ----");

			if(data.query == null || data.query.id == null){
				callback("Not Authorized", false);
				return false;
			};

			var qid = data.query.id;
			var conn = Bus.getConnection(qid);
			if(conn !== false && Bus.isAuthorized(conn.type, qid, data.address.address)){
				// data.sessionID = qid; session support
				callback(null, true);
			} else {
				callback("Not Authorized", false);
			};
			
			return true;
			
		});
	});

	/************ Socket Events ***********************/
	/* Events
		- LFG connected
		- LFM connected
		- LFM ping LFG user
		- LFG pong LFM (approved)
	*/

	io.sockets.on("connection", function (socket) {
		console.log("----- Connection ----");
		var user = Bus.getConnection(socket.handshake.query.id);
		if(user !== false){
			user.addSocketID(socket.id);
		} else {
			socket.emit("You Fail!");
			return false;
		};
		
		/* Return data for building display */
		socket.emit("initializedData", Bus.getPublicData());

		/* Hook for private messages */
		socket.on("wsp", function (data) {
			console.log(data);
			io.sockets.socket(data.socketId).emit("dood");
		});

		/* Hook for asking for approval to talk */
		socket.on("ping", function (data) {
			console.log(data);
			io.sockets.socket(data.socketId).emit("dood");
		});

		/* Hook for approval to talk */
		socket.on("pong", function (data) {
			console.log(data);
			io.sockets.socket(data.socketId).emit("dood");
		});
	});



	/************ Page Events ***********************/
	app.get("/lfg/:realm/:name", function(req, res){
		/* Is the user already connected and is it authorized */
		var name = req.params.name, realm = req.params.realm;
		var conn = Bus.getConnection(name, realm);
		if(conn === false){
			/* Create connection */
			conn = Bus.addConnection("lfg", name, realm, req.connection.remoteAddress);
		} else {
			if(!Bus.isAuthorized("lfg", conn.qid, req.connection.remoteAddress)){
				/* Fail the request */
			};
		};

		res.render("queue", {
			layout : "layouts/single-col-center",
			title : "Welcome to Looking for Rated Battleground - Picking up where Blizzard left off!",
			hashO : conn.qid
		});
	});
	app.get("/lfm/:realm/:name", function(req, res){
		/* Is the user already connected and is it authorized */
		var name = req.params.name, realm = req.params.realm;
		var conn = Bus.getConnection(name, realm);
		if(conn === false){
			/* Create connection */
			conn = Bus.addConnection("lfm", name, realm, req.connection.remoteAddress);
		} else {
			if(!Bus.isAuthorized("lfm", conn.qid, req.connection.remoteAddress)){
				/* Fail the request */
			};
		};

		res.render("queue", {
			layout : "layouts/single-col-center",
			title : "Welcome to Looking for Rated Battleground - Picking up where Blizzard left off!",
			hashO : conn.qid
		});
	});


};