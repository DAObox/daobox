import { DaoDetails } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { useAragon } from "../../context";
import { UseFetchDaoOptions, UseFetchDaoResult } from "./types";

/**
 * Fetches the details of a DAO.
 *
 * @param {string | undefined} daoAddressOrEns The DAO address or ENS name.
 * @param {UseFetchDaoOptions | undefined} options The options for the react-query hook.
 * @returns {UseFetchDaoResult} The result of the react-query hook.
 */
export function useFetchDao(
  daoAddressOrEns?: string | undefined,
  options?: UseFetchDaoOptions
): UseFetchDaoResult {
  const { baseClient: client } = useAragon();

  // The non-null assertion operator (!) is safe to use here because
  // the query is enabled only when both client and daoAddressOrEns are truthy values.
  // Therefore, when the queryFn executes, it is guaranteed that both client and daoAddressOrEns are defined.
  return useQuery<DaoDetails | null>({
    queryKey: ["dao", daoAddressOrEns],
    queryFn: async () => client!.methods.getDao(daoAddressOrEns!),
    enabled: !!client && !!daoAddressOrEns,
    refetchOnReconnect: true,
    ...options,
  });
}
