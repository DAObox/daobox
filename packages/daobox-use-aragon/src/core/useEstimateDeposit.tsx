import { GasFeeEstimation } from "@aragon/sdk-client";
import { DepositParams } from "@aragon/sdk-client";
import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";

import { useAragon } from "../context";
import useConnectedWallet from "../context/useConnectedWallet";

/**
 * @function useEstimateDeposit
 * @param {DepositParams} depositParams - The parameters for depositing tokens.
 * @param {UseEstimateDepositEthOptions} [options] - The options for the useEstimateDeposit query.
 * @returns {UseQueryResult<GasFeeEstimation|null>} - The result of the gas fee estimation query.
 */
export function useEstimateDeposit(
  depositParams: DepositParams,
  options?: UseEstimateDepositEthOptions
): UseQueryResult<GasFeeEstimation | null> {
  const { baseClient: client } = useAragon();
  const { signer } = useConnectedWallet();

  return useQuery<GasFeeEstimation | null>({
    queryKey: ["estimateDepositEth", depositParams.daoAddressOrEns],
    queryFn: async () => client!.estimation.deposit(depositParams),
    enabled: !!(
      signer &&
      client &&
      depositParams.daoAddressOrEns &&
      Object.values(depositParams).every(Boolean)
    ),
    ...options,
  });
}

/**
 * @typedef {object} UseEstimateDepositEthOptions
 * @extends {UseQueryOptions<GasFeeEstimation|null, unknown, GasFeeEstimation|null, QueryKey>}
 */
export type UseEstimateDepositEthOptions = UseQueryOptions<
  GasFeeEstimation | null,
  unknown,
  GasFeeEstimation | null,
  QueryKey
>;
