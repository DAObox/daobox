import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

export function useFetchMembers(
  params: UseFetchMembersParams
): FetchMembersReturnType {
  const { tokenVotingClient: client, context } = useAragon();
  const { pluginAddress, enabled, queryKey: userQueryKey, ...options } = params;

  return useQuery<string[] | null, unknown>({
    queryKey: createQueryKey("members", [pluginAddress], userQueryKey),
    queryFn: async () => client!.methods.getMembers(pluginAddress!),
    enabled: !!client && enabled,
    refetchOnReconnect: true,
    onError: (error) => {
      console.error({ error, context });
    },
    ...options,
  });
}

export interface UseFetchMembersParams extends QueryConfig<string[] | null> {
  pluginAddress?: string;
}

export type FetchMembersReturnType = UseQueryResult<string[] | null, unknown>;
