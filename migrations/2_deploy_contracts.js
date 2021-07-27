const OpenRiver = artifacts.require("./OpenRiver.sol");
module.exports = function(deployer) {
  deployer.deploy(OpenRiver);
};