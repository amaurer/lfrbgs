var Bus = function(){
	this.queue = {
		connections : {
			lfm : {},
			lfg : {}
		}
	}
};

Bus.prototype.addConnection = function(queueType, usr){
	
};

Bus.prototype.authorizeRequest = function(requestData) {

};


exports.EventBus = Bus;