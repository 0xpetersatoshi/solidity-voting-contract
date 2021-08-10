# Solidity Voting Contract

This contract comes from [Solidity by Example](https://docs.soliditylang.org/en/v0.8.6/solidity-by-example.html#voting). In addition to the example, I added some getter functions to further expand on the example.

## Installation

```bash
npm install
```

## Compiling Solidity

```bash
npx hardhat compile
```

## Running tests

```bash
npx hardhat test
```

## Deploying Contract on Local Network

First, start a local node in a separate terminal window:

```bash
npx hardhat node
```

Next, deploy the contract to the local node:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

**NOTE**: The deploy script defines a bytes32 array that is passed to the contract constructor. The string values of the array are: dog, cat, penguin, frog.

Make sure to get the contract address from the output after the deployment has finished.

## Vote

Finally, start a console on the local network:

```bash
npx hardhat console --network localhost
```

Instantiate the contract and attach to the contract address:

```javascript
// Instantiate token object and attach to contract address
const Ballot = await ethers.getContractFactory("Ballot");
const ballot = Ballot.attach("<CONTRACT ADDRESS>");

// Get owner account address and other addresses
const [owner, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();
```

Give address right to vote and then have those addresses vote or delegate their vote

```javascript
// Give right to vote to addr1, addr2, addr3, addr4
await ballot.giveRightToVote(addr1.address);
await ballot.giveRightToVote(addr2.address);
await ballot.giveRightToVote(addr3.address);
await ballot.giveRightToVote(addr4.address);

// Delegate vote for addr1 and addr2 to addr3
await ballot.connect(addr1).delegate(addr2.address);
await ballot.connect(addr2).delegate(addr3.address);

// Have addr3 and addr4 vote
await ballot.connect(addr3).vote(1);
await ballot.connect(addr4).vote(2);
```

Lastly, when voting is done, calculate winning proposal:

```javascript
const winningProposal = await ballot.winnerName();

// Convert bytes32 to string
const proposalName = ethers.utils.parseBytes32String(winningProposal);
console.log(proposalName);  // logs 'cat'
```
