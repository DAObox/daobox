import { GasFeeEstimation } from "@aragon/sdk-client";
import { UseQueryOptions, QueryKey } from "react-query";

export type UseEstimateDepositEthOptions = UseQueryOptions<
  GasFeeEstimation | null,
  unknown,
  GasFeeEstimation | null,
  QueryKey
>;
