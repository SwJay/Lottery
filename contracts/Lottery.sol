pragma solidity ^0.4.24;

contract Lottery{
    enum State { bingo, no_prize, pending} // state for a ticket
    
    struct Ticket {
        address player; // address this ticket belongs to
        uint lottery; // the bet number
        State state; // the state
    }

    Ticket[] public ticket_history; // all tickets ascending by time
    address public owner; // banker
    uint head; // head ticket for current round
    uint interval; // interval between each drawing
    uint drawTime; // upcoming drawing time
    uint prizeValue; // value for one ticket
    uint prizeNumber; // wining number in a round
    address[] public winners; // all winners in a round
    uint balance;

    // restrict for contract owner
    modifier onlyByOwner() { 
        require(msg.sender == owner, "Access denied.");
        _;
    }

    // restrict for bet
    modifier restrictBet() {
        require(now < drawTime, "Time out.");
        require(msg.value == prizeValue, "Invalid ticket price.");
        _;
    }

    // restrict for draw time
    modifier restrictDraw() {
        require(now >= drawTime, "Bet not yet ended.");
        _;
    }

    // constructor
    constructor () public {
        owner = msg.sender;
        head = 0;
        interval = 1 minutes;
        drawTime = now + interval;
        prizeValue = 1 wei;
        prizeNumber = 0;
        balance = 0;
    }

    // @dev Bet.
    // @para number The number you choose to bet.
    // @return ticket_id Corresponding id for this ticket.
    function bet(uint number) public payable restrictBet() returns (uint ticket_id) {
        ticket_id = ticket_history.length++;
        ticket_history[ticket_id] = Ticket(msg.sender, number, State.pending);
        balance += msg.value;
    }

    // @dev Draw the lottery
    function draw() public returns (bool) {
        delete winners;
        prizeNumber = uint(blockhash(block.number)) % 3; // randomness

        for(; head < ticket_history.length; head++){
            if(ticket_history[head].lottery == prizeNumber){ // bingo
                ticket_history[head].state = State.bingo;
                winners[winners.length++] = ticket_history[head].player;
            }
            else{ // no prize
                ticket_history[head].state = State.no_prize;
            }
        }

        //owner.transfer(balance);
        if(owner != ticket_history[0].player){
            ticket_history[0].player.transfer(balance);
        }
        // for(uint i = 0; i < winners.length; i++){
        //     winners[i].transfer(address(this).balance / winners.length);
        // }

        drawTime = now + interval;
        return winners[0] == owner;
    }
}
