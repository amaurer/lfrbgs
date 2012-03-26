(function($, s, b){

	b.lfgList.click(function(e){
		var targ = e.target;
		if(targ.nodeName === "LI"){
			/* Ping the LFG folks */
			console.log(targ.id);
			s.emit("ping", targ.id);
		};
	});
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
		bus.connections[data].ponged = pongList.append('<li>' + data + '</li>');
	});
	s.on("ping", function (data) {
		/* Only LFG peeps should get these and have something happend */
		console.log("ping = " + data);
		console.log(data);
		bus.connections[data.qid].pinged = pingList.append(
			'<li data-qid="' + data.qid +
			'">' + data.realm + 
			'/' + data.name + ' = ' + 
			data.bnEmail + '</li>'
		);
	});

})(jQuery, socket, bus);