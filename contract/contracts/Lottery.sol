pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

import "./Oracle.sol";

/**
 * TODO: change dependece of random oracle from block to players(require changes on transaction process).
 */
contract Lottery{
    enum State { bingo, no_prize, pending} // state for a ticket
    
    struct Ticket {
        address player; // address this ticket belongs to
        uint lottery; // the bet number
        State state; // the state
    }

    struct Prize {
        uint winningNumber;
        uint pool;
        uint winners;
    }

    Oracle oracle;
    Ticket[] public tickets; // all tickets ascending by time
    Prize[] prizes; // prizes for each round
    mapping (address => uint[]) addressBook; // holds the mapping between address and ticket indices
    address owner; // house
    uint interval; // interval between each drawing
    uint prizeValue; // value for one ticket

    uint drawTime; // upcoming drawing time
    uint head; // head ticket for current round
    address[] winners; // all winners in a round

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
    constructor (address oracleAddress) public {
        oracle = Oracle(oracleAddress);
        owner = msg.sender;
        head = 0;
        interval = 1 minutes;
        drawTime = now + interval;
        prizeValue = 1 wei;
        prizes[prizes.length++] = Prize(0, 0, 0);
    }

    function () public payable {}

    // @dev Bet.
    // @para number The number you choose to bet.
    // @return ticket_id Corresponding id for this ticket.
    function bet(uint number) public payable restrictBet() returns (uint ticket_id) {
        ticket_id = tickets.length++;
        tickets[ticket_id] = Ticket(msg.sender, number, State.pending);
        addressBook[msg.sender].push(ticket_id);
    }

    // @dev Draw the lottery
    function draw() public returns (uint) {
        delete winners;
        uint winningNumber = oracle.getRandom(); // RNG
        uint pool = address(this).balance;
        // search for winners
        for(; head < tickets.length; head++){
            if(tickets[head].lottery == winningNumber ){ // bingo
                tickets[head].state = State.bingo;
                winners[winners.length++] = tickets[head].player;
            }
            else{ // no prize
                tickets[head].state = State.no_prize;
            }
        }
        // give out bonus
        for(uint i = 0; i < winners.length; i++){
            winners[i].transfer(address(this).balance / winners.length);
        }

        prizes[prizes.length++] = Prize(winningNumber, pool, winners.length);
        drawTime = now + interval;
        return prizes[prizes.length - 1].winningNumber;
    }

    // @dev show current result.
    // @return Prize(winningNumber, pool, winners)
    function showCurrentResult() public view returns (Prize) {
        return (prizes[prizes.length - 1]);
    }
    
    // @dev show history results.
    // @return Prize[]
    function showHistoryResults() public view returns (Prize[]) {
        return prizes;
    }

    // @dev show tickets by one's address
    // @return Tickets[]
    function showByAddress() public view returns (Ticket[] memory results) {
        results = new Ticket[](addressBook[msg.sender].length);
        for(uint i = 0; i < addressBook[msg.sender].length; i++){
            results[i] = tickets[addressBook[msg.sender][i]];
        }
    }

}
