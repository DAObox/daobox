import { TokenVotingProposal } from "@aragon/sdk-client";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { useAragon } from "../context";

/**
 * Custom hook to fetch a proposal by its ID.
 * @param {string | undefined} proposalId - The proposal ID to fetch the proposal.
 * @param {UseFetchProposalOptions | undefined} options - Optional query options.
 * @returns {FetchProposalReturnType} - A query result object containing the proposal and other query metadata.
 */
export function useFetchProposal(
  proposalId?: string,
  options?: UseFetchProposalOptions
): FetchProposalReturnType {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<TokenVotingProposal | null>({
    queryKey: ["proposal", proposalId],
    queryFn: async () => client!.methods.getProposal(proposalId!),
    enabled: !!client && !!proposalId,
    ...options,
  });
}

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
