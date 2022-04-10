// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./CrowdFunding.sol";

contract Campaigns {
    address[] public deployedCampaigns;

    function createCampaign(
        uint256 _minimumContribution,
        uint256 _targetAmount,
        uint256 _deadline,
        string memory _campaignName,
        string memory _campaignDescription,
        string memory _campaginImage
    ) public returns (address) {
        address newCampaign = address(
            new CrowdFunding(
                _targetAmount,
                _deadline,
                _minimumContribution,
                msg.sender,
                _campaignName,
                _campaignDescription,
                _campaginImage
            )
        );
        deployedCampaigns.push(newCampaign);
        return newCampaign;
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
