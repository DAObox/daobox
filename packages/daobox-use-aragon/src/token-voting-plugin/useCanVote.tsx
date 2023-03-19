import { CanVoteParams } from "@aragon/sdk-client";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { useAragon } from "../context";

/**
 * Custom hook to check if an address can vote.
 * @param {CanVoteParams | undefined} canVoteParams - The parameters to check if an address can vote.
 * @param {UseCanVoteOptions | undefined} options - Optional query options.
 * @returns {CanVoteReturnType} - A query result object containing the canVote status and other query metadata.
 */
export function useCanVote(
  canVoteParams?: CanVoteParams,
  options?: UseCanVoteOptions
): CanVoteReturnType {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<boolean | null>({
    queryKey: ["canVote", canVoteParams],
    queryFn: async () => client!.methods.canVote(canVoteParams!),
    enabled: !!client && !!canVoteParams,
    ...options,
  });
}

export type CanVoteReturnType = UseQueryResult<boolean | null, unknown>;

export type UseCanVoteOptions = UseQueryOptions<
  boolean | null,
  unknown,
  boolean | null,
  QueryKey
>;
