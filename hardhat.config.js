// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
  // solidity:{
  //   compilers: [
  //     {
  //       version: "0.8.9",
  //     },
  //     {
  //       version: "0.5.0",
  //       settings: {evmVersion: 'istanbul',
  //       optimizer: {
  //         enabled: true,
  //         runs: 1_000,},
  //     },
  //   },
  //     {
  //       version: "0.8.0",
  //       settings: {evmVersion: 'istanbul',
  //       optimizer: {
  //         enabled: true,
  //         runs: 1_000,},},
  //     },
  //     {
  //       version: "0.8.17",
  //       settings: {evmVersion: 'istanbul',
  //       optimizer: {
  //         enabled: true,
  //         runs: 1_000,},},
  //     },
  //     {
  //       version: "0.7.6",
  //       settings: {evmVersion: 'istanbul',
  //       optimizer: {
  //         enabled: true,
  //         runs: 1_000,},},
  //     },
      
      
  //   ],
  // },
//   networks:{
//       hardhat: {
        
//         forking: {
//           url: "https://eth-mainnet.g.alchemy.com/v2/3fZmT3qNNxTuVc7IhiiBX-kydITbkti9",
//         },
//         optimizer: 200
//       },
//   },
// };


require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
      {
        version: "0.5.0",
        settings: {evmVersion: 'istanbul',
        optimizer: {
          enabled: true,
          runs: 1_000,},
      },
    },
      {
        version: "0.8.0",
        settings: {evmVersion: 'istanbul',
        optimizer: {
          enabled: true,
          runs: 1_000,},},
      },
      {
        version: "0.8.17",
        settings: {evmVersion: 'istanbul',
        optimizer: {
          enabled: true,
          runs: 1_000,},},
      },
      {
        version: "0.7.6",
        settings: {evmVersion: 'istanbul',
        optimizer: {
          enabled: true,
          runs: 1_000,},},
      },
    ],
    
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000,
        details: { yul: false },
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/3fZmT3qNNxTuVc7IhiiBX-kydITbkti9",
          accounts: [
            `0x${""}`,
          ],
      },
    },
  },
};