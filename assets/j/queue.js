var bus = {};
var socket = io.connect('http://localhost/?id=' + id);
	socket.on("initializedData", function (data) {
		console.log("INITIALIZE DATA = " + (data.lfg.length + data.lfm.length));
		console.log(data);
		var i, x, n, len;
		for(n in data){
			for(i=0, len = data[n].length; i<len; i++){
				addToList(n, data[n][i]);
			};
		};
	});
	socket.on("newConnection", function (data) {
		console.log("NEW CONNECTION = " + data.qid);
		console.log(data);
		bus.addToList(data.type, data, true);
	});
	socket.on("killConnection", function (data) {
		console.log("KILL CONNECTION = " + data);
		console.log(data);
		bus.killConnection(data);
	});

