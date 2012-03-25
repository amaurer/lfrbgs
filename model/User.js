
var User = function(name, realm, address, qid, type, classType, spec, experience, current, bnEmail){
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
	this.bnEmail = "bnEmail" || null;
	this.approvedConnections = [];
	this.rejectedConnections = [];
	this.groupMakeup = [];
};
User.prototype.addSocketID = function(sid){
	this.socketID = sid || null;
};
User.prototype.addApprovedConnection = function(qid){
	if(this.approvedConnections.indexOf(qid) === -1){
		this.approvedConnections.push(qid);
	};
	var rejectedIndex = this.rejectedConnections.indexOf(qid);
	if(rejectedIndex !== -1){
		this.rejectedConnections.splice(rejectedIndex, 1);
	};
};
User.prototype.addRejectedConnection = function(qid){
	if(this.rejectedConnections.indexOf(qid) === -1){
		this.rejectedConnections.push(qid);
	};
	var approvedIndex = this.approvedConnections.indexOf(qid);
	if(approvedIndex !== -1){
		this.approvedConnections.splice(approvedIndex, 1);
	};
};
User.prototype.isRejected = function(qid){
	if(this.rejectedConnections.indexOf(qid) !== -1){
		return true;
	};
	return false;
};
User.prototype.isApproved = function(qid){
	if(this.approvedConnections.indexOf(qid) !== -1){
		return true;
	};
	return false;
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
