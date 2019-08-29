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

      // Deploy DevConAttendance.sol
      await deployer.deploy(
        DevConAttendance,
        "DevCon VI Attendance",
        "DC6A",
        metadata.address
      );
      let devConAttendance = await DevConAttendance.deployed();
      console.log(
        _ + "DevConAttendance deployed at: " + devConAttendance.address
      );

      // Deploy DevConFood.sol
      await deployer.deploy(
        DevConFood,
        "DevCon VI Food",
        "DC6F",
        metadata.address
      );
      let devConFood = await DevConFood.deployed();
      console.log(_ + "DevConFood deployed at: " + devConFood.address);

      // Deploy DevConParties.sol
      await deployer.deploy(
        DevConParties,
        "DevCon VI Parties",
        "DC6P",
        metadata.address
      );
      let devConParties = await DevConParties.deployed();
      console.log(_ + "DevConParties deployed at: " + devConParties.address);
    } catch (error) {
      console.log(error);
    }
  });
};
