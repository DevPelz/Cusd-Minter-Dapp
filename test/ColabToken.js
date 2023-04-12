const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ColabToken", function () {
  let colabToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const ColabToken = await ethers.getContractFactory("ColabToken");
    colabToken = await ColabToken.deploy();
    await colabToken.deployed();
  });
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await colabToken.owner()).to.equal(owner.address);
    });

    it("Should set the name and symbol of the token", async function () {
      expect(await colabToken.name()).to.equal("ColabToken");
      expect(await colabToken.symbol()).to.equal("COT");
    });
  });

  describe("safeMint", function () {
    it("Should mint a new token and set the correct tokenURI", async function () {
      const uri = "https://example.com/token/0";
      await colabToken.safeMint(uri);
      expect(await colabToken.tokenCounter()).to.equal(1);
      const tokenId = 0;
      expect(await colabToken.ownerOf(tokenId)).to.equal(owner.address);
      expect(await colabToken.tokenURI(tokenId)).to.equal(uri);
    });
  });

  describe("tokenCounter", function () {
    it("Should return the total number of tokens minted", async function () {
      expect(await colabToken.tokenCounter()).to.equal(0);
      await colabToken.safeMint("https://example.com/token/0");
      expect(await colabToken.tokenCounter()).to.equal(1);
      await colabToken.safeMint("https://example.com/token/1");
      expect(await colabToken.tokenCounter()).to.equal(2);
    });
  });

  describe("_burn", function () {
    it("Should burn an existing token", async function () {
      const uri = "https://example.com/token/0";
      await colabToken.safeMint(uri);
      const tokenId = 0;
      expect(await colabToken.ownerOf(tokenId)).to.equal(owner.address);
      await colabToken._burn(tokenId);
      expect(await colabToken.tokenCounter()).to.equal(0);
    });
  });

  describe("minting", function () {
    it("increments the total token count", async function () {
      await colabToken.safeMint("https://example.com/token1");
      await colabToken.safeMint("https://example.com/token2");
      expect(await colabToken.tokenCounter()).to.equal(2);
    });

    it("assigns the caller as the owner of the minted token", async function () {
      await colabToken.safeMint("https://example.com/token1");
      expect(await colabToken.ownerOf(0)).to.equal(owner.address);
    });

    it("sets the URI for the minted token", async function () {
      await colabToken.safeMint("https://example.com/token1");
      expect(await colabToken.tokenURI(0)).to.equal("https://example.com/token1");
    });
  });

 
});