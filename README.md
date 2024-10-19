# 🏗 DAOBox

<h4 align="center">
  <a href="https://docs.daobox.app">Documentation</a>
| <a href="https://daobox.app">Website</a>
</h4>

🧪 DAO Box is an open-source, up-to-date starter kit for building production-ready "Fat dApps". It's optimized for quickly developing DeFi products with a true Web2 user experience.

⚙️ Built using NextJS, ShadCN, SimpleKit, Foundry, Wagmi, Viem, Typescript, and powered by Bun.

> Note: This project is a fork of Scaffold-ETH 2, but has been extended and modified to provide a comprehensive starter kit for building advanced decentralized applications.

- ✅ Contract Hot Reload: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 Custom hooks: Collection of React hooks wrapping around wagmi to simplify interactions with smart contracts with TypeScript autocompletion.
- 🧱 Components: Collection of common web3 components to quickly build your frontend.
- 🔥 Burner Wallet & Local Faucet: Quickly test your application with a burner wallet and local faucet.
- 🔐 Integration with Wallet Providers: Connect to different wallet providers and interact with the Ethereum network.
- 🗄️ Database Integration: Includes a database for data persistence.
- 👥 User Management System: Manage user accounts and profiles.
- 🔑 Authentication with SIWE: Secure authentication using Sign-In with Ethereum (SIWE).
- 💼 Smart Accounts for Users: Enable smart contract-based accounts for users.
- 🛡️ Passkeys, Session Keys, and Social Recovery: Provides a true Web2 user experience with enhanced security features.
- ⚡ Optimized for DeFi Products: Quickly build and deploy DeFi applications.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with DAOBox, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
bun install
```

2. Run a local network in the first terminal:

```
bun chain
```

This command starts a local Ethereum network using Foundry. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/foundry/foundry.toml`.

3. On a second terminal, deploy the test contract:

```
bun run deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/foundry/contracts` and can be modified to suit your needs. The `bun deploy` command uses the deploy script located in `packages/foundry/script` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
bun start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `bun foundry:test`

- Edit your smart contract `YourContract.sol` in `packages/foundry/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/foundry/script`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with DAOBox.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to DAOBox

We welcome contributions to DAOBox!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to DAOBox.
