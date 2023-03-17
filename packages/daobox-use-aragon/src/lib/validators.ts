import { z } from "zod";
import { ipfsUriRegex } from ".";

export const ipfsUri = z
  .string()
  .refine((value: string) => ipfsUriRegex.test(value));

export const urlOrIpfsUri = z.string().refine(
  (value) => {
    try {
      if (value.startsWith("ipfs://")) {
        ipfsUri.parse(value);
      } else {
        z.string().url().parse(value);
      }
      return true;
    } catch {
      return false;
    }
  },
  {
    message: "Invalid URL or IPFS URI format.",
  }
);
