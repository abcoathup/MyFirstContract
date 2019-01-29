pragma solidity 0.4.24;

contract MyContract {

  string public myMessage = "";
  address public owner;

  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }

  constructor (string memory _message) public {
    myMessage = _message;
    owner = msg.sender;
  }

  function setMessage(string memory _message) public onlyOwner {
    myMessage = _message;
  }
}