// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Role {
    //struct
    struct User {
        string name;
        string role;
        bool hasAccess;
    }

    //mapping
    mapping(address => User) users;

    //set
    function setUser(
        address _addr,
        string memory _role,
        string memory _name
    ) public {
        // By default giving access to user
        users[_addr] = User(_name, _role, true);
    }

    //get
    function getUser(
        address _addr
    ) public view returns (string memory, string memory, bool) {
        return (users[_addr].role, users[_addr].name, users[_addr].hasAccess);
    }

    //Change Access
    function changeAccess(address _addr, bool _hasAccess) public {
        users[_addr].hasAccess = _hasAccess;
    }

    //Change Role
    function changeRole(address _addr, string memory role) public {
        users[_addr].role = role;
    }

    //Change Name
    function changeName(address _addr, string memory _name) public {
        users[_addr].name = _name;
    }

    function sayHello() public pure returns (string memory) {
        return "Bikash Sah";
    }
}
