import { AppShell, Flex } from "@mantine/core";
import { HeaderMenu } from "./header";
import { Links } from "../../constants/links";
import { Outlet } from "react-router-dom";
import * as React from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const links = Links;

  return (
    <AppShell
      padding="md"
      header={<HeaderMenu links={links} />}
      styles={(theme: { colorScheme: string; colors: { dark: any[]; gray: any[] } }) => ({
        main: {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        {children}
      </Flex>
    </AppShell>
  );
}
