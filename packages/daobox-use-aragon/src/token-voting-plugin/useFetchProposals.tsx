import {
  IProposalQueryParams,
  TokenVotingProposalListItem,
} from "@aragon/sdk-client";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { useAragon } from "../context";

/**
 * Custom hook to fetch a list of proposals based on query parameters.
 * @param {IProposalQueryParams | undefined} queryParams - Optional query parameters.
 * @param {UseFetchProposalsOptions | undefined} options - Optional query options.
 * @returns {FetchProposalsReturnType} - A query result object containing the proposal list and other query metadata.
 */
export function useFetchProposals(
  queryParams?: IProposalQueryParams,
  options?: UseFetchProposalsOptions
): FetchProposalsReturnType {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<TokenVotingProposalListItem[] | null>({
    queryKey: ["proposals", queryParams],
    queryFn: async () => client!.methods.getProposals({ ...queryParams }),
    enabled: !!client,
    ...options,
  });
}

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
