// const { ethers } = require("ethers");
const hre = require("hardhat");

const bytesArr = [
    "0x646f670000000000000000000000000000000000000000000000000000000000",
    "0x6361740000000000000000000000000000000000000000000000000000000000",
    "0x70656e6775696e00000000000000000000000000000000000000000000000000",
    "0x66726f6700000000000000000000000000000000000000000000000000000000"
]

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log(`Deploying contracts with the account: ${deployer.address}`);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Ballot = await hre.ethers.getContractFactory("Ballot");
    const ballot = await Ballot.deploy(bytesArr);

    await ballot.deployed();

    console.log(`Ballot contract deployed to: ${ballot.address}`);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
