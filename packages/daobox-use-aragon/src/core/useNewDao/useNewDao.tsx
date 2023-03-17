import { DaoCreationSteps } from "@aragon/sdk-client";
import { useState } from "react";
import { useMutation } from "react-query";

import {
  useAragon,
  NewDaoParams,
  NewDaoStatus,
  UseNewDaoOptions,
  UseNewDaoReturnType,
  validateData,
  newDaoParamsSchema,
} from "../..";

/**
 * Custom hook to create a new DAO.
 * @param {NewDaoParams | undefined} newDaoParams - Optional new DAO parameters.
 * @param {UseNewDaoOptions | undefined} options - Optional mutation options.
 * @returns {UseNewDaoReturnType} - An object containing the daoAddress, daoTxHash, creationStatus, and the mutation.
 */
export function useNewDao(
  newDaoParams?: NewDaoParams,
  options?: UseNewDaoOptions
): UseNewDaoReturnType {
  const [daoAddress, setDaoAddress] = useState<string | null>(null);
  const [daoTxHash, setDaoTxHash] = useState<string | null>(null);
  const [creationStatus, setCreationStatus] = useState<NewDaoStatus>(
    NewDaoStatus.IDLE
  );
  const { baseClient: client } = useAragon();

  /**
   * Async function to create a new DAO.
   * @param {NewDaoParams} newDaoParams - The new DAO parameters.
   */
  const createDao = async (newDaoParams: NewDaoParams) => {
    if (!client) throw new Error("No Aragon Client found");

    // zod validation of params
    validateData(newDaoParamsSchema, newDaoParams);
    try {
      setCreationStatus(NewDaoStatus.PINNING_METADATA);
      const metadataUri = await client.methods.pinMetadata(
        newDaoParams.daoMetadata
      );

      const steps = client.methods.createDao({ metadataUri, ...newDaoParams });
      for await (const step of steps) {
        switch (step.key) {
          case DaoCreationSteps.CREATING:
            setDaoTxHash(step.txHash);
            setCreationStatus(NewDaoStatus.CREATING_DAO);
            break;
          case DaoCreationSteps.DONE:
            setCreationStatus(NewDaoStatus.SUCCESS);
            setDaoAddress(step.address);
            break;
        }
      }
    } catch (err) {
      setCreationStatus(NewDaoStatus.ERROR);
      console.error(err);
    }
  };

  return {
    daoAddress,
    daoTxHash,
    creationStatus,
    ...useMutation({
      mutationKey: ["newDao", newDaoParams?.daoMetadata],
      mutationFn: async () => createDao(newDaoParams!),
      ...options,
    }),
  };
}
