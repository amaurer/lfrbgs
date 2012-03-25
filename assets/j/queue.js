(function($){

	var lfgList = $("#lfg");
	var lfmList = $("#lfm");
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
			addToList(data.type, data, true);
		});
		socket.on("killConnection", function (data) {
			console.log("KILL CONNECTION = " + data);
			console.log(data);
			$("#" + data).remove();
		});

	function addToList(type, data, checkDups){
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

})(jQuery);