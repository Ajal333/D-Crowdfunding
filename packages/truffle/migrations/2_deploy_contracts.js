const DCrowdfunding = artifacts.require("DCrowdfunding");

module.exports = async function (deployer) {
  await deployer.deploy(DCrowdfunding);
};
