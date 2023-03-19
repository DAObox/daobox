import * as React from "react";
import { Text, Card, Group, Badge } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { QueryType } from "./DataCard";

interface ExampleCardProps {
  name: string;
  type?: QueryType;
  data?: any;
}
export function ExampleCard({ name, type, data }: ExampleCardProps) {
  return (
    <Card shadow="sm" padding="sm" radius="md" withBorder style={{ width: "700px", whiteSpace: "pre-wrap" }}>
      <Group position="apart">
        <Text weight={500}>{name}</Text>
        {type && <Badge color="green">{type}</Badge>}
      </Group>
      {data && <Prism language="tsx">{data}</Prism>}
    </Card>
  );
}
