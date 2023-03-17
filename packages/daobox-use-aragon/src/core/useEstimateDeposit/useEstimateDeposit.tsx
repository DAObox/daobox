import { GasFeeEstimation } from "@aragon/sdk-client";
import { DepositParams } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { UseEstimateDepositEthOptions } from ".";

import { useAragon } from "../../context";
import useConnectedWallet from "../../context/useConnectedWallet";

export function useEstimateDeposit(
  depositParams: DepositParams,
  options?: UseEstimateDepositEthOptions
) {
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
