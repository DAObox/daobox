import { Erc20TokenDetails } from "@aragon/sdk-client";
import { Erc721TokenDetails } from "@aragon/sdk-client/dist/tokenVoting/interfaces";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { useAragon } from "../context";

/**
 * Custom hook to fetch the voting token for a given plugin address.
 * @param {string | undefined} pluginAddress - Optional plugin address.
 * @param {UseFetchVotingTokenOptions | undefined} options - Optional query options.
 * @returns {FetchVotingTokenReturnType} - A query result object containing the voting token details and other query metadata.
 */
export function useFetchVotingToken(
  pluginAddress?: string,
  options?: UseFetchVotingTokenOptions
): FetchVotingTokenReturnType {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<Erc20TokenDetails | Erc721TokenDetails | null>({
    queryKey: ["votingToken", pluginAddress],
    queryFn: async () => client!.methods.getToken(pluginAddress!),
    enabled: !!client && !!pluginAddress,
    ...options,
  });
}

export type FetchVotingTokenReturnType = UseQueryResult<
  Erc20TokenDetails | Erc721TokenDetails | null,
  unknown
>;

export type UseFetchVotingTokenOptions = UseQueryOptions<
  Erc20TokenDetails | Erc721TokenDetails | null,
  unknown,
  Erc20TokenDetails | Erc721TokenDetails | null,
  QueryKey
>;
