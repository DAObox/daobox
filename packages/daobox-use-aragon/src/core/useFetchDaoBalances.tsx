import { AssetBalance } from "@aragon/sdk-client";
import { DaoBalancesQueryParams } from "@aragon/sdk-client/dist/interfaces";
import { useQuery, UseQueryResult } from "react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

export function useFetchDaoBalances(
  params: UseFetchDaoBalancesParams
): UseFetchDaoBalancesResult {
  const { baseClient: client } = useAragon();
  const {
    daoAddressOrEns,
    limit,
    skip,
    direction,
    sortBy,
    enabled,
    queryKey: userQueryKey,
    ...options
  } = params;

  return useQuery<AssetBalance[] | null, unknown>({
    queryKey: createQueryKey("daoBalance", [daoAddressOrEns], userQueryKey),
    queryFn: async () =>
      client!.methods.getDaoBalances({
        daoAddressOrEns,
        limit,
        skip,
        direction,
        sortBy,
      }),
    enabled: !!client && !!daoAddressOrEns && enabled,
    ...options,
  });
}

export interface UseFetchDaoBalancesParams
  extends QueryConfig<AssetBalance[] | null>,
    Partial<DaoBalancesQueryParams> {}

export type UseFetchDaoBalancesResult = UseQueryResult<
  AssetBalance[] | null,
  unknown
>;
