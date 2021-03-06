import { Signer } from 'ethers'
import { ethers, network } from 'hardhat'

const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const USDTHolder = '0x428e42D4cCBd57E2B4613DC066bcBC28C82a16Fc'
const UNI = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
const amountIn = 1000e6

async function swaptoken() {
	const provider = await ethers.provider
	const usdtSigner:Signer = await ethers.getSigner(USDTHolder)
	const router = await ethers.getContractAt('IRouter', UNIROUTER, usdtSigner)
	const usdtContract = await ethers.getContractAt('IERC20', USDT, usdtSigner)
	const uniContract = await ethers.getContractAt('IERC20', UNI)
	
	console.log(`balance before: ${await uniContract.balanceOf(USDTHolder)} `)
	console.log(`setting balance to 1000ether`)

	await network.provider.send("hardhat_setBalance", [
		USDTHolder,
		"0x1000000000000000000000000000",
	  ])

	//@ts-ignore
	await hre.network.provider.request({
		method: 'hardhat_impersonateAccount',
		params: [USDTHolder],
	})

	console.log(`approving ${UNIROUTER} to spend ${amountIn}`)
	await usdtContract.approve(UNIROUTER, amountIn)

	console.log(`swapping ${amountIn}USDT`)

	await router.swapExactTokensForTokens(
		amountIn,
		0,
		[USDT, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', UNI],
		USDTHolder,
		1646808989,
	)
	

	console.log(`Balance now is ${await uniContract.balanceOf(USDTHolder)}`)

}

swaptoken().catch((error) => {
	console.error(error)
	process.exitCode = 1
})


// uint amountIn,
// uint amountOutMin,
// address[] calldata path,
// address to,
// uint deadline