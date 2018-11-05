pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Lottery.sol";

contract TestLottery {
    Oracle oracle = Oracle(DeployedAddresses.Oracle());
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

    function testCurrentResult0() public {
        uint expected = 0;
        uint result = lottery.showCurrentResult().winningNumber;
        Assert.equal(expected, result, "wrong");
    }
    function testCurrentResult1() public {
        uint expected = 4;
        uint result = lottery.showCurrentResult().pool;
        Assert.equal(expected, result, "wrong");
    }
    function testCurrentResult2() public {
        uint expected = 1;
        uint result = lottery.showCurrentResult().winners;
        Assert.equal(expected, result, "wrong");
    }

    function testShowByAddress() public {
        uint expected = 4;
        uint result = lottery.showByAddress().length;
        Assert.equal(expected, result, "wrong");
    }
}