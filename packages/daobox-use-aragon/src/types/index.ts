import { QueryStatus, UseMutationOptions, UseQueryOptions } from "react-query";

/**
 * A configuration object used for customizing the behavior of a useMutation hook.
 * It extends the UseMutationOptions from React Query by adding an additional onTransaction callback.
 *
 * @template Data - The type of the data returned by the mutation.
 * @template Error - The type of the error returned by the mutation.
 * @template Variables - The type of the variables used by the mutation (default to void).
 *
 * @property onError - A function that is called when the mutation encounters an error.
 * @property onMutate - A function that is called before the mutation function is executed. It receives the same variables as the mutation function, and its returned value is passed to both onError and onSettled functions in the event of a mutation failure.
 * @property onSettled - A function that is called when the mutation is either successfully fetched or encounters an error.
 * @property onSuccess - A function that is called when the mutation is successful. It is passed the mutation's result.
 * @property onTransaction - An optional callback function that is called with the transaction hash (txHash) when a new transaction is created.
 */
export type MutationConfig<Data, Error, Variables = void> = {
  onError?: UseMutationOptions<Data, Error, Variables>["onError"];
  onMutate?: UseMutationOptions<Data, Error, Variables>["onMutate"];
  onSettled?: UseMutationOptions<Data, Error, Variables>["onSettled"];
  onSuccess?: UseMutationOptions<Data, Error, Variables>["onSuccess"];
};

export type QueryConfig<TData, TSelectData = TData> = Pick<
  UseQueryOptions<TData, unknown, TSelectData>,
  | "cacheTime"
  | "enabled"
  | "isDataEqual"
  | "staleTime"
  | "structuralSharing"
  | "suspense"
  | "onError"
  | "onSettled"
  | "onSuccess"
  | "queryKey"
  | "select"
  | "useErrorBoundary"
>;
