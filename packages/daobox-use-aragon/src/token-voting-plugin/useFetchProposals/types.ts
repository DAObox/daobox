import { TokenVotingProposalListItem } from "@aragon/sdk-client";
import { UseQueryResult, UseQueryOptions, QueryKey } from "react-query";

export type FetchProposalsReturnType = UseQueryResult<
  TokenVotingProposalListItem[] | null,
  unknown
>;

export type UseFetchProposalsOptions = UseQueryOptions<
  TokenVotingProposalListItem[] | null,
  unknown,
  TokenVotingProposalListItem[] | null,
  QueryKey
>;
