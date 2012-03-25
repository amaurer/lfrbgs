
var User = require("./User.js").User;


var LFMUser.prototype = new User();
	LFMUser.prototype.constructor = LFMUser;
	LFMUser = function(name, realm, address, qid, type, classType, spec, experience, current, bnEmail){
		this.experience = experience || null;
		this.bnEmail = bnEmail || null;
		this.groupComp = [];
	};
	LFMUser.prototype.getPublicData = function(){
		var user = {
			experience : this.experience,
			groupComp : this.groupComp
		};
		return user;
	};

exports.LFMUser = LFMUser;
