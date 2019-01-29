// Step 1: import the contract ABI
const MyContract = require('Embark/contracts/MyContract');

let accounts;

// Step 2: deploy the contract with the paramater "Hello World"
config({
  contracts: {
    "MyContract": {
      args: ["Hello World"]
    }
  }
}, (_err, web3_accounts) => {
    accounts = web3_accounts
});

contract("MyContract", function () {
  it('Puts the correct value in the `myMessage` variable', async () => {
    // Step 3: request the value of myMessage
    let result = await MyContract.methods.myMessage().call();
    // Step 4: verify the value matches our parameter
    assert.strictEqual(result, "Hello World");   
  })

  it('sets the right owner at start', async () => {
    let contractOwner = await MyContract.methods.owner().call();
    assert.equal(contractOwner, accounts[0], "Owner does not match.");
  })

  it('Lets the owner set a new message', async () => {
    let newMessage = "Hello RMIT";
    await MyContract.methods.setMessage(newMessage).send();
    let changedMessage = await MyContract.methods.myMessage().call();
    assert.equal(changedMessage, newMessage, "New message not set.")
  })

  it('Lets no one else set a new message', async () => {
    let oldMessage = await MyContract.methods.myMessage().call();
    let newMessage = "Hello, stranger.";
    await MyContract.methods.setMessage(newMessage).send({ from: accounts[1] })
    let changedMessage = await MyContract.methods.myMessage().call();
    assert.equal(changedMessage, oldMessage, "Non-owner set a new message.");
  })
})