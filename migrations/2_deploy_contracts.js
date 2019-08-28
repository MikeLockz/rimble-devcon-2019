var Metadata = artifacts.require("./Metadata.sol");
var RimbleToken = artifacts.require("./RimbleToken.sol");

let _ = "        ";

module.exports = (deployer, helper, accounts) => {
  deployer.then(async () => {
    try {
      // Deploy Metadata.sol
      await deployer.deploy(Metadata);
      let metadata = await Metadata.deployed();
      console.log(_ + "Metadata deployed at: " + metadata.address);

      // Deploy RimbleToken.sol
      await deployer.deploy(
        RimbleToken,
        "DevCon VI Ticket",
        "DC6A",
        metadata.address
      );
      let rimbleToken = await RimbleToken.deployed();
      console.log(_ + "RimbleToken deployed at: " + rimbleToken.address);
    } catch (error) {
      console.log(error);
    }
  });
};
