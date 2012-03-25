
var User = function(name, realm, address, qid, type, classType, spec, experience, current){
	this.name = name || null;
	this.realm = realm || null;
	this.classType = classType || null;
	this.spec = spec || null;
	this.experience = experience || null;
	this.current = current || null;
	this.address = address || null;
	this.qid = qid || null;
	this.type = type || null;
	this.socketID = null;
	this.approvedConnections = [];
};
User.prototype.addSocketID = function(sid){
	this.socketID = sid || null;
};
User.prototype.addApprovedConnection = function(qid){
	if(this.approvedConnections.indexOf(qid) === -1){
		this.approvedConnections.push(qid);
	};
};
User.prototype.getPublicData = function(){
	var user = {
		qid : this.qid,
		type : this.type,
		class : this.class,
		spec : this.spec,
		experience : this.experience,
		current : this.current
	};
	return user;
};


exports.User = User;
