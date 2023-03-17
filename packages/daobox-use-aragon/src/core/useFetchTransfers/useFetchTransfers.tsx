import { ITransferQueryParams, Transfer } from "@aragon/sdk-client";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";

import { useAragon } from "../../context";

export function useFetchTransfers(
  queryParams: ITransferQueryParams = {},
  options?: UseQueryOptions<
    Transfer[] | null,
    unknown,
    Transfer[] | null,
    QueryKey
  >
) {
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
