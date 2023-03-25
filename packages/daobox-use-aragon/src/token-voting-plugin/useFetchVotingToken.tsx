import { Erc20TokenDetails, TokenType } from "@aragon/sdk-client";
import { TokenBaseDetails } from "@aragon/sdk-client/dist/tokenVoting/interfaces";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

export function useFetchVotingToken(
  params: UseFetchVotingTokenParams
): FetchVotingTokenReturnType {
  const { tokenVotingClient: client } = useAragon();
  const { pluginAddress, enabled, queryKey: userQueryKey, ...options } = params;

  return useQuery<Erc20TokenDetails | Erc721TokenDetails | null, unknown>({
    queryKey: createQueryKey("votingToken", [pluginAddress], userQueryKey),
    queryFn: async () => client!.methods.getToken(pluginAddress!),
    enabled: !!client && !!pluginAddress && enabled,
    ...options,
  });
}

export interface UseFetchVotingTokenParams
  extends QueryConfig<Erc20TokenDetails | Erc721TokenDetails | null> {
  pluginAddress?: string;
}

export type FetchVotingTokenReturnType = UseQueryResult<
  Erc20TokenDetails | Erc721TokenDetails | null,
  unknown
>;

export declare type Erc721TokenDetails = TokenBaseDetails & {
  type: TokenType.ERC721;
};
