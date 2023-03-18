import { Button, Flex, Loader, Stack } from "@mantine/core";
import { useDepositEth, TokenType } from "@daobox/use-aragon";
import { QueryType } from "../components/cards/DataCard";
import { ExampleCard } from "../components/cards/ExampleCard";
import * as React from "react";

export function UseDepositEth() {
  const { depositStatus, mutate, txHash, depositAmount } = useDepositEth({
    daoAddressOrEns: "0x13c6e4f17bbe606fed867a5cd6389a504724e805",
    type: TokenType.NATIVE,
    amount: 69n,
    onTransaction(txHash) {
      alert(`txHash: ${txHash}`);
    },
    onSuccess(data) {
      alert(`
      txHash: ${JSON.stringify(data.txHash?.toString())} 
      amount: ${JSON.stringify(data.deposited?.toString())}`);
    },
    onError(error) {
      alert(`error: ${error}`);
    },
  });

  return (
    <Stack align="center">
      <Button
        onClick={() => mutate?.()}
        disabled={["waitingForSigner", "confirming", "error"].includes(depositStatus)}
      >
        {["idle", "success"].includes(depositStatus) ? "Deposit ETH" : <Loader />}
      </Button>

      <ExampleCard name={"depositStatus"} data={depositStatus} />
      <ExampleCard name={"txHash"} data={txHash} />
      <ExampleCard name={"depositAmount"} data={depositAmount?.toString()} />
    </Stack>
  );
}
