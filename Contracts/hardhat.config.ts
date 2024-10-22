import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.23',
  },
  networks: {
    // for mainnet
    'base-mainnet': {
      url: 'https://mainnet.base.org',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 1000000000,
    },
    // for testnet
    'base-sepolia': {
      url: 'https://sepolia.base.org',
      accounts: [process.env.WALLET_KEY as string],
      gasPrice: 1000000000,
    },
    // // for local dev environment
    // 'base-local': {
    //   url: 'http://localhost:8545',
    //   accounts: [process.env.WALLET_KEY as string],
    //   gasPrice: 1000000000,
    // },

    localhost: {
      chainId: 1337 // You can set your custom chain ID here
    },
    hardhat: {
      // url: 'http://127.0.0.1:8545',
      chainId: 1337, // Default chainId for Hardhat Network
    },
  },
  defaultNetwork: 'hardhat',
};

export default config;