// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PiggyBank {

    mapping (address => uint256) balances;

    function getBalanceOf(address _owner) public view returns(uint256) {
        return balances[_owner];
    }

    function withdrawEther(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Not Enough Balance to Withdraw");

        // First decrease sender balance to avoid reentrancy attack.
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }

}