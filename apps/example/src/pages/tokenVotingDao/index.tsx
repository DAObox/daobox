import { VotingMode, encodeTokenVotingPlugin, useNewDao } from "@daobox/use-aragon";
import Link from "next/link";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Terminal } from "../../components/Terminal";

const Index = () => {
  const [name, setName] = useState("");
  const { address } = useAccount();

  const plugin = encodeTokenVotingPlugin({
    votingSettings: {
      minDuration: 60 * 60 * 24 * 2, // seconds (minimum amount is 3600)
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
          address: address!, // address of the account to receive the newly minted tokens
          balance: BigInt(10), // amount of tokens that address should receive
        },
      ],
    },
    network: "goerli",
  });

  const { mutate, creationStatus, data, error } = useNewDao({
    daoMetadata: {
      name,
      description: "some description",
      links: [],
    },
    ensSubdomain: name,
    plugins: [plugin],
  });

  const handleNewDao = () => {
    mutate?.();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Token Voting Dao</h1>
      <Terminal>
        <h3>Enter dao name:</h3>
        <input
          className="input-box"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="test-dao"
        />
        <div>
          <button
            onClick={handleNewDao}
            disabled={["pinningMetadata", "creatingDao"].includes(creationStatus)}
          >
            Create
          </button>
        </div>
        <h3>Status: {creationStatus}</h3>
        <h3>
          data:
          <pre>{JSON.stringify(data, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)}</pre>
        </h3>
        {data && (
          <Link href={`https://app.aragon.org/#/daos/goerli/${data.daoAddress}/dashboard`}>
            Goto Dao
          </Link>
        )}
        {error && <h3>Error: {error?.message}</h3>}
      </Terminal>
    </div>
  );
};

export default Index;
