
var User = function(name, realm, address, qid, type){
	this.name = name || null;
	this.realm = realm || null;
	this.address = address || null;
	this.qid = qid || null;
	this.type = type || null;
	this.socketID = null;
	this.approvedConnections = [];
};
User.prototype.addSocketID = function(sid){
	this.socketID = sid || null;
};
User.prototype.addApprovedConnections = function(qid){
	if(this.approvedConnections.indexOf(qid) === -1){
		this.approvedConnections.push(qid);
	};
};

exports.User = User;
