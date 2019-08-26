var Metadata = artifacts.require('./Metadata.sol')
var RimbleToken = artifacts.require('./RimbleToken.sol')

let _ = '        '

module.exports = (deployer, helper, accounts) => {

  deployer.then(async () => {
    try {
      // Deploy Metadata.sol
      await deployer.deploy(Metadata, {replace: true})
      let metadata = await Metadata.deployed()
      console.log(_ + 'Metadata deployed at: ' + metadata.address)

     // Deploy RimbleToken.sol
     let rimbleToken = await RimbleToken.deployed()
     console.log(_ + 'RimbleToken deployed at: ' + rimbleToken.address)

     // Update the rimbleToken with the new metadata address
     await rimbleToken.updateMetadata(metadata.address)
     console.log(_ + 'RimbleToken metadata updated to ' + metadata.address)

    } catch (error) {
      console.log(error)
    }
  })
}
