const { expect } = require("chai");

const bytesArr = [
    "0x646f670000000000000000000000000000000000000000000000000000000000",
    "0x6361740000000000000000000000000000000000000000000000000000000000",
    "0x70656e6775696e00000000000000000000000000000000000000000000000000",
    "0x66726f6700000000000000000000000000000000000000000000000000000000"
]

describe("Ballot contract", () => {
    let Ballot;
    let hardhatBallot;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addr4;
    let addrs;

    beforeEach(async ()=> {
        // Get ContractFactory and signers
        Ballot = await ethers.getContractFactory("Ballot");
        [owner, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();

        // Deploy contract and wait for it to be mined
        hardhatBallot = await Ballot.deploy(bytesArr);
        await hardhatBallot.deployed();
    });

    describe("Deployment", () => {
        it("Should set the right owner", async () => {
            // Contract owner should be equal to signer's owner
            expect(await hardhatBallot.owner()).to.equal(owner.address);
        })
    });

    describe("Voting", () => {
        it("Should ensure voter has right to vote", async () => {
            await hardhatBallot.giveRightToVote(addr1.address);
            await hardhatBallot.connect(addr1).vote(0);
            const canVote = await hardhatBallot.hasRightToVote(addr1.address);

            expect(canVote).to.equal(true);
        });

        it("Should ensure voter does not have right to vote", async () => {
            const canVote = await hardhatBallot.hasRightToVote(addr1.address);

            expect(canVote).to.equal(false);
        });

        it("Should ensure proposal names match expected", async () => {
            const proposals = await hardhatBallot.getProposalNames();

            expect(proposals).to.deep.equal(bytesArr);
        });

        it("Should assert that voter has voted", async () => {
            await hardhatBallot.giveRightToVote(addr4.address);
            await hardhatBallot.connect(addr4).vote(1);
            const hasVoted = await hardhatBallot.hasVoted(addr4.address);

            expect(hasVoted).to.equal(true);
        });

        it("Should assert that voter has not voted", async () => {
            const hasVoted = await hardhatBallot.hasVoted(addr4.address);

            expect(hasVoted).to.equal(false);
        });

        it("Should show address delegated to", async () => {
            await hardhatBallot.giveRightToVote(addr1.address);
            await hardhatBallot.giveRightToVote(addr2.address);
            await hardhatBallot.giveRightToVote(addr3.address);

            await hardhatBallot.connect(addr1).delegate(addr2.address);
            await hardhatBallot.connect(addr2).delegate(addr3.address);

            const voteWeight = await hardhatBallot.getVoteWeight(addr3.address);

            expect(voteWeight).to.equal(3);
        });

    });

    describe("Winning", async () => {
        it("Should select the correct winning proposal", async () => {
            await hardhatBallot.giveRightToVote(addr1.address);
            await hardhatBallot.giveRightToVote(addr2.address);
            await hardhatBallot.giveRightToVote(addr3.address);
            await hardhatBallot.giveRightToVote(addr4.address);

            await hardhatBallot.connect(addr1).delegate(addr2.address);
            await hardhatBallot.connect(addr2).delegate(addr3.address);
            await hardhatBallot.connect(addr3).vote(1);
            await hardhatBallot.connect(addr4).vote(2);

            const proposal = "0x6361740000000000000000000000000000000000000000000000000000000000";
            const winningProposal = await hardhatBallot.winnerName();

            expect(winningProposal).to.equal(proposal);
        });
    });
})