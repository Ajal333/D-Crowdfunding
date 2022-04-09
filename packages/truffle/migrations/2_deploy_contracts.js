const Campaigns = artifacts.require("Campaigns");

module.exports = async function (deployer) {
  await deployer.deploy(Campaigns);
};
