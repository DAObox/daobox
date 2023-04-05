import { VotingSettings } from "@aragon/sdk-client";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

export function useFetchVotingSettings(
  params: UseFetchVotingSettingsParams
): FetchVotingSettingsReturnType {
  const { tokenVotingClient: client } = useAragon();
  const { pluginAddress, enabled, queryKey: userQueryKey, ...options } = params;

  return useQuery<VotingSettings | null, unknown>({
    queryKey: createQueryKey("voteSettings", [pluginAddress], userQueryKey),
    queryFn: async () => client!.methods.getVotingSettings(pluginAddress!),
    enabled: !!client && !!pluginAddress && enabled,
    ...options,
  });
}

export interface UseFetchVotingSettingsParams
  extends QueryConfig<VotingSettings | null> {
  pluginAddress?: string;
}

export type FetchVotingSettingsReturnType = UseQueryResult<
  VotingSettings | null,
  unknown
>;
