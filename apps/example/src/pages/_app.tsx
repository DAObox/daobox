import { ConnectKitButton, ConnectKitProvider } from "connectkit";
import type { AppProps } from "next/app";
import { AragonProvider } from "@daobox/use-aragon";

import * as React from "react";
import { WagmiConfig } from "wagmi";
import "../index.css";
import { client } from "../wagmi";
import { LinkButton } from "../components/LinkButton";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">
        <AragonProvider>
          {mounted && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </AragonProvider>
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div>
      <header className="header">
        <div className="link-button">
          <LinkButton label="Home" link="/" />
        </div>
        <div className="connect-button">
          <ConnectKitButton />
        </div>
      </header>

      {children}
    </div>
  );
};
