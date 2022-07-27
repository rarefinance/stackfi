// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@uniswap/sdk';
import { Configuration } from './sfi-finance/config';
import { BankInfo } from './sfi-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: 1,
    networkName: 'Ethereum Mainnet',
    ethscanUrl: 'https://etherscan.io/',
    defaultProvider: 'https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79',
    deployments: require('./sfi-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WETH: ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18],
      FUSDT: ['0xb7f24e6e708eabfaa9e64b40ee21a5adbffb51d6', 6],
      BOO: ['0x14f0C98e6763a5E13be5CE014d36c2b69cD94a1e', 18],
      ZOO: ['0x2317610e609674e53D9039aaB85D8cAd8485A7c5', 0],
      'USDT-ETH-LP': ['0xE7e3461C2C03c18301F66Abc9dA1F385f45047bA', 18],
      'SFI-ETH-LP': ['0x13Fe199F19c8F719652985488F150762A5E9c3A8', 18],
      'TSHARE-ETH-LP': ['0x20bc90bB41228cb9ab412036F80CE4Ef0cAf1BD5', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: 1,
    networkName: 'Ethereum Mainnet',
    ethscanUrl: 'https://etherscan.io/',
    defaultProvider: 'https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79',
    deployments: require('./sfi-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WETH: ['0x45804880De22913dAFE09f4980848ECE6EcbAf78', 18],
      USDC: ['0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6], // This is actually usdc on mainnet not fusdt
      'SFI-ETH-LP': ['0x59B858A5e84059D166acF3dc8E8a2369385643aF', 18],
      'TSHARE-ETH-LP': ['0xDfaBf33a5C265192D6293687c08583cce5913169', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding SFI
        - 2 = LP asset staking rewarding TSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  SfiEthRewardPool: {
    name: 'Earn SFI by ETH',
    poolId: 0,
    sectionInUI: 0,
    contract: 'SfiEthRewardPool',
    depositTokenName: 'WETH',
    earnTokenName: 'SFI',
    finished: false,
    sort: 1,
    closedForStaking: true,
  },
  SfiEthLPSfiRewardPool: {
    name: 'Earn SFI by SFI-ETH LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'SfiEthLpSfiRewardPool',
    depositTokenName: 'SFI-ETH-LP',
    earnTokenName: 'SFI',
    finished: false,
    sort: 5,
    closedForStaking: true,
  },
  SfiEthLPSfiRewardPoolOld: {
    name: 'Earn SFI by SFI-ETH LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'SfiEthLpSfiRewardPoolOld',
    depositTokenName: 'SFI-ETH-LP',
    earnTokenName: 'SFI',
    finished: true,
    sort: 9,
    closedForStaking: true,
  },
  SfiEthLPTShareRewardPool: {
    name: 'Earn TSHARE by SFI-ETH LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'SfiEthLPTShareRewardPool',
    depositTokenName: 'SFI-ETH-LP',
    earnTokenName: 'TSHARE',
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  TshareEthLPTShareRewardPool: {
    name: 'Earn TSHARE by TSHARE-ETH LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'TshareEthLPTShareRewardPool',
    depositTokenName: 'TSHARE-ETH-LP',
    earnTokenName: 'TSHARE',
    finished: false,
    sort: 7,
    closedForStaking: false,
  },
};

export default configurations[process.env.NODE_ENV || 'production'];
