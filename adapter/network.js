var net = require('net');

var Network = function(address, port, cb){
	this.device = new net.Socket();
	this.port = port;
	this.address = address;
	
	this.device.connect(this.port, this.address, function() {
	    cb();
	});
	
};

Network.prototype.open = function(){
	//this.device.open.apply(this, arguments);
};
Network.prototype.write = function(){
	// set the scope to be the socket
  	this.device.write.apply(this.device, arguments);
};

module.exports = Network;