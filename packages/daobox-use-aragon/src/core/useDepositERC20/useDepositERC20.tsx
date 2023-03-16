import { useState } from "react";
import { DaoDepositSteps, DepositParams } from "@aragon/sdk-client";
import { useMutation } from "react-query";

import {
  useAragon,
  validateData,
  DepositERC20Status,
  UseDepositERC20Options,
  UseDepositERC20ReturnType,
  depositParamsSchema,
} from "../../";

/**
 * Custom hook to deposit ERC20 tokens.
 * @param {DepositParams | undefined} depositParams - Optional deposit parameters.
 * @param {UseDepositERC20Options | undefined} options - Optional mutation options.
 * @returns {UseDepositERC20ReturnType} - An object containing the allowance, updateAllowanceTxid, depositTxid, depositStatus, and the mutation.
 */
export function useDepositERC20(
  depositParams?: DepositParams,
  options?: UseDepositERC20Options
): UseDepositERC20ReturnType {
  const [allowance, setAllowance] = useState<bigint | null>(null);
  const [updateAllowanceTxid, setUpdateAllowanceTxid] = useState<string | null>(
    null
  );
  const [depositTxid, setDepositTxid] = useState<string | null>(null);
  const [depositStatus, setDepositStatus] = useState<DepositERC20Status>(
    DepositERC20Status.IDLE
  );

  const { baseClient: client } = useAragon();

  const deposit = async (depositParams: DepositParams) => {
    if (!client) throw new Error("No Aragon Client found");
    validateData(depositParamsSchema, depositParams);
    try {
      const steps = client.methods.deposit(depositParams);
      setDepositStatus(DepositERC20Status.WAITING_FOR_SIGNER);
      for await (const step of steps) {
        switch (step.key) {
          case DaoDepositSteps.CHECKED_ALLOWANCE:
            setDepositStatus(DepositERC20Status.CHECKING_ALLOWANCE);
            setAllowance(step.allowance);
            break;
          case DaoDepositSteps.UPDATING_ALLOWANCE:
            setUpdateAllowanceTxid(step.txHash);
            setDepositStatus(DepositERC20Status.CONFIRMING_ALLOWANCE_UPDATE);
            break;
          case DaoDepositSteps.UPDATED_ALLOWANCE:
            setAllowance(step.allowance);
            break;
          case DaoDepositSteps.DEPOSITING:
            setDepositTxid(step.txHash);
            setDepositStatus(DepositERC20Status.CONFIRMING_DEPOSIT);
            break;
          case DaoDepositSteps.DONE:
            setDepositStatus(DepositERC20Status.SUCCESS);
            break;
        }
      }
    } catch (err) {
      setDepositStatus(DepositERC20Status.ERROR);
      console.error(err);
    }
  };

  return {
    allowance,
    updateAllowanceTxid,
    depositTxid,
    depositStatus,
    ...useMutation({
      mutationKey: ["depositEth", depositParams?.daoAddressOrEns],
      mutationFn: async () => await deposit(depositParams!),
      ...options,
    }),
  };
}
