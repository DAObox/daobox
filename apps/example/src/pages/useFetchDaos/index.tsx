import React from "react";
import { useFetchDaos } from "@daobox/use-aragon";
import { LinkButton } from "../../components/LinkButton";

const index = () => {
  const { data: daos, isLoading, isError, status } = useFetchDaos({});

  if (isLoading || isError) return <div>{status}</div>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>useFetchDaos</h1>
      {daos?.map((dao) => (
        <div key={dao.address}>{dao.address}</div>
      ))}
      <button onClick={() => window.location.reload()}>Reload</button>
    </div>
  );
};

export default index;
