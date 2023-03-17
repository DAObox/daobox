import { DaoListItem } from "@aragon/sdk-client";
import { UseQueryOptions, UseQueryResult } from "react-query";

export type UseFetchDaosOptions = Omit<
  UseQueryOptions<DaoListItem[] | null, unknown, DaoListItem[] | null>,
  "queryKey" | "queryFn"
>;

export type UseFetchDaosResults = UseQueryResult<DaoListItem[] | null, unknown>;
