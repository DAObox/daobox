import { Pagination } from "@aragon/sdk-client";

export type {
  ContextParams,
  ContextPlugin,
  TokenVotingClient,
  DaoDepositSteps,
  DepositParams,
  DaoDetails,
  AssetBalance,
  DaoListItem,
  IDaoQueryParams,
  ITransferQueryParams,
  Transfer,
  DaoCreationSteps,
  DaoMetadata,
  IPluginInstallItem,
  InstalledPluginListItem,
  ITokenVotingPluginInstall,
  CanVoteParams,
  Pagination,
  TokenVotingProposal,
  IProposalQueryParams,
  TokenVotingProposalListItem,
  VotingSettings,
  Erc20TokenDetails,
  CreateMajorityVotingProposalParams,
  ProposalCreationSteps,
  ProposalMetadata,
  IVoteProposalParams,
  VoteProposalStep,
} from "@aragon/sdk-client";

export type DepositErc20Params = DepositBaseParams & {
  type: TokenType.ERC20;
  tokenAddress: string;
  amount: bigint;
};
export type DepositBaseParams = {
  daoAddressOrEns: string;
};
export enum TokenType {
  NATIVE = "native",
  ERC20 = "erc20",
  ERC721 = "erc721",
}

export declare type DepositEthParams = DepositBaseParams & {
  type: TokenType.NATIVE;
  amount: bigint;
};

export declare type DaoBalancesQueryParams = Pagination & {
  sortBy?: AssetBalanceSortBy;
  daoAddressOrEns?: string;
};

export declare enum AssetBalanceSortBy {
  LAST_UPDATED = "lastUpdated",
}

export declare type Erc721TokenDetails = TokenBaseDetails & {
  type: TokenType.ERC721;
};

export declare type TokenBaseDetails = {
  address: string;
  name: string;
  symbol: string;
};