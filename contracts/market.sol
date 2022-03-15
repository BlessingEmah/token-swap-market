//SPDX-License_identifier:MIT;

pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Market {
    
    string TokenName;
    address TokenAddress;

 AggregatorV3Interface internal priceFeed;

    constructor(address feedAddress) {
        priceFeed = AggregatorV3Interface(feedAddress);
    
    }

    function getLatestPrice() public view returns (int, uint8) {
        (
            uint80 roundID,
            int price,
             uint startedAt,
            uint timeStamp,
           uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        uint8 decimals = priceFeed.decimals();
        return (price, decimals);
    }


//    function swapExactTokensForTokens( uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts){

//    }

}
