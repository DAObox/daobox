import { DaoListItem, IDaoQueryParams } from "@aragon/sdk-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

export function useFetchDaos(
  params: UseFetchDaosParams = {}
): UseFetchDaosResults {
  const { baseClient: client } = useAragon();
  const {
    enabled,
    queryKey: userQueryKey,
    sortBy,
    direction,
    limit,
    skip,
    ...options
  } = params;

  return useQuery<DaoListItem[] | null, unknown>({
    queryKey: createQueryKey("daos", [params], userQueryKey),
    queryFn: async () =>
      client!.methods.getDaos({
        limit: limit || 10, // optional,
        sortBy,
        direction,
        skip,
      }),
    enabled: !!client && enabled,
    keepPreviousData: true,
    ...options,
  });
}

export interface UseFetchDaosParams
  extends Partial<IDaoQueryParams>,
    QueryConfig<DaoListItem[] | null> {}

export type UseFetchDaosResults = UseQueryResult<DaoListItem[] | null, unknown>;
