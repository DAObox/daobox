import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AragonSDKWrapper } from "./AragonContext";

export interface IpfsNode {
  url: string;
  headers: {
    "X-API-KEY": string;
  };
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
