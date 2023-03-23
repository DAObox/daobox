import { ITransferQueryParams, Transfer } from "@aragon/sdk-client";
import { useQuery, UseQueryResult } from "react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

export function useFetchTransfers(
  params: UseFetchTransfersParams
): UseFetchTransfersResult {
  const { baseClient: client } = useAragon();
  const {
    daoAddressOrEns,
    direction,
    limit,
    skip,
    sortBy,
    enabled,
    queryKey: userQueryKey,
    ...options
  } = params;

  return useQuery<Transfer[] | null, unknown>({
    queryKey: createQueryKey(
      "daoTransfers",
      [daoAddressOrEns, sortBy],
      userQueryKey
    ),
    queryFn: async () =>
      client!.methods.getDaoTransfers({
        daoAddressOrEns,
        limit,
        skip,
        direction,
      }),
    enabled: !!client && !!daoAddressOrEns && enabled,
    ...options,
  });
}

export interface UseFetchTransfersParams
  extends QueryConfig<Transfer[] | null>,
    Partial<ITransferQueryParams> {}

export type UseFetchTransfersResult = UseQueryResult<
  Transfer[] | null,
  unknown
>;
