
var port = process.env.PORT || 8080;
var customSettings = require("./customSettings.js").settings,
	enc = customSettings.encryptionPassword,
	express = require("express"),
	app = express.createServer(),
	nodemailer = require("nodemailer"),
	io = require('socket.io').listen(app);
	io.configure(function(){
		io.set('heartbeat timeout', 50);
		io.set('heartbeat interval', 60);
		io.set('authorization', function(data, callback) {
			console.log("----- authorize ----");
			console.log(queue.connections);
			function authorizeRequest(lfData, cb){
				/* Validate the current session matches the requested session */
				if(lfData.address !== data.address.address){
					cb(null, true);
				} else {
					cb("Not Authorized", false);
				};
			};
			if(data.query == null || data.query.id == null){
				callback("Not Authorized", false);
				return false;
			};
			var qid = data.query.id;
			/* Is in queue? */
			if(queue.connections.lfg[qid] != null){
				authorizeRequest(queue.connections.lfg[qid], callback);
			} else if(queue.connections.lfm[qid] != null){
				authorizeRequest(queue.connections.lfm[qid], callback);
			} else {
				callback("Not Authorized", false);
			};
		});
	});


var gmailTransport = nodemailer.createTransport("SMTP",{
	service : "Gmail",
	auth : {
		user : customSettings.mail.emailAccount,
		pass : customSettings.mail.emailPassword
	}
});

// Configure and Serve
	app.configure(function(){
		app.set("views", __dirname + "/views");
		app.set("view engine", "jade");
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(__dirname + "/assets", { maxAge: 604800000 })); // One week
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

// Views
	app.get("/", function(req, res){
		res.render("index", {
			layout : "layouts/single-col-center",
			title : "Welcome to Looking for Rated Battleground - Picking up where Blizzard left off!"
		});
	});
	app.get("/lfg/:realm/:name", function(req, res){

		var resultUniqueO = getQueueID(req.params.name, req.params.realm);
			/* Add to connections as LFG */
			queue.connections.lfg[resultUniqueO] = {
				name : req.params.name,
				realm : req.params.realm,
				remoteAddress : req.connection.remoteAddress
			};

		res.render("queue", {
			layout : "layouts/single-col-center",
			title : "Welcome to Looking for Rated Battleground - Picking up where Blizzard left off!",
			hashO : resultUniqueO
		});
	});
	app.get("/lfm/:realm/:name", function(req, res){

		var resultUniqueO = getQueueID(req.params.name, req.params.realm);

			/* Add to connections as LFG */
			queue.connections.lfm[resultUniqueO] = {
				name : req.params.name,
				realm : req.params.realm,
				remoteAddress : req.connection.remoteAddress
			};

		res.render("queue", {
			layout : "layouts/single-col-center",
			title : "Welcome to Looking for Rated Battleground - Picking up where Blizzard left off!",
			hashO : resultUniqueO
		});
	});

	app.listen(port);

var crypto = require('crypto');
	function getQueueID(name, realm){
		var md5hash = crypto.createHash('md5');
			md5hash.update("" + realm + name);
			return md5hash.digest('hex');
	}

	var queue = {
		connections : {
			lfg : {

			},
			lfm : {

			}
		}
	};

	/* Events
		- LFG connected
		- LFM connected
		- LFM poke LFG user
		- LFG approve poke
	*/

	io.sockets.on('connection', function (socket) {
		/* does the referer have the id param ?
			if not, close it 
			if does, emit queue 
		*/

		/* Validate */
		console.log("----- Connection ----");


	//console.dir(socket.handshake);
		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
			//console.dir(socket.handshake);
				//console.log(data);
		});
	});
