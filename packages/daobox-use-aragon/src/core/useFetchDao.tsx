import { DaoDetails } from "@aragon/sdk-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

/**
 * Fetches the details of a DAO.
 *
 * @param {UseFetchDaoParams} params The DAO address or ENS name and the options for the react-query hook.
 * @returns {UseFetchDaoResult} The result of the react-query hook.
 */
export function useFetchDao(params: UseFetchDaoParams): UseFetchDaoResult {
  const { baseClient: client } = useAragon();
  const {
    daoAddressOrEns,
    enabled,
    queryKey: userQueryKey,
    ...options
  } = params;

  // The non-null assertion operator (!) is safe to use here because
  // the query is enabled only when both client and daoAddressOrEns are truthy values.
  // Therefore, when the queryFn executes, it is guaranteed that both client and daoAddressOrEns are defined.
  return useQuery<DaoDetails | null>({
    queryKey: createQueryKey("dao", [daoAddressOrEns], userQueryKey),
    queryFn: async () => client!.methods.getDao(daoAddressOrEns!),
    enabled: !!client && !!daoAddressOrEns && enabled,
    ...options,
  });
}
export interface UseFetchDaoParams extends QueryConfig<DaoDetails | null> {
  daoAddressOrEns?: string;
}

export type UseFetchDaoResult = UseQueryResult<DaoDetails | null, unknown>;
