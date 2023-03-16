import { UseMutationOptions, UseMutateFunction } from "react-query";

export enum DepositERC20Status {
  IDLE = "idle",
  WAITING_FOR_SIGNER = "waitingForSigner",
  CHECKING_ALLOWANCE = "checkingAllowance",
  CONFIRMING_ALLOWANCE_UPDATE = "confirmingAllowanceUpdate",
  CONFIRMING_DEPOSIT = "confirmingDeposit",
  SUCCESS = "success",
  ERROR = "error",
}

export interface DepositERC20State {
  allowance: bigint | null;
  updateAllowanceTxid: string | null;
  depositTxid: string | null;
  depositStatus: DepositERC20Status;
}

export type UseDepositERC20Options = UseMutationOptions<
  void,
  unknown,
  void,
  unknown
>;

export type UseDepositERC20ReturnType = {
  allowance: bigint | null;
  updateAllowanceTxid: string | null;
  depositTxid: string | null;
  depositStatus: DepositERC20Status;
  mutate: UseMutateFunction<void, unknown, void, unknown>;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
};
