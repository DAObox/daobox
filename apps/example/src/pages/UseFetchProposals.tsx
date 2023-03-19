import { Text } from "@mantine/core";
import { Stack } from "@mantine/core";
import { useFetchDao, useFetchProposals } from "@daobox/use-aragon";
import { DataCard, QueryType } from "../components/cards/DataCard";
import { ExampleCard } from "../components/cards/ExampleCard";
import * as React from "react";

export function UseFetchProposals() {
  const dao = useFetchProposals({
    daoAddressOrEns: "0x6f07aa7af27e0e06a08a1a17e04c4b0eb11300ab",
  }); // 0x227c30c87109c949de3f4b229f825fc9166049e2

  return (
    <Stack spacing="xl" align="center">
      <Text size="xl" weight={500}>
        useFetchProposal
      </Text>
      <DataCard name="Response" data={dao} />
    </Stack>
  );
}
