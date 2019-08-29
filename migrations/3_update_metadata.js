var Metadata = artifacts.require("./Metadata.sol");
var RimbleToken = artifacts.require("./RimbleToken.sol");
var DevConAttendance = artifacts.require("./DevConAttendance.sol");
var DevConFood = artifacts.require("./DevConFood.sol");
var DevConParties = artifacts.require("./DevConParties.sol");

let _ = "        ";

module.exports = (deployer, helper, accounts) => {
  deployer.then(async () => {
    try {
      // Deploy Metadata.sol
      await deployer.deploy(Metadata, { replace: true });
      let metadata = await Metadata.deployed();
      console.log(_ + "Metadata deployed at: " + metadata.address);

      // Deploy RimbleToken.sol
      let rimbleToken = await RimbleToken.deployed();
      console.log(_ + "RimbleToken deployed at: " + rimbleToken.address);

      // Deploy DevConAttendance.sol
      let devConAttendance = await DevConAttendance.deployed();
      console.log(
        _ + "DevConAttendance deployed at: " + devConAttendance.address
      );

      // Deploy DevConFood.sol
      let devConFood = await DevConFood.deployed();
      console.log(_ + "DevConFood deployed at: " + devConFood.address);

      // Update the rimbleToken with the new metadata address
      await rimbleToken.updateMetadata(metadata.address);
      console.log(_ + "RimbleToken metadata updated to " + metadata.address);

      // Update the devConAttendance with the new metadata address
      await devConAttendance.updateMetadata(metadata.address);
      console.log(
        _ + "DevConAttendance metadata updated to " + metadata.address
      );

      // Update the devConFood with the new metadata address
      await devConFood.updateMetadata(metadata.address);
      console.log(_ + "DevConFood metadata updated to " + metadata.address);

      // Update the devConParties with the new metadata address
      await devConParties.updateMetadata(metadata.address);
      console.log(_ + "DevConParties metadata updated to " + metadata.address);
    } catch (error) {
      console.log(error);
    }
  });
};
