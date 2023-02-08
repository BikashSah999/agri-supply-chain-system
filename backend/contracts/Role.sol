// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Role {
    //struct
    struct User {
        string name;
        string role;
        bool hasAccess;
        address addr;
    }

    //mapping
    mapping(address => User) users;

    //array
    address[] addresses;

    //set
    function setUser(
        address _addr,
        string memory _role,
        string memory _name
    ) public {
        // By default giving access to user
        users[_addr] = User(_name, _role, true, _addr);
        addresses.push(_addr);
    }

    //get
    function getUser(
        address _addr
    ) public view returns (string memory, string memory, bool) {
        return (users[_addr].role, users[_addr].name, users[_addr].hasAccess);
    }

    //get all users
    function getAllUsers() public view returns (User[] memory) {
        User[] memory usersArray = new User[](addresses.length);
        for (uint i = 0; i < addresses.length; i++) {
            usersArray[i] = users[addresses[i]];
        }
        return usersArray;
    }

    //Change Access
    function changeAccess(address _addr) public {
        users[_addr].hasAccess = !users[_addr].hasAccess;
    }

    //Change Role
    function changeRole(address _addr, string memory role) public {
        users[_addr].role = role;
    }

    //Change Name
    function changeName(address _addr, string memory _name) public {
        users[_addr].name = _name;
    }
}
