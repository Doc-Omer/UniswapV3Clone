// require("@nomicfoundation/hardhat-toolbox");
// require('dotenv').config();

// // npx hardhat node --fork https://eth-goerli.g.alchemy.com/v2/Pk45XQqmiWuKjwka4DYOOxeE4Ia8Wtix

// const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
// // const GOERLI_PRIVATE_KEY = process.env.PRIVATE_KEY;
// // const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// module.exports = {
//   solidity: "0.8.17",
//   networks:{
//       hardhat: {
//         forking: {
//           // url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
//           url: `https://eth-goerli.g.alchemy.com/v2/Pk45XQqmiWuKjwka4DYOOxeE4Ia8Wtix`,
//           // blockNumber: 8186267
//         },
//       },
//   },
// };



require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const GOERLI_PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

module.exports = {
  solidity: "0.8.17",

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  
  networks:{
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
     }
  }
};
