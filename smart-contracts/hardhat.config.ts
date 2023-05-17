import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'dotenv/config';

const config: HardhatUserConfig = {
  networks: {
    testnet: {
      url: process.env.ALCHEMY_PRIVATE_ENTRYPOINT,
      accounts: [process.env.DEPLOY_ACCOUNT_PRIVATE_KEY || ""]
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          outputSelection: {
            "*": {
              "*": ["storageLayout"]
            }
          }
        }
      },
    ]
  },
};

export default config;
