import { CanVoteParams } from "@aragon/sdk-client";
import { useEffect } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

export function useCanVote(params: UseCanVoteParams): CanVoteReturnType {
  const { tokenVotingClient: client } = useAragon();
  const {
    vote,
    proposalId,
    voterAddressOrEns,
    enabled = true,
    queryKey: userQueryKey,
    ...options
  } = params;

  console.log({ client, vote, proposalId, voterAddressOrEns, enabled });
  useEffect(() => {
    console.log({ client, vote, proposalId, voterAddressOrEns, enabled });
  }, [client, vote, proposalId, voterAddressOrEns, enabled]);
  return useQuery<boolean | null, unknown>({
    queryKey: createQueryKey(
      "canVote",
      [proposalId, voterAddressOrEns, vote],
      userQueryKey
    ),
    queryFn: async () =>
      client!.methods.canVote({
        vote: vote!,
        proposalId: proposalId!,
        voterAddressOrEns: voterAddressOrEns!,
      }),
    enabled: !!(client && vote && proposalId && voterAddressOrEns && enabled),
    ...options,
  });
}

export interface UseCanVoteParams
  extends Partial<CanVoteParams>,
    QueryConfig<boolean | null> {}

export type CanVoteReturnType = UseQueryResult<boolean | null, unknown>;
