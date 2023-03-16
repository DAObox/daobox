import { TokenVotingProposal } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { useAragon } from "../../context";
import { UseFetchProposalOptions, FetchProposalReturnType } from "./types";

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
