
var port = process.env.PORT || 8080;
var customSettings = require("./customSettings.js").settings,
	enc = customSettings.encryptionPassword,
	express = require("express"),
	app = express.createServer(),
	nodemailer = require("nodemailer"),
	gmailTransport = nodemailer.createTransport("SMTP",{
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

	require("./controllers/queue.js").init(app);

	app.listen(port);
