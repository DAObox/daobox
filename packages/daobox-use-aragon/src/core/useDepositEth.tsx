import { DaoDepositSteps } from "@aragon/sdk-client";

import { useState } from "react";
import { useMutation } from "react-query";
import { useAragon } from "../context";
import { DepositEthParams, MutationConfig, TokenType } from "../types";

/**
 * Custom hook for depositing Ethereum into a DAO.
 *
 * @param amount The amount of Ethereum to deposit.
 * @param daoAddressOrEns The address or ENS name of the DAO to deposit Ethereum to.
 * @param onError Callback function that fires if the mutation encounters an error.
 * @param onMutate Callback function that fires before the mutation function and is passed the same variables the mutation function would receive.
 * @param onSettled Callback function that fires when the mutation is either successfully fetched or encounters an error.
 * @param onSuccess Callback function that fires when the mutation is successful and will be passed the mutation's result.
 * @param onTransaction Callback function that fires when the transaction hash is available.
 * @returns An object containing the mutation object, deposit status, transaction hash, and deposit amount.
 */
export function useDepositEth({
  amount,
  daoAddressOrEns,
  onError,
  onMutate,
  onSettled,
  onSuccess,
  onTransaction,
}: UseDepositEthParams) {
  const { baseClient: client } = useAragon();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<bigint | null>(null);
  const [depositStatus, setDepositStatus] = useState<DepositEthStatus>(
    DepositEthStatus.IDLE
  );
  /**
   * Wrapper function for depositing Ether which handles the async iterator steps.
   *
   * @param {DepositEthParams} depositParams - The deposit parameters.
   * @param {(txHash: string) => void} [onTransaction] - Optional callback function to be called when a transaction is created.
   * @returns {Promise<DepositReturnData>} - A promise that resolves to an object containing the transaction hash and the deposited amount.
   */
  async function depositWrapper(
    depositParams: Omit<DepositEthParams, "type">,
    onTransaction?: (txHash: string) => void
  ): Promise<DepositReturnData> {
    let deposited: bigint | null = null;
    let txHash: string | null = null;
    try {
      // Set the deposit status to waiting for the signer.
      setDepositStatus(DepositEthStatus.WAITING_FOR_SIGNER);

      // Call the Aragon SDK client deposit method with the provided deposit parameters.
      const steps = client!.methods.deposit({
        ...depositParams,
        type: TokenType.NATIVE,
      });

      // Iterate through the async iterator steps returned by the deposit method.
      for await (const step of steps) {
        switch (step.key) {
          case DaoDepositSteps.DEPOSITING:
            // Call the onTransaction callback if provided and update the deposit status and transaction hash state.
            onTransaction?.(step.txHash);
            setTxHash(step.txHash);
            txHash = step.txHash;
            setDepositStatus(DepositEthStatus.CONFIRMING);
            break;
          case DaoDepositSteps.DONE:
            // Set the deposit status to success and update the deposit amount state.
            setDepositStatus(DepositEthStatus.SUCCESS);
            setDepositAmount(step.amount);
            deposited = step.amount;
            break;
        }
      }
    } catch (error) {
      // Set the deposit status to error if an exception is thrown.
      setDepositStatus(DepositEthStatus.ERROR);
      throw new Error("Error depositing ETH");
    }

    // Return the transaction hash and deposited amount.
    return { txHash, deposited };
  }

  // Initialize the useMutation hook with the depositWrapper function and the provided configuration.
  const mutation = useMutation({
    mutationKey: ["depositEth", daoAddressOrEns, amount],
    mutationFn: () =>
      depositWrapper({ amount, daoAddressOrEns }, onTransaction),
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  return {
    ...mutation,
    depositStatus,
    txHash,
    depositAmount,
  };
}

/**
 * An enum that represents the possible states of a deposit process.
 * @enum {string}
 */
export enum DepositEthStatus {
  IDLE = "idle",
  WAITING_FOR_SIGNER = "waitingForSigner",
  CONFIRMING = "confirming",
  SUCCESS = "success",
  ERROR = "error",
}

/**
 * The return data of a deposit operation.
 * @typedef {Object} DepositReturnData
 * @property {?string} txHash - The hash of the transaction that was sent to the blockchain, or null if the deposit failed.
 * @property {?bigint} deposited - The amount of tokens that were deposited, or null if the deposit failed.
 */
export type DepositReturnData = {
  txHash: string | null;
  deposited: bigint | null;
};

type UseDepositEthParams = MutationConfig<DepositReturnData, Error> & {
  onTransaction?: (txHash: string) => void;
  daoAddressOrEns: string;
  amount: bigint;
};
