var net = require('net');

var Network = function(address, port, cb){

    var that = this;

    this.device = new net.Socket();
    this.port = port;
    this.address = address;

    var timer = setTimeout(function() {
        cb('printer not found');
    }, 2000);

    this.device.on('error', function() {
        cb('printer not found');
    });

    this.device.connect(this.port, this.address, function() {
        clearTimeout(timer);
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

Network.prototype.close = function() {
    this.device.end();
}

module.exports = Network;