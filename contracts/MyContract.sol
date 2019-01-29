pragma solidity 0.4.24;

contract MyContract {

  string public myMessage = "";
  address public owner;

  constructor (string memory _message) public {
    myMessage = _message;
    owner = msg.sender;
  }

  function setMessage(string memory _message) public {
    if(msg.sender == owner) {
      myMessage = _message;
    }
  }
}