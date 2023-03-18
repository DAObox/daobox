import { Text } from "@mantine/core";
import { Stack } from "@mantine/core";
import { useFetchDao } from "@daobox/use-aragon";
import { DataCard, QueryType } from "../components/cards/DataCard";
import { ExampleCard } from "../components/cards/ExampleCard";
import * as React from "react";

export function UseFetchDao() {
  const demoCode = `import { useFetchDao } from '@daobox/use-aragon';

function Demo() {
  const dao = useFetchDao('0x13c6e4f17bbe606fed867a5cd6389a504724e805');

  if (dao.isLoading) return <Text>Loading...</Text>;
  if (dao.isError) return <Text>Error!!!</Text>;

  return(
    <>
      {dao.data && <pre>{JSON.stringify(dao.data, null,2)}</pre>}
    </>
  )
}`;
  const dao = useFetchDao("0xEd9e1E05e7b6425D86F54Ece05592b6F4fADDB09"); // 0x227c30c87109c949de3f4b229f825fc9166049e2

  return (
    <Stack spacing="xl" align="center">
      <Text size="xl" weight={500}>
        useFetchDao
      </Text>
      <ExampleCard name="Example" type={QueryType.query} data={demoCode} />
      <DataCard name="Response" data={dao} />
    </Stack>
  );
}
