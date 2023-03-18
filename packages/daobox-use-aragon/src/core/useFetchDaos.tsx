import { DaoListItem, IDaoQueryParams } from "@aragon/sdk-client";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { useAragon } from "../context";

/**
 * @function useFetchDaos
 * @param {IDaoQueryParams} queryParams - The query parameters for fetching DAOs.
 * @param {UseFetchDaosOptions} [options] - The options for the useFetchDaos query.
 * @returns {UseFetchDaosResults} - The result of the DAOs fetching query.
 */
export function useFetchDaos(
  queryParams: IDaoQueryParams,
  options?: UseFetchDaosOptions
): UseFetchDaosResults {
  const { baseClient: client } = useAragon();

  return useQuery<DaoListItem[] | null, unknown>({
    queryKey: ["dao", queryParams],
    queryFn: async () =>
      client!.methods.getDaos({
        ...queryParams,
      }),
    enabled: !!client,
    ...options,
  });
}

/**
 * @typedef {object} UseFetchDaosOptions
 * @extends {Omit<UseQueryOptions<DaoListItem[]|null, unknown, DaoListItem[]|null>, "queryKey"|"queryFn">}
 */
export type UseFetchDaosOptions = Omit<
  UseQueryOptions<DaoListItem[] | null, unknown, DaoListItem[] | null>,
  "queryKey" | "queryFn"
>;

/**
 * @typedef {object} UseFetchDaosResults
 * @extends {UseQueryResult<DaoListItem[]|null, unknown>}
 */
export type UseFetchDaosResults = UseQueryResult<DaoListItem[] | null, unknown>;
