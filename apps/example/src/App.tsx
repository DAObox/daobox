import { AppLayout } from "./components/layout";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { HeroTitle } from "./components/hero";

import {
  UseFetchDaos,
  UseFetchDao,
  NotFoundTitle,
  UseFetchTransfers,
  UseFetchDaoBalances,
  UseEstimateDeposit,
  UseNewProposal,
} from "./pages";
import { UseDepositEth } from "./pages/UseDepositEth";
import { UseDepositERC20 } from "./pages/UseDepositERC20";
import * as React from "react";
import { UseNewDao } from "./pages/UseNewDao";
import { UseFetchProposals } from "./pages/UseFetchProposals";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HeroTitle />} />
          <Route path="use-fetch-dao" element={<UseFetchDao />} />
          <Route path="use-fetch-daos" element={<UseFetchDaos />} />
          <Route path="use-fetch-transfers" element={<UseFetchTransfers />} />
          <Route path="use-fetch-balances" element={<UseFetchDaoBalances />} />
          <Route path="use-estimate-deposit" element={<UseEstimateDeposit />} />
          <Route path="use-deposit-eth" element={<UseDepositEth />} />
          <Route path="use-deposit-erc20" element={<UseDepositERC20 />} />
          <Route path="test" element={<UseFetchProposals />} />
          <Route path="*" element={<NotFoundTitle />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
