import { VotingSettings } from "@aragon/sdk-client";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { useAragon } from "../context";

/**
 * Custom hook to fetch voting settings of a given plugin address.
 * @param {string | undefined} pluginAddress - Optional plugin address.
 * @param {UseFetchVotingSettingsOptions | undefined} options - Optional query options.
 * @returns {FetchVotingSettingsReturnType} - A query result object containing the voting settings and other query metadata.
 */
export function useFetchVotingSettings(
  pluginAddress?: string,
  options?: UseFetchVotingSettingsOptions
): FetchVotingSettingsReturnType {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<VotingSettings | null>({
    queryKey: ["voteSettings", pluginAddress],
    queryFn: async () => client!.methods.getVotingSettings(pluginAddress!),
    enabled: !!client && !!pluginAddress,
    ...options,
  });
}

export type FetchVotingSettingsReturnType = UseQueryResult<
  VotingSettings | null,
  unknown
>;

export type UseFetchVotingSettingsOptions = UseQueryOptions<
  VotingSettings | null,
  unknown,
  VotingSettings | null,
  QueryKey
>;
