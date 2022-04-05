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

    function getUserDetails(address _userAddress)
        public
        view
        returns (User memory)
    {
        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].userAddress == _userAddress) {
                return users[i];
            }
        }
    }

    function getCampaignDetail(uint256 _id)
        public
        view
        returns (Campaign memory)
    {
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (campaigns[i].id == _id) {
                return campaigns[i];
            }
        }
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function createUser(string memory _name, string memory _email) external {
        User memory user;
        user.id = users.length;
        user.name = _name;
        user.email = _email;
        user.totalDonations = 0;
        user.userAddress = msg.sender;
        user.successfullCampaigns = 0;
        users.push(user);
    }

    function createCampaign(
        uint256 _minAmount,
        string memory _image,
        string memory _name,
        string memory _description
    ) external {
        Campaign memory campaign;
        campaign.id = campaigns.length;
        campaign.amount = 0;
        campaign.description = _description;
        campaign.image = _image;
        campaign.minAmount = _minAmount;
        campaign.name = _name;
        campaign.userAddress = msg.sender;

        campaigns.push(campaign);
    }

    function getCampaignsByUserAddress(address _userAddress)
        public
        view
        returns (Campaign[] memory)
    {
        Campaign[] memory userCampaigns;
        uint256 j = 0;
        for (uint256 i = 0; i < campaigns.length; i++) {
            if (campaigns[i].userAddress == _userAddress) {
                userCampaigns[j] = campaigns[i];
                j++;
            }
        }
        return userCampaigns;
    }
}
