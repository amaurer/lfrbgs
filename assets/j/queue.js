var bus = {
	lfgList : jQuery("#lfg"),
	lfmList : jQuery("#lfm"),
	connections : {},
	newConnection : function(type, data, checkDups){
		var appendList = bus.lfgList;
		if(type === "lfm"){
			appendList = bus.lfmList;
		};
		/* Only append if it isn't there */
		if(checkDups && appendList.find("#" + data.qid).length !== 0){
			return false;
		};
		bus.connections[data.qid][type + "El"] = appendList.append(
			'<li id="' + data.qid + '">' + data.qid + "</li>"
		);
	},
	killConnection : function(qid){
		$("#" + qid).remove();
	}
};

var socket = io.connect('http://' + window.location.host + '/?id=' + id);
	socket.on("initializedData", function (data) {
		console.log("INITIALIZE DATA = " + (data.lfg.length + data.lfm.length));
		console.log(data);
		var i, x, n, len;
		for(n in data){
			for(i=0, len = data[n].length; i<len; i++){
				x = data[n][i];
				bus.connections[x.qid] = new Connection(x.qid, n);
				bus.newConnection(n, x);
			};
		};
	});
	socket.on("newConnection", function (data) {
		console.log("NEW CONNECTION = " + data.qid);
		console.log(data);
		bus.connections[data.qid] = new Connection(data.qid, data.type);
		bus.newConnection(data.type, data, true);
	});
	socket.on("killConnection", function (data) {
		console.log("KILL CONNECTION = " + data);
		console.log(data);
		delete bus.connections[data];
		bus.killConnection(data);
	});

function Connection(qid, type){
	this.qid = qid || null;
	this.type = type || null;
	this.lfmEl = null;
	this.lfgEl = null;
	this.pingedEl = null;
	this.pongedEl = null;
};