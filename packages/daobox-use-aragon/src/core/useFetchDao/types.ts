import { DaoDetails } from "@aragon/sdk-client";
import { UseQueryOptions, QueryKey, UseQueryResult } from "react-query";

export type UseFetchDaoOptions = UseQueryOptions<
  DaoDetails | null,
  unknown,
  DaoDetails | null,
  QueryKey
>;

export type UseFetchDaoResult = UseQueryResult<DaoDetails | null, unknown>;
