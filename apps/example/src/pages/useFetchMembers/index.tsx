import React from "react";
import { useFetchDao, useFetchMembers } from "@daobox/use-aragon";

const index = () => {
  const { data, isLoading, isError, status, refetch } = useFetchMembers({
    pluginAddress: "0x8eaf189dbe3524667d25684645aba1c71c02d8db",
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error!</div>;

  return (
    <div style={{ textAlign: "left" }}>
      <h1>useFetchMembers</h1>
      <p>Status: {status}</p>

      <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default index;
