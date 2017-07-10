module.exports = function(RED) {
  function DataWarehouseSave(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.database = RED.nodes.getNode(config.database);
    var node = this;
    
    this.on('input', function(msg) {
      if (!msg.topic) {
        node.warn("The message is ignored because msg.topic must be defined.");
        return;
      }

      if (!this.database) {
        node.error("The database is not defined correctly.");
        return;
      }

      this.database.save(msg.topic, msg.payload);
    });
  }

  RED.nodes.registerType("datawarehouse-save", DataWarehouseSave);
}