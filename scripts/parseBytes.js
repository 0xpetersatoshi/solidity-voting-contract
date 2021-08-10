const { ethers } = require("ethers");


const bytesArr = [
    "0x646f670000000000000000000000000000000000000000000000000000000000",
    "0x6361740000000000000000000000000000000000000000000000000000000000",
    "0x70656e6775696e00000000000000000000000000000000000000000000000000",
    "0x66726f6700000000000000000000000000000000000000000000000000000000"
]

const parseBytesArr = (arr) => {
    const stringArr = [];
    arr.forEach(element => {
        stringArr.push(ethers.utils.parseBytes32String(element))
    });

    return stringArr
}

const main = () => {
    console.log(`converting bytes32 arr to strings...`);

    const arr = parseBytesArr(bytesArr);
    console.log(`array: ${arr}`);
}

main();
