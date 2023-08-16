import {
	DaoCreationSteps,
	DaoMetadata,
	TokenVotingPluginInstall,
} from "@aragon/sdk-client";
import { useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

import { useAragon } from "..";
import { MutationConfig } from "../types";

/**
 * @function useNewDao
 * @param {NewDaoParams} params - The parameters for creating a new DAO.
 * @returns {NewDaoReturnType} - The mutation object and the states of the new DAO creation process.
 */
export function useNewDao({
  daoMetadata,
  daoUri,
  ensSubdomain,
  trustedForwarder,
  plugins = [],
  onError,
  onMutate,
  onSettled,
  onSuccess,
  onCreateDaoTransaction,
}: NewDaoParams): NewDaoReturnType {
  const [daoAddress, setDaoAddress] = useState<string | null>(null);
  const [daoTxHash, setDaoTxHash] = useState<string | null>(null);
  const [creationStatus, setCreationStatus] = useState<NewDaoStatus>(
    NewDaoStatus.IDLE
  );
  const { baseClient: client } = useAragon();

  const createDao = async (newDaoParams: NewDaoParams) => {
    if (!client) throw new Error("No Aragon Client found");
    let daoAddress: string | null = null;
    let daoTxHash: string | null = null;
    // zod validation of params
    // validateData(newDaoParamsSchema, newDaoParams);
    try {
      setCreationStatus(NewDaoStatus.PINNING_METADATA);
      const metadataUri = await client.methods.pinMetadata(
        newDaoParams.daoMetadata
      );
      const steps = client.methods.createDao({ ...newDaoParams, metadataUri });

      for await (const step of steps) {
        switch (step.key) {
          case DaoCreationSteps.CREATING:
            setDaoTxHash(step.txHash);
            onCreateDaoTransaction?.(step.txHash);
            daoTxHash = step.txHash;
            setCreationStatus(NewDaoStatus.CREATING_DAO);
            break;
          case DaoCreationSteps.DONE:
            setCreationStatus(NewDaoStatus.SUCCESS);
            daoAddress = step.address;
            setDaoAddress(step.address);
            break;
        }
      }
    } catch (err) {
      setCreationStatus(NewDaoStatus.ERROR);
      console.error(err);
      throw new Error("DAO creation failed");
    }
    return { daoAddress, daoTxHash };
  };

  const mutation = useMutation({
    mutationKey: ["newDao", ensSubdomain],
    mutationFn: async () =>
      createDao({
        daoMetadata,
        daoUri,
        ensSubdomain,
        trustedForwarder,
        plugins,
      }),
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  return {
    ...mutation,
    daoAddress,
    daoTxHash,
    creationStatus,
  };
}

/**
 * @typedef {object} NewDaoParams
 * @property {MutationConfig<NewDaoReturnData, Error>} config - The configuration for the mutation.
 * @property {DaoMetadata} daoMetadata - The metadata for the new DAO.
 * @property {string} [daoUri] - The URI for the new DAO.
 * @property {string} ensSubdomain - The ENS subdomain for the new DAO.
 * @property {string} [trustedForwarder] - The trusted forwarder address for the new DAO.
 * @property {TokenVotingPluginInstall[]} plugins - The plugins to be installed in the new DAO.
 * @property {(txHash: string) => void} [onCreateDaoTransaction] - A callback to be called when the DAO creation transaction is created.
 */
export type NewDaoParams = MutationConfig<NewDaoReturnData, Error> & {
  daoMetadata: DaoMetadata;
  daoUri?: string;
  ensSubdomain: string;
  trustedForwarder?: string;
  plugins: TokenVotingPluginInstall[];
  onCreateDaoTransaction?: (txHash: string) => void;
};

/**
 * @typedef {object} NewDaoReturnData
 * @property {string|null} daoAddress - The address of the created DAO.
 * @property {string|null} daoTxHash - The transaction hash of the created DAO.
 */
export type NewDaoReturnData = {
  daoAddress: string | null;
  daoTxHash: string | null;
};

/**
 * Enum representing the possible statuses of a new DAO creation process.
 * @readonly
 * @enum {string}
 */
export enum NewDaoStatus {
  IDLE = "idle",
  PINNING_METADATA = "pinningMetadata",
  CREATING_DAO = "creatingDao",
  SUCCESS = "success",
  ERROR = "error",
}

/**
 * @typedef {object} NewDaoReturnType
 * @extends {UseMutationResult<NewDaoReturnData, Error, void, unknown>}
 * @property {string|null} daoAddress - The address of the created DAO.
 * @property {string|null} daoTxHash - The transaction hash of the created DAO.
 * @property {NewDaoStatus} creationStatus - The current status of the new DAO creation process.
 */
export type NewDaoReturnType = UseMutationResult<
  {
    daoAddress: string | null;
    daoTxHash: string | null;
  },
  Error,
  void,
  unknown
> & {
  daoAddress: string | null;
  daoTxHash: string | null;
  creationStatus: NewDaoStatus;
};

// export const IPluginInstallItemSchema = z.object({}); // Replace this with the actual schema for IPluginInstallItem

// export const daoResourceLinkSchema = z.object({
//   title: z.string().min(1, { message: "Link title must not be empty." }),
//   url: urlOrIpfsUri,
// });

// export const daoMetadataSchema = z.object({
//   name: z.string().refine((value) => value.trim() !== "", {
//     message: "DAO name must not be empty.",
//   }),
//   description: z.string().refine((value) => value.trim() !== "", {
//     message: "DAO description must not be empty.",
//   }),
//   avatar: z
//     .string()
//     .optional()
//     .refine(
//       (value) => {
//         if (value === undefined) return true;
//         try {
//           urlOrIpfsUri.parse(value);
//           return true;
//         } catch (e) {
//           return false;
//         }
//       },
//       {
//         message: "Avatar URI must be a valid IPFS URI or a regular URL.",
//       }
//     ),
//   links: z.array(daoResourceLinkSchema),
// });

// export const newDaoParamsSchema = z.object({
//   daoMetadata: daoMetadataSchema,
//   daoUri: z
//     .string()
//     .optional()
//     .refine(
//       (value) => {
//         if (value === undefined) return true;
//         return z.string().url().safeParse(value).success;
//       },
//       {
//         message: "Invalid URL format.",
//       }
//     ),
//   ensSubdomain: z.string().refine((value) => ensRegex.test(value), {
//     message: "Invalid ENS subdomain.",
//   }),
//   trustedForwarder: z
//     .string()
//     .optional()
//     .refine(
//       (value) => {
//         if (value === undefined) return true;
//         return ethereumAddressRegex.test(value);
//       },
//       {
//         message: "trustedForwarder must be a valid Ethereum address.",
//       }
//     ),
//   plugins: z.array(IPluginInstallItemSchema),
// });
