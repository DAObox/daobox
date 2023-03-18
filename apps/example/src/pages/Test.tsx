import { Button, Flex, Loader, Stack } from "@mantine/core";
import { useNewProposal } from "@daobox/use-aragon";

import { ExampleCard } from "../components/cards/ExampleCard";
import * as React from "react";
import { notifications } from "@mantine/notifications";

export function Test() {
  const { mutate, proposalStatus } = useNewProposal({
    title: "test" + Math.random(),
    summary: "some summary",
    description: "some description",
    resources: [
      {
        name: "some resource",
        url: "https://google.com",
      },
    ],
    pluginAddress: "0x8eaF189DBe3524667d25684645abA1c71c02d8dB",
    actions: [],
    onProposalTransaction(txHash) {
      notifications.show({
        title: "Creating Proposal",
        message: txHash,
      });
    },
    onSuccess(data) {
      notifications.show({
        title: "Success",
        message: data.proposalId,
      });
    },
    onError(error) {
      notifications.show({
        title: "Error",
        message: error.message,
      });
    },
  });

  return (
    <Stack align="center">
      <Button
        onClick={() => mutate?.()}
        disabled={["waitingForSigner", "confirming", "error"].includes(proposalStatus)}
      >
        {["idle", "success"].includes(proposalStatus) ? "Deposit ETH" : <Loader />}
      </Button>

      <ExampleCard name={"proposalStatus"} data={proposalStatus} />

      {/* <ExampleCard name={"depositAmount"} data={depositAmount?.toString()} /> */}
    </Stack>
  );
}
