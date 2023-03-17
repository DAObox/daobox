import { DaoListItem, IDaoQueryParams } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { UseFetchDaosOptions, UseFetchDaosResults } from ".";
import { useAragon } from "../../context";

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
