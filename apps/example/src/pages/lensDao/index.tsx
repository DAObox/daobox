import { encodeLensVotingPlugin, useNewDao } from "@daobox/use-aragon";
import Link from "next/link";
import React, { useState } from "react";

import { Terminal } from "../../components/Terminal";

const votingToken = "0xD3596C81FcAb699192dc79C8e25f1362E3dFf89A";

const Index = () => {
  const [name, setName] = useState("");

  const { mutate, creationStatus, data, error } = useNewDao({
    daoMetadata: {
      name,
      description: "some description",
      links: [],
    },
    ensSubdomain: name,
    plugins: [
      encodeLensVotingPlugin({
        lensFollowNFT: votingToken,
        network: "polygon",
      }),
    ],
  });

  const handleNewDao = () => {
    mutate?.();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Lens Dao</h1>
      <h3 style={{ textAlign: "center" }}>USE ON POLYGON or MUMBAI</h3>
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

export function encodeRatio(ratio: number, digits: number): number {
  if (ratio < 0 || ratio > 1) {
    throw new Error("The ratio value should range between 0 and 1");
  } else if (!Number.isInteger(digits) || digits < 1 || digits > 15) {
    throw new Error("The number of digits should range between 1 and 15");
  }
  return Math.round(ratio * 10 ** digits);
}
