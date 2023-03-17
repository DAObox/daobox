import { DaoDepositSteps } from "@aragon/sdk-client";
import { DepositParams } from "@aragon/sdk-client";
import { useState } from "react";
import { useMutation } from "react-query";

import {
  DepositEthStatus,
  UseDepositEthOptions,
  UseDepositEthReturnType,
  useAragon,
} from "../../";

/**
 * Hook for depositing ETH to an Aragon DAO.
 *
 * @param {DepositParams} depositParams - The deposit parameters.
 * @param {UseDepositEthOptions} options - The mutation options.
 * @returns {UseDepositEthReturnType} The deposit transaction ID, deposit status, and useMutation result.
 */
export function useDepositEth(
  depositParams?: DepositParams,
  options?: UseDepositEthOptions
): UseDepositEthReturnType {
  const [depositTxid, setDepositTxid] = useState<string | null>(null);
  const [depositStatus, setDepositStatus] = useState<DepositEthStatus>(
    DepositEthStatus.IDLE
  );

  const { baseClient: client } = useAragon();

  /**
   * Function for depositing ETH to an Aragon DAO.
   *
   * @param {DepositParams} depositParams - The deposit parameters.
   * @returns {Promise<void>}
   */
  const deposit = async (depositParams: DepositParams): Promise<void> => {
    if (!client) throw new Error("No Aragon Client found");
    // TODO: validateData(depositParamsSchema, depositParams);
    try {
      setDepositStatus(DepositEthStatus.WAITING_FOR_SIGNER);
      const steps = client.methods.deposit(depositParams);
      for await (const step of steps) {
        switch (step.key) {
          case DaoDepositSteps.DEPOSITING:
            setDepositTxid(step.txHash);
            setDepositStatus(DepositEthStatus.CONFIRMING);
            break;
          case DaoDepositSteps.DONE:
            setDepositStatus(DepositEthStatus.SUCCESS);
            break;
        }
      }
    } catch (err) {
      setDepositStatus(DepositEthStatus.ERROR);
      console.error(err);
    }
  };

  return {
    depositTxid,
    depositStatus,
    ...useMutation(
      // Zod validation is checking the depositParams
      ["depositEth", depositParams?.daoAddressOrEns],
      async () => await deposit(depositParams!),
      options
    ),
  };
}
