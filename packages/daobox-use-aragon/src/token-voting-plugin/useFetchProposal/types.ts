import { TokenVotingProposal } from "@aragon/sdk-client";
import { UseQueryResult, UseQueryOptions, QueryKey } from "react-query";

export type FetchProposalReturnType = UseQueryResult<
  TokenVotingProposal | null,
  unknown
>;

export type UseFetchProposalOptions = UseQueryOptions<
  TokenVotingProposal | null,
  unknown,
  TokenVotingProposal | null,
  QueryKey
>;
