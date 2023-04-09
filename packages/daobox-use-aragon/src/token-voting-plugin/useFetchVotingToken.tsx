import { Erc20TokenDetails } from "@aragon/sdk-client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAragon } from "../context";
import { Erc721TokenDetails, QueryConfig } from "../types";
import { createQueryKey } from "../lib/setQueryKey";

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
