import { encodePluginInstallItem, useNewDao } from "@daobox/use-aragon";
import Link from "next/link";
import React, { useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { Terminal } from "../../components/Terminal";
import { activeContractsList } from "@aragon/osx-ethers";

const Index = () => {
  const [name, setName] = useState("");
  const { address } = useAccount();
  const { chain } = useNetwork();

  const chainName = chain?.name.toLowerCase() as string;

  const { mutate, creationStatus, data, error } = useNewDao({
    daoMetadata: {
      name,
      description: "some description",
      links: [],
    },
    ensSubdomain: name,
    plugins: [
      encodePluginInstallItem({
        types: ["address admin"],
        parameters: [address],
        repoAddress:
          activeContractsList[chainName as keyof typeof activeContractsList]["admin-repo"],
      }),
    ],
  });

  const handleNewDao = () => {
    mutate?.();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Admin Dao</h1>
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
          <Link href={`https://app.aragon.org/#/daos/${chainName}/${data.daoAddress}/dashboard`}>
            Goto Dao
          </Link>
        )}
        {error && <h3>Error: {error?.message}</h3>}
      </Terminal>
    </div>
  );
};

export default Index;
