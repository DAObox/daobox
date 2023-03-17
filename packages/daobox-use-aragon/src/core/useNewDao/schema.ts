import { urlOrIpfsUri } from "./../../";
import { z } from "zod";
import { ensRegex, ethereumAddressRegex } from "../..";

// TODO: Replace this with the actual schema for IPluginInstallItem
export const IPluginInstallItemSchema = z.object({}); // Replace this with the actual schema for IPluginInstallItem

export const daoResourceLinkSchema = z.object({
  title: z.string().min(1, { message: "Link title must not be empty." }),
  url: urlOrIpfsUri,
});

export const daoMetadataSchema = z.object({
  name: z.string().refine((value) => value.trim() !== "", {
    message: "DAO name must not be empty.",
  }),
  description: z.string().refine((value) => value.trim() !== "", {
    message: "DAO description must not be empty.",
  }),
  avatar: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true;
        try {
          urlOrIpfsUri.parse(value);
          return true;
        } catch (e) {
          return false;
        }
      },
      {
        message: "Avatar URI must be a valid IPFS URI or a regular URL.",
      }
    ),
  links: z.array(daoResourceLinkSchema),
});

export const newDaoParamsSchema = z.object({
  daoMetadata: daoMetadataSchema,
  daoUri: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true;
        return z.string().url().safeParse(value).success;
      },
      {
        message: "Invalid URL format.",
      }
    ),
  ensSubdomain: z.string().refine((value) => ensRegex.test(value), {
    message: "Invalid ENS subdomain.",
  }),
  trustedForwarder: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined) return true;
        return ethereumAddressRegex.test(value);
      },
      {
        message: "trustedForwarder must be a valid Ethereum address.",
      }
    ),
  plugins: z.array(IPluginInstallItemSchema),
});
