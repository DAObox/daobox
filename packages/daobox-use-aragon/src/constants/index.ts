import { activeContractsList } from "@aragon/osx-ethers";
import { SupportedChainIds } from "../types";

export const SUBGRAPH_API_URL: { [key: number]: string } = {
  1: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-mainnet/api",
  5: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/version/v1.0.0/api",
};

export const WEB3_PROVIDER_URL: { [key: number]: string } = {
  1: "https://rpc.ankr.com/eth",
  5: "https://rpc.ankr.com/eth_goerli",
};

export const IPFS_NODES = [
  {
    url: "https://testing-ipfs-0.aragon.network/api/v0",
    headers: {
      "X-API-KEY": "b477RhECf8s8sdM7XrkLBs2wHc4kCMwpbcFC55Kt",
    },
  },
];

export function settings(network: SupportedChainIds) {
  if (network === 1) {
    return {
      graphqlNodes: [{ url: SUBGRAPH_API_URL[network] }],
      web3Providers: WEB3_PROVIDER_URL[network],
      daoFactoryAddress: activeContractsList["mainnet"].DAOFactory,
      ipfsNodes: IPFS_NODES,
    };
  } else {
    return {
      graphqlNodes: [{ url: SUBGRAPH_API_URL[network] }],
      web3Providers: WEB3_PROVIDER_URL[network],
      daoFactoryAddress: activeContractsList["goerli"].DAOFactory,
      ipfsNodes: IPFS_NODES,
    };
  }
}

export const CHAINS = {
  mainnet: 1,
  goerli: 5,
} as const;
