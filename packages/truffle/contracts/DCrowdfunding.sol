// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DCrowdfunding {
    struct Campaign {
        uint256 id;
        uint256 amount;
        uint256 minAmount;
        address userAddress;
        string image;
        string name;
        string description;
    }

    struct User {
        uint256 id;
        address userAddress;
        string name;
        string email;
        uint256 totalDonations;
        uint256 successfullCampaigns;
        uint256[] donatedCampaignId;
    }

    Campaign[] public campaigns;
    User[] public users;

    function usersCount() public view returns (uint256) {
        return users.length;
    }

    function campaignCount() public view returns (uint256) {
        return campaigns.length;
    }
}
