import { DepositParams, GasFeeEstimation, TokenType } from "@aragon/sdk-client";

import { useQuery, UseQueryResult } from "react-query";

import { useAragon } from "../context";
import { createQueryKey } from "../lib/setQueryKey";
import { QueryConfig } from "../types";

/**
 * @function useEstimateDeposit
 * @param {UseEstimateDepositOptions} [params] - The options for the useEstimateDeposit query.
 * @returns {UseQueryResult<GasFeeEstimation|null>} - The result of the gas fee estimation query.
 */
export function useEstimateDeposit(
  params: UseEstimateDepositOptions
): UseQueryResult<GasFeeEstimation | null> {
  const { baseClient: client } = useAragon();
  const {
    daoAddressOrEns,
    amount,
    type,
    tokenAddress,
    enabled = true,
    queryKey,
    ...options
  } = params;

  // The non-null assertion operator (!) is safe to use here because
  // the query is enabled only when all values are truthy.
  return useQuery<GasFeeEstimation | null>({
    queryKey: createQueryKey(
      "estimateDepositEth",
      [daoAddressOrEns, amount?.toString(), type, tokenAddress],
      queryKey
    ),
    queryFn: async () =>
      client!.estimation.deposit({
        daoAddressOrEns: daoAddressOrEns!,
        amount: amount!,
        type: type!,
        tokenAddress: tokenAddress!,
      }),
    enabled: !!(
      client &&
      daoAddressOrEns &&
      amount &&
      type &&
      !(type === TokenType.ERC20 && !tokenAddress) &&
      enabled
    ),
    ...options,
  });
}

export type UseEstimateDepositOptions = Partial<DepositParams> & {
  tokenAddress?: string | undefined;
} & QueryConfig<GasFeeEstimation | null>;
