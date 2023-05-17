const { expect } = require("chai");
const { ethers} = require("hardhat");
const { smock } = require('@defi-wonderland/smock');

describe("L28DToken", function () {
  let mockUSDC;
  let l28dToken;
  let owner;
  let addr1;
  
  beforeEach(async function () {
    const mockUSDCFactory = await smock.mock('MockERC20');
    mockUSDC = await mockUSDCFactory.deploy();

    [owner, addr1] = await ethers.getSigners();
    
    const L28DToken = await ethers.getContractFactory("L28D");
    l28dToken = await L28DToken.deploy(mockUSDC.address, owner.address);
    await l28dToken.deployed();
  });
  
  it("Should mint the correct amount of tokens", async function () {
    // Mock the behavior of USDC contract
    mockUSDC.transferFrom.returns(true);

    await l28dToken.connect(addr1).mint(100); // Mint 100 L28D tokens
    expect(await l28dToken.balanceOf(addr1.address)).to.equal(100); 
  });
});
