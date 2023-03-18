import { ITransferQueryParams, Transfer } from "@aragon/sdk-client";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

import { useAragon } from "../context";

/**
 * @function useFetchTransfers
 * @param {ITransferQueryParams} [queryParams={}] - The query parameters for fetching transfers.
 * @param {UseQueryOptions<Transfer[]|null, unknown, Transfer[]|null, QueryKey>} [options] - The options for the useFetchTransfers query.
 * @returns {UseQueryResult<Transfer[]|null, unknown>} - The result of the transfers fetching query.
 */
export function useFetchTransfers(
  queryParams: ITransferQueryParams = {},
  options?: UseQueryOptions<
    Transfer[] | null,
    unknown,
    Transfer[] | null,
    QueryKey
  >
): UseQueryResult<Transfer[] | null, unknown> {
  const { baseClient: client } = useAragon();

  return useQuery<Transfer[] | null>({
    queryKey: ["daoTransfers", queryParams],
    queryFn: async () =>
      client!.methods.getDaoTransfers({
        ...queryParams,
      }),
    enabled: !!client && !!queryParams.daoAddressOrEns,

    ...options,
  });
}
