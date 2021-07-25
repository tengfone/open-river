const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const OpenRiver = artifacts.require("./OpenRiver.sol");
module.exports = function(deployer) {
  deployer.deploy(OpenRiver);
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
