const usb   = require('usb');

/**
 * [function USB]
 * @param  {[type]} vid [description]
 * @param  {[type]} pid [description]
 * @return {[type]}     [description]
 */
function USB(vid, pid){
  this.device = usb.findByIds(vid, pid);
  return this;
};
/**
 * [open description]
 * @return {[type]} [description]
 */
USB.prototype.open = function () {
  var self = this;
  this.device.open();
  this.device.interfaces.forEach(function(interface){
    interface.claim();
    if(interface.isKernelDriverActive()){
      try{
        interface.detachKernelDriver();
      }catch(e){
        console.error("[ERROR] Could not detatch kernel driver: %s", e)
      }
    }
    interface.endpoints.filter(function(endpoint){
      if(endpoint.direction == 'out'){
        self.endpoint = endpoint;
      }
    });
  });
  return this;
};
/**
 * [function write]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
USB.prototype.write = function(data, callback){
  this.endpoint.transfer(data);
};

module.exports = USB;
