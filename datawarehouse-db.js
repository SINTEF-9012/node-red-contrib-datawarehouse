module.exports = function(RED) {

  function DataWarehouseDB(config) {
    var node = this;

    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.data = {};
    this.listeners = [];

    var udpateTimer = -1;

    var sendUpdates = function() {
      udpateTimer = -1;

      var msg = {
        payload: node.data
      };

      for (var i = 0, l = node.listeners.length; i < l; ++i) {
        node.listeners[i].send(msg);
      }
    }

    this.save = function(key, value) {
      if (this.data[key] !== value) {
        this.data[key] = value;

        if (udpateTimer === -1) {
          udpateTimer = setImmediate(sendUpdates);
        }
      }
    };

    this.register = function(listener) {
      if (node.listeners.indexOf(listener) === -1) {
        node.listeners.push(listener);
      }
    };

    // Reset on close
    this.on('close', function() {
      this.data = {};

      if (udpateTimer !== -1) {
        clearImmediate(udpateTimer);
        udpateTimer = -1;
      }
    });
  }

  RED.nodes.registerType("datawarehouse-db", DataWarehouseDB);
}