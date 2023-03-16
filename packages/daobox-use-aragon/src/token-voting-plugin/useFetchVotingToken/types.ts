import { Erc20TokenDetails } from "@aragon/sdk-client";
import { Erc721TokenDetails } from "@aragon/sdk-client/dist/tokenVoting/interfaces";
import { UseQueryResult, UseQueryOptions, QueryKey } from "react-query";

export type FetchVotingTokenReturnType = UseQueryResult<
  Erc20TokenDetails | Erc721TokenDetails | null,
  unknown
>;

export type UseFetchVotingTokenOptions = UseQueryOptions<
  Erc20TokenDetails | Erc721TokenDetails | null,
  unknown,
  Erc20TokenDetails | Erc721TokenDetails | null,
  QueryKey
>;
