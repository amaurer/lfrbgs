(function($, s, b){

	var lfgList = $("#lfg").click(function(e){
		var targ = e.target;
		if(targ.nodeName === "LI"){
			/* Ping the LFG folks */
			console.log(targ.id);
			s.emit("ping", targ.id);
		};
	});
	var lfmList = $("#lfm");
	var pingList = $("#pinged").click(function(e){
		var targ = e.target;
		var pongQid = "";
		if(targ.nodeName === "LI"){
			/* Pong the LFM dood */
			pongQid = targ.getAttribute("data-qid");
			s.emit("pong", pongQid);
			pongList.append("<li>" + pongQid + "</li>");
			console.log(pongQid);
		};
	});
	var pongList = $("#ponged");

	s.on("pong", function (data) {
		/* Only LFM peeps should get these and 
			these are confirmation that they approve and should contact you */
		console.log("pong = " + data);
		pongList.append('<li>' + data + '</li>');
	});
	s.on("ping", function (data) {
		/* Only LFG peeps should get these and have something happend */
		console.log("ping = " + data);
		console.log(data);
		pingList.append('<li data-qid="' + data.qid +
			'">' + data.realm + 
			'/' + data.name + ' = ' + 
			data.bnEmail + '</li>'
		);
	});

	b.newConnection = function(type, data, checkDups){
		var appendList = lfgList;
		if(type === "lfm"){
			appendList = lfmList;
		};
		/* Only append if it isn't there */
		if(checkDups && appendList.find("#" + data.qid).length !== 0){
			return false;
		};
		appendList.append(
			'<li id="' + data.qid + '">' + data.qid + "</li>"
		);
	};

	b.killConnection = function(qid){
		$("#" + qid).remove();
	}

})(jQuery, socket, bus);