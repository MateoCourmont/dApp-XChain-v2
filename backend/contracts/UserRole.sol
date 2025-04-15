// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRole {
    enum Role { None, Sender, Carrier }

    mapping(address => Role) private roles;

    event RoleAssigned(address indexed user, Role role);

    // Assigner un rôle à l'utilisateur (le rôle ne peut être changé une fois attribué)
    function setRole(uint8 _role) external {
        require(roles[msg.sender] == Role.None, "Role already set");
        require(_role == uint8(Role.Sender) || _role == uint8(Role.Carrier), "Invalid role");

        roles[msg.sender] = Role(_role);
        emit RoleAssigned(msg.sender, Role(_role));
    }

    // Récupérer le rôle d'un utilisateur spécifique
    function getRole(address _user) external view returns (string memory) {
        Role role = roles[_user];
        if (role == Role.Sender) {
            return "Sender";
        } else if (role == Role.Carrier) {
            return "Carrier";
        }
        return "None";
    }

    // Récupérer le rôle de l'appelant
    function myRole() external view returns (string memory) {
        return this.getRole(msg.sender);
    }
}
