import { Button, Flex, Loader, Stack } from "@mantine/core";
import { useNewProposal } from "@daobox/use-aragon";

import { ExampleCard } from "../components/cards/ExampleCard";
import * as React from "react";
import { notifications } from "@mantine/notifications";

const newPropsal = {
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
};

export function UseNewProposal() {
  const { mutate, proposalStatus } = useNewProposal({
    ...newPropsal,
    onProposalTransaction: onTransaction,
    onSuccess,
    onError,
  });

  return (
    <Stack>
      <Button
        onClick={() => mutate?.()}
        disabled={!["idle", "success", "error"].includes(proposalStatus)}
        loading={!["idle", "success", "error"].includes(proposalStatus)}
      >
        {["idle", "success"].includes(proposalStatus) ? "New Proposal" : proposalStatus}
      </Button>
      <ExampleCard name={"proposalStatus"} data={proposalStatus} />
    </Stack>
  );
}

function onSuccess(data: any) {
  notifications.show({
    title: "Success",
    message: JSON.stringify(data, null, 2),
  });
}

function onTransaction(message: string) {
  notifications.show({
    title: "Tx Hash",
    message,
  });
}

function onError(error: Error) {
  notifications.show({
    title: "Error",
    message: error.message,
  });
}
