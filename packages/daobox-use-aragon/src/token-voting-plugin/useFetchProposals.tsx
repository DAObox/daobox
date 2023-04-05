import {
  IProposalQueryParams,
  TokenVotingProposalListItem,
} from "@aragon/sdk-client";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

export function useFetchProposals(
  params: UseFetchProposalsParams
): FetchProposalsReturnType {
  const { tokenVotingClient: client } = useAragon();
  const {
    daoAddressOrEns,
    direction,
    sortBy,
    skip,
    limit,
    enabled = true,
    queryKey: userQueryKey,
    ...options
  } = params;

  return useQuery<TokenVotingProposalListItem[] | null, unknown>({
    queryKey: createQueryKey(
      "proposals",
      [daoAddressOrEns, limit],
      userQueryKey
    ),
    queryFn: async () =>
      client!.methods.getProposals({
        daoAddressOrEns,
        limit: limit || 10, // optional,
        sortBy,
        direction,
        skip,
      }),
    enabled: !!(client && daoAddressOrEns && enabled),
    ...options,
  });
}

export interface UseFetchProposalsParams
  extends QueryConfig<TokenVotingProposalListItem[] | null>,
    Partial<IProposalQueryParams> {}

export type FetchProposalsReturnType = UseQueryResult<
  TokenVotingProposalListItem[] | null,
  unknown
>;
