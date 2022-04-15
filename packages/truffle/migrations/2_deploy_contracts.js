const Campaigns = artifacts.require("Campaigns");
const Organisations = artifacts.require("Organisations");

module.exports = async function (deployer) {
  await deployer.deploy(Campaigns);
  await deployer.deploy(Organisations);
};
