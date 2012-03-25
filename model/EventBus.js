
var crypto = require("crypto");
var User = require("./User.js").User;

var Bus = function(){
	this.queue = {
		connections : {
			lfm : {},
			lfg : {}
		}
	}
};

Bus.prototype.addConnection = function(connType, name, realm, address){
	if(this.queue.connections[connType] == null){
		return false;
	};
	var qid = this.createQueueID(name, realm);
	return this.queue.connections[connType][qid] = new User(name, realm, address, qid, connType);
};

Bus.prototype.getConnection = function(name, realm) {
	var conn = this.queue.connections;
	var cryptKey = name;
	/* Verify name is not a hash lookup */
	if(name.length !== 32 && realm != null){
		/* TODO : Question... is it faster to create
			Crypto every time or lookup from objects ???? */
			// ! Cryto for now since its easy !
		cryptKey = this.createQueueID(name, realm);
	};
	/* Crypt should be set at this point */
	if(conn.lfg[cryptKey] != null){
		return conn.lfg[cryptKey];
	} else if(conn.lfm[cryptKey] != null){
		return conn.lfm[cryptKey];
	};
	return false;
};

Bus.prototype.delConnection = function(socketID){
	var n, nn, conn = this.queue.connections;
	var qid = "";
	for(n in conn){
		x = conn[n];
		for(nn in x){
			if(x[nn].socketID === socketID){
				qid = x[nn].qid;
				delete x[nn];
			};
		};
	};
	return qid;
};

Bus.prototype.isAuthorized = function(type, qid, address) {
	var conn = this.queue.connections;
	return (conn[type] != null &&
			conn[type][qid] != null &&
			conn[type][qid].address === address);
};

Bus.prototype.createQueueID = function(name, realm) {
	var md5hash = crypto.createHash("md5");
		md5hash.update("" + realm + name);
	return md5hash.digest("hex");
};

Bus.prototype.getPublicConnectionData = function() {
	var groupObject = {}, n, nn;
	var showID = false;
	for(n in this.queue.connections){
		groupObject[n] = [];
		for(nn in this.queue.connections[n]){
			groupObject[n].push(
				this.queue.connections[n][nn].getPublicData()
			);
		};
	};
	return groupObject;
};

exports.eventBus = Bus;


