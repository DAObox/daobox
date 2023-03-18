import { Button, Flex, Loader, Stack } from "@mantine/core";
import { useDepositERC20, TokenType } from "@daobox/use-aragon";

import { ExampleCard } from "../components/cards/ExampleCard";
import * as React from "react";
import { notifications } from "@mantine/notifications";

export function UseDepositERC20() {
  const { mutate, allowance, depositAmount, depositStatus, depositTxHash, updateAllowanceTxHash } =
    useDepositERC20({
      daoAddressOrEns: "0x13c6e4f17bbe606fed867a5cd6389a504724e805",
      amount: 888n,
      tokenAddress: "0x74445e9F3699CDEbf6FbcEF660c573bda2bBb68C",
      onAllowanceTransaction(txHash) {
        notifications.show({
          title: "allowance txHash",
          message: txHash,
        });
      },
      onDepositTransaction(txHash) {
        notifications.show({
          title: "deposit txHash",
          message: txHash,
        });
      },
      onSuccess(data) {
        notifications.show({
          title: "success",
          message: `
          allowance txHash: ${JSON.stringify(data.updateAllowanceTxHash?.toString())} 
          deposit txHash: ${JSON.stringify(data.depositTxHash?.toString())} 
          amount: ${JSON.stringify(data.depositAmount?.toString())}`,
        });
      },
      onError(error, variables, context) {
        notifications.show({
          title: "error",
          message: error.message,
        });
        console.error({ error: { error, variables, context } });
      },
    });

  return (
    <Stack spacing="xl" align="center">
      <Button onClick={() => mutate?.()} disabled={!["idle", "success"].includes(depositStatus)}>
        {["idle", "success", "error"].includes(depositStatus) ? "Deposit ERC20" : <Loader />}
      </Button>

      <ExampleCard name="status" data={depositStatus} />
      <ExampleCard name="allowance" data={allowance?.toString()} />
      <ExampleCard name="depositAmount" data={depositAmount?.toString()} />
      <ExampleCard name="updateAllowanceTxHash" data={updateAllowanceTxHash} />
      <ExampleCard name="depositTxHash" data={depositTxHash} />
    </Stack>
  );
}
