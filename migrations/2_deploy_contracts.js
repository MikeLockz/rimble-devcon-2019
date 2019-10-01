var Metadata = artifacts.require("./Metadata.sol");
var HackathonMetadata = artifacts.require("./HackathonMetadata.sol");
var RimbleToken = artifacts.require("./RimbleToken.sol");
var DevConAttendance = artifacts.require("./DevConAttendance.sol");
var DevConHackathon = artifacts.require("./DevConHackathon.sol");
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

      // Deploy HackathonMetadata.sol
      await deployer.deploy(HackathonMetadata);
      let hackathonMetadata = await HackathonMetadata.deployed();
      console.log(
        _ + "HackathonMetadata deployed at: " + hackathonMetadata.address
      );

      // Deploy DevConHackathon.sol
      await deployer.deploy(
        DevConHackathon,
        "DevCon VI Hackathon",
        "DC6F",
        hackathonMetadata.address
      );
      let devConHackathon = await DevConHackathon.deployed();
      console.log(
        _ + "DevConHackathon deployed at: " + devConHackathon.address
      );

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
