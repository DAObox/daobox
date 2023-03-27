import { TokenVotingProposal } from "@aragon/sdk-client";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

export function useFetchProposal(
  params: UseFetchProposalParams
): FetchProposalReturnType {
  const { tokenVotingClient: client } = useAragon();
  const { proposalId, enabled, queryKey: userQueryKey, ...options } = params;

  return useQuery<TokenVotingProposal | null, unknown>({
    queryKey: createQueryKey("proposal", [proposalId], userQueryKey),
    queryFn: async () => client!.methods.getProposal(proposalId!),
    enabled: !!client && enabled,
    ...options,
  });
}

export interface UseFetchProposalParams
  extends QueryConfig<TokenVotingProposal | null> {
  proposalId?: string;
}

export type FetchProposalReturnType = UseQueryResult<
  TokenVotingProposal | null,
  unknown
>;
