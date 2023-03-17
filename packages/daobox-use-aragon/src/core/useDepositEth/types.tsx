import { DepositParams } from "@aragon/sdk-client";
import { UseMutationOptions, UseMutateFunction } from "react-query";

export enum DepositEthStatus {
  IDLE = "idle",
  WAITING_FOR_SIGNER = "waitingForSigner",
  CONFIRMING = "confirming",
  SUCCESS = "success",
  ERROR = "error",
}

/**
 * Options for the useDepositEth hook.
 */
export type UseDepositEthOptions = UseMutationOptions<
  void,
  unknown,
  DepositParams,
  unknown
>;

/**
 * Return type of the useDepositEth hook.
 */
export type UseDepositEthReturnType = {
  depositTxid: string | null;
  depositStatus: DepositEthStatus;
  mutate: UseMutateFunction<void, unknown, DepositParams, unknown>;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
