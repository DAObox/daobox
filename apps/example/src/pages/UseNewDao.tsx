import { Button, Flex, Loader, Stack } from "@mantine/core";
import {
  ITokenVotingPluginInstall,
  NewDaoParams,
  useNewTokenVotingDao,
  VotingMode,
} from "@daobox/use-aragon";

import { ExampleCard } from "../components/cards/ExampleCard";
import * as React from "react";
import { notifications } from "@mantine/notifications";

const newDaoParams: Omit<NewDaoParams, "plugins"> = {
  daoMetadata: {
    name: "Failure DAO",
    description: "this dao will fail",
    links: [],
  },
  daoUri: "https://BIG-FAIL.com",
  ensSubdomain: "falure-dao",
  onSuccess,
  onError,
  onCreateDaoTransaction: onTransaction,
};

const pluginSettings: ITokenVotingPluginInstall = {
  votingSettings: {
    minDuration: 60 * 60 * 24 * 2, // seconds
    minParticipation: 0.25, // 25%
    supportThreshold: 0.5, // 50%
    minProposerVotingPower: BigInt("5000"), // default 0
    votingMode: VotingMode.EARLY_EXECUTION, // default is STANDARD. other options: EARLY_EXECUTION, VOTE_REPLACEMENT
  },
  newToken: {
    name: "Token", // the name of your token
    symbol: "TOK", // the symbol for your token. shouldn't be more than 5 letters
    decimals: 18, // the number of decimals your token uses
    balances: [
      {
        // Defines the initial balances of the new token
        address: "0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a", // address of the account to receive the newly minted tokens
        balance: BigInt(10), // amount of tokens that address should receive
      },
    ],
  },
};

export function UseNewDao() {
  const { mutate, creationStatus } = useNewTokenVotingDao(newDaoParams, pluginSettings);

  return (
    <Stack>
      <Button
        onClick={() => mutate?.()}
        disabled={!["idle", "success", "error"].includes(creationStatus)}
        loading={!["idle", "success", "error"].includes(creationStatus)}
      >
        {["idle", "success"].includes(creationStatus) ? "New DAO" : creationStatus}
      </Button>
      <ExampleCard name={"creationStatus"} data={creationStatus} />
    </Stack>
  );
}

function onSuccess(data: any) {
  notifications.show({
    title: "Success",
    message: JSON.stringify(data, null, 2),
  });
  console.log(data);
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
