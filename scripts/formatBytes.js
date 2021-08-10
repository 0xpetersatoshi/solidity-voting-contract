const { ethers } = require("ethers");


const proposals = [
    "dog",
    "cat",
    "penguin",
    "frog",
];

const formatBytesArray = (arr) => {
    const bytesArr = [];
    arr.forEach(element => {
        bytesArr.push(ethers.utils.formatBytes32String(element))
    });

    return bytesArr;
}

const main = () => {
    console.log(`converting proposals ${proposals} to bytes32 array...`);

    const bytesArr = formatBytesArray(proposals);
    console.log(`bytes32 arr: ${bytesArr}`);
}

main();
