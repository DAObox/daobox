import { VotingSettings } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { useAragon } from "../../context";
import {
  UseFetchVotingSettingsOptions,
  FetchVotingSettingsReturnType,
} from "./types";

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
