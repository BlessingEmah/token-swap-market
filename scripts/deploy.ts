
import { ethers } from "hardhat";

const ATOM_ETH	="0xc751E86208F0F8aF2d5CD0e29716cA7AD98B5eF5"
const ATOM_USD	= "0x3539F2E214d8BC7E611056383323aC6D1b01943c"


async function main() {
 
  const tokenPrice = await ethers.getContractFactory("Market");
  const feedPrice = await tokenPrice.deploy(ATOM_ETH);
  const feedPrice2 = await tokenPrice.deploy(ATOM_USD);

  await feedPrice.deployed();

  console.log(await feedPrice.getLatestPrice())
  console.log(await feedPrice2.getLatestPrice())
  console.log("Greeter deployed to:", feedPrice.address, feedPrice2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
