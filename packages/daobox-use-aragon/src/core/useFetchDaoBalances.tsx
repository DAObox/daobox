import { AssetBalance } from "@aragon/sdk-client";
import { DaoBalancesQueryParams } from "@aragon/sdk-client/dist/interfaces";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

import { useAragon } from "../context";

/**
 * @param {DaoBalancesQueryParams} [queryParams={}]
 * @param {UseFetchDaoBalancesOptions} [options]
 * @returns {UseFetchDaoBalancesResult}
 */
export function useFetchDaoBalances(
  queryParams: DaoBalancesQueryParams = {},
  options?: UseFetchDaoBalancesOptions
): UseFetchDaoBalancesResult {
  const { baseClient: client } = useAragon();

  return useQuery<AssetBalance[] | null>({
    queryKey: ["daoBalance", queryParams.daoAddressOrEns],
    queryFn: async () =>
      client!.methods.getDaoBalances({
        ...queryParams,
      }),
    enabled: !!client && !!queryParams.daoAddressOrEns,
    ...options,
  });
}

/**
 * @typedef {Object} UseFetchDaoBalancesOptions
 * @extends {UseQueryOptions<AssetBalance[] | null, unknown, AssetBalance[] | null, QueryKey>}
 */
export type UseFetchDaoBalancesOptions = UseQueryOptions<
  AssetBalance[] | null,
  unknown,
  AssetBalance[] | null,
  QueryKey
>;

/**
 * @typedef {Object} UseFetchDaoBalancesResult
 * @extends {UseQueryResult<AssetBalance[] | null, unknown>}
 */
export type UseFetchDaoBalancesResult = UseQueryResult<
  AssetBalance[] | null,
  unknown
>;
