// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Organisations {
    struct Organisation {
        address organisationAddress;
        string name;
        string websiteUrl;
        string imageUrl;
    }

    Organisation[] public organisations;

    function addOrganisation(
        string memory _name,
        string memory _websiteUrl,
        string memory _imageUrl
    ) public {
        Organisation memory newOrganisation;

        newOrganisation.name = _name;
        newOrganisation.websiteUrl = _websiteUrl;
        newOrganisation.imageUrl = _imageUrl;
        newOrganisation.organisationAddress = msg.sender;

        organisations.push(newOrganisation);
    }

    function getAllOrganisation() public view returns (Organisation[] memory) {
        return organisations;
    }
}
