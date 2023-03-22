import React from "react";
import { useFetchDao } from "@daobox/use-aragon";
import { LinkButton } from "../../components/LinkButton";

const index = () => {
  const { data, isLoading, isError, status, refetch } = useFetchDao({
    daoAddressOrEns: "box.dao.eth",
    queryKey: ["and", "another", "one"],
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error!</div>;

  return (
    <div style={{ textAlign: "left" }}>
      <h1>useFetchDao</h1>
      <p>Status: {status}</p>

      <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => refetch()}>Reload</button>
    </div>
  );
};

export default index;
