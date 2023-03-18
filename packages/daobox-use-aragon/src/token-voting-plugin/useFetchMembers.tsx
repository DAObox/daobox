import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { useAragon } from "../context";

/**
 * Custom hook to fetch members of a voting plugin.
 * @param {string | undefined} pluginAddress - The plugin address to fetch members from.
 * @param {UseFetchMembersOptions | undefined} options - Optional query options.
 * @returns {FetchMembersReturnType} - A query result object containing the members array and other query metadata.
 */
export function useFetchMembers(
  pluginAddress?: string,
  options?: UseFetchMembersOptions
): FetchMembersReturnType {
  const { tokenVotingClient: client, context } = useAragon();

  return useQuery<string[] | null>({
    queryKey: ["members", pluginAddress],
    queryFn: async () => client!.methods.getMembers(pluginAddress!),
    enabled: !!client && !!pluginAddress,
    refetchOnReconnect: true,
    onError: (error) => {
      console.error({ error, context });
    },
    ...options,
  });
}

export type FetchMembersReturnType = UseQueryResult<string[] | null, unknown>;

export type UseFetchMembersOptions = UseQueryOptions<
  string[] | null,
  unknown,
  string[] | null,
  QueryKey
>;
