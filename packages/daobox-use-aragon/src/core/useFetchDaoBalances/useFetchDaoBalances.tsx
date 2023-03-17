import { AssetBalance } from "@aragon/sdk-client";
import { DaoBalancesQueryParams } from "@aragon/sdk-client/dist/interfaces";
import { useQuery } from "react-query";
import { UseFetchDaoBalancesOptions, UseFetchDaoBalancesResult } from ".";

import { useAragon } from "../../context";

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
