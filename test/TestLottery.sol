pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Lottery.sol";

contract TestLottery {
    Lottery lottery = Lottery(DeployedAddresses.Lottery());
    uint public initialBalance = 4 wei;

    function () public payable {}

    function testBet() public {
        lottery.bet.value(1 wei)(123);
        uint expect;
        (,expect,) = lottery.tickets(0);
        Assert.equal(expect, 123, "wrong!");
    }

    function testDraw() public {
        lottery.bet.value(1 wei)(0);
        lottery.bet.value(1 wei)(1);
        lottery.bet.value(1 wei)(2);
        uint result = lottery.draw();
        Assert.equal(result, 0, "wrong");
    }

}