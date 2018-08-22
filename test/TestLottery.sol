pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Lottery.sol";

contract TestLottery {
    Lottery lottery = Lottery(DeployedAddresses.Lottery());
    uint public initialBalance = 4 wei;

    function testBet() public {
        lottery.bet.value(1 wei)(123);
        address a;
        a = lottery.owner();
        Assert.equal(a, address(this), "wrong!");
    }

    function testDraw() public {
        lottery.bet.value(1 wei)(0);
        lottery.bet.value(1 wei)(1);
        lottery.bet.value(1 wei)(2);
        bool result = lottery.draw();
        Assert.equal(result, true, "wrong");
    }

}