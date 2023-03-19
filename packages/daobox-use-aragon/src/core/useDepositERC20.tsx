import { useState } from "react";
import { DaoDepositSteps } from "@aragon/sdk-client";
import { DepositErc20Params } from "@aragon/sdk-client/dist/interfaces";
import { useMutation } from "react-query";

import { useAragon } from "..";
import { MutationConfig } from "../types";

// TODO: add the return type to the docs
/**
 * A custom hook to handle depositing ERC20 tokens.
 * @function
 * @param {UseDepositErc20Params} params - Parameters for the useDepositERC20 hook.
 */
export function useDepositERC20({
  tokenAddress,
  amount,
  daoAddressOrEns,
  onError,
  onMutate,
  onSettled,
  onSuccess,
  onAllowanceTransaction,
  onDepositTransaction,
}: UseDepositErc20Params) {
  const [allowance, setAllowance] = useState<bigint | null>(null);
  const [updateAllowanceTxHash, setUpdateAllowanceTxHash] = useState<
    string | null
  >(null);
  const [depositAmount, setDepositAmount] = useState<bigint | null>(null);
  const [depositTxHash, setDepositTxHash] = useState<string | null>(null);
  const [depositStatus, setDepositStatus] = useState<DepositERC20Status>(
    DepositERC20Status.IDLE
  );

  const { baseClient: client } = useAragon();

  /**
   * A function to wrap the deposit process and handle its steps.
   * @async
   * @function
   * @param {UseDepositErc20Params} params - Parameters for the depositWrapper function.
   * @returns {Promise<DepositERC20ReturnData>} - A promise that resolves with the deposit return data.
   */
  async function depositWrapper({
    tokenAddress,
    amount,
    daoAddressOrEns,
    onAllowanceTransaction,
    onDepositTransaction,
  }: UseDepositErc20Params): Promise<DepositERC20ReturnData> {
    let allowance: bigint | null = null;
    let updateAllowanceTxHash: string | null = null;
    let depositAmount: bigint | null = null;
    let depositTxHash: string | null = null;
    try {
      setDepositStatus(DepositERC20Status.WAITING_FOR_SIGNER);
      const steps = client!.methods.deposit({
        tokenAddress,
        amount,
        daoAddressOrEns,
        type: TokenType.ERC20,
      });
      for await (const step of steps) {
        switch (step.key) {
          case DaoDepositSteps.CHECKED_ALLOWANCE:
            setDepositStatus(DepositERC20Status.CHECKING_ALLOWANCE);
            allowance = step.allowance;
            console.log("Allowance: ", step.allowance.toString());
            setAllowance(step.allowance);
            break;
          case DaoDepositSteps.UPDATING_ALLOWANCE:
            setDepositStatus(DepositERC20Status.CONFIRMING_ALLOWANCE_UPDATE);
            updateAllowanceTxHash = step.txHash;
            onAllowanceTransaction?.(step.txHash);
            setUpdateAllowanceTxHash(step.txHash);
            break;
          case DaoDepositSteps.UPDATED_ALLOWANCE:
            setAllowance(step.allowance);
            break;
          case DaoDepositSteps.DEPOSITING:
            setDepositStatus(DepositERC20Status.CONFIRMING_DEPOSIT);
            depositTxHash = step.txHash;
            onDepositTransaction?.(step.txHash);
            setDepositTxHash(step.txHash);
            break;
          case DaoDepositSteps.DONE:
            amount = step.amount;
            setDepositStatus(DepositERC20Status.SUCCESS);
            setDepositAmount(step.amount);
            break;
        }
      }
    } catch (err) {
      setDepositStatus(DepositERC20Status.ERROR);
      console.error(err);
      throw new Error("Error depositing ERC20 tokens");
    }
    return {
      allowance,
      updateAllowanceTxHash,
      depositTxHash,
      depositAmount,
    };
  }

  const mutation = useMutation<DepositERC20ReturnData, Error>({
    mutationKey: ["depositERC20", daoAddressOrEns, tokenAddress, amount],
    mutationFn: () =>
      depositWrapper({
        tokenAddress,
        amount,
        daoAddressOrEns,
        onAllowanceTransaction,
        onDepositTransaction,
      }),
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  return {
    ...mutation,
    allowance,
    updateAllowanceTxHash,
    depositTxHash,
    depositAmount,
    depositStatus,
  };
}

/**
 * @enum {string} DepositERC20Status - Enum representing the different statuses for depositing ERC20 tokens.
 */
export enum DepositERC20Status {
  IDLE = "idle",
  WAITING_FOR_SIGNER = "waitingForSigner",
  CHECKING_ALLOWANCE = "checkingAllowance",
  CONFIRMING_ALLOWANCE_UPDATE = "confirmingAllowanceUpdate",
  CONFIRMING_DEPOSIT = "confirmingDeposit",
  SUCCESS = "success",
  ERROR = "error",
}

/**
 * @typedef {Object} UseDepositErc20Params - Type representing the parameters for the useDepositErc20 hook.
 * @property {Function} [onAllowanceTransaction] - Callback function to handle allowance transaction event.
 * @property {Function} [onDepositTransaction] - Callback function to handle deposit transaction event.
 * @property {MutationConfig<DepositERC20ReturnData, Error>} config - Configuration object for the mutation.
 */
export type UseDepositErc20Params = Omit<DepositErc20Params, "type"> & {
  onAllowanceTransaction?: (txHash: string) => void;
  onDepositTransaction?: (txHash: string) => void;
} & MutationConfig<DepositERC20ReturnData, Error>;

/**
 * @typedef {Object} DepositERC20ReturnData - Type representing the return data for depositing ERC20 tokens.
 * @property {bigint | null} allowance - Allowance amount.
 * @property {string | null} updateAllowanceTxHash - Update allowance transaction hash.
 * @property {string | null} depositTxHash - Deposit transaction hash.
 * @property {bigint | null} depositAmount - Deposit amount.
 */
export type DepositERC20ReturnData = {
  allowance: bigint | null;
  updateAllowanceTxHash: string | null;
  depositTxHash: string | null;
  depositAmount: bigint | null;
};

enum TokenType {
  NATIVE = "native",
  ERC20 = "erc20",
  ERC721 = "erc721",
}
