module.exports = function(RED) {
  function DataWarehouseListen(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.database = RED.nodes.getNode(config.database);

    if (this.database) {
      this.database.register(this);
    } else {
      node.error("The database is not defined correctly.");
    }
  }

  RED.nodes.registerType("datawarehouse-listen", DataWarehouseListen);
}