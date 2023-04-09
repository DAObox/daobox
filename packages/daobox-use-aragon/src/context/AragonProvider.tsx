import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AragonSDKWrapper } from "./AragonContext";

export interface IpfsNode {
  url: string;
  headers: any;
}
export interface Config {
  ipfsNodes?: IpfsNode[] | undefined;
}

export interface AragonProviderProps {
  children: ReactNode;
  config?: Config;
}

export function AragonProvider({
  children,
  config,
}: AragonProviderProps): JSX.Element {
  return (
    <AragonSDKWrapper ipfsNodes={config?.ipfsNodes}>
      <QueryClientProvider client={new QueryClient()}>
        <>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      </QueryClientProvider>
    </AragonSDKWrapper>
  );
}
