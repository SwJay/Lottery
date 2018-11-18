//var Oracle = artifacts.require("./Oracle.sol");
var Lottery = artifacts.require("./Lottery.sol");

module.exports = function(deployer) {
  deployer.deploy(Lottery);
  // deployer.deploy(Oracle).then(function() {
  //   return deployer.deploy(Lottery, Oracle.address);
  // });
};
