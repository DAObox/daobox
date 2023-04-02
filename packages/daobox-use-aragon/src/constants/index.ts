import { activeContractsList } from "@aragon/osx-ethers";
import { SupportedChainIds } from "../types";
import { IpfsNode } from "../context";

export const SUBGRAPH_API_URL: { [key: number]: string } = {
  1: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/api",
  5: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/version/v1.0.0/api",
  137: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-polygon/api",
  80001:
    "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mumbai/api",
};

export const WEB3_PROVIDER_URL: { [key: number]: string } = {
  1: "https://rpc.ankr.com/eth",
  5: "https://rpc.ankr.com/eth_goerli",
  137: "https://rpc.ankr.com/polygon",
  80001: "https://rpc.ankr.com/polygon_mumbai",
};

export const IPFS_NODES = [
  {
    url: "https://testing-ipfs-0.aragon.network/api/v0",
    headers: {
      "X-API-KEY": "b477RhECf8s8sdM7XrkLBs2wHc4kCMwpbcFC55Kt",
    },
  },
];

export function settings(
  network: SupportedChainIds,
  nodes: IpfsNode[] | undefined
) {
  const ipfsNodes = nodes || IPFS_NODES;
  switch (network) {
    case 1:
      return {
        graphqlNodes: [{ url: SUBGRAPH_API_URL[network] }],
        web3Providers: WEB3_PROVIDER_URL[network],
        daoFactoryAddress: activeContractsList["mainnet"].DAOFactory,
        ipfsNodes,
      };
    case 5:
      return {
        graphqlNodes: [{ url: SUBGRAPH_API_URL[network] }],
        web3Providers: WEB3_PROVIDER_URL[network],
        daoFactoryAddress: activeContractsList["goerli"].DAOFactory,
        ipfsNodes,
      };
    case 137:
      return {
        graphqlNodes: [{ url: SUBGRAPH_API_URL[network] }],
        web3Providers: WEB3_PROVIDER_URL[network],
        daoFactoryAddress: activeContractsList["polygon"].DAOFactory,
        ipfsNodes,
      };
    case 80001:
      return {
        graphqlNodes: [{ url: SUBGRAPH_API_URL[network] }],
        web3Providers: WEB3_PROVIDER_URL[network],
        daoFactoryAddress: activeContractsList["mumbai"].DAOFactory,
        ipfsNodes,
      };
    default:
      throw new Error(`Unsupported network ID: ${network}`);
  }
}

export const CHAINS = {
  mainnet: 1,
  goerli: 5,
  polygon: 137,
  mumbai: 80001,
} as const;

export const AddressZero = "0x" + "0".repeat(40);

// DAO BOX Plugins
export const DAOBOX_PLUGIN_REPOS = {
  network: {
    goerli: {},
    mainnet: {},
    mumbai: { lensVoting: "0xD42Aa286DD6c5610FAF4D402B055f35dDb446432" },
    polygon: { lensVoting: "0x0650EE961514C90D927F302b374d52344E8C62BF" },
  },
} as const;
