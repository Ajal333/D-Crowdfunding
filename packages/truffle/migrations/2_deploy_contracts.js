const Campaigns = artifacts.require("Campaigns");
// const CrowdFunding = artifacts.require("CrowdFunding");

module.exports = async function (deployer) {
  await deployer.deploy(Campaigns);
  // await deployer.deploy(CrowdFunding);
};
