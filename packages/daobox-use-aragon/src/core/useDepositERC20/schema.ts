import { z } from "zod";
import { ensRegex, ethereumAddressRegex } from "../../lib";

export const depositParamsSchema = z.object({
  daoAddressOrEns: z
    .string()
    .refine(
      (value) =>
        ensRegex.test(value) || ethereumAddressRegex.test(value) ? true : false,
      {
        message:
          "daoAddressOrEns must be a valid ENS name or Ethereum address.",
      }
    ),
  token: z.string().refine((value) => ethereumAddressRegex.test(value), {
    message: "token must be a valid Ethereum address.",
  }),
  amount: z.bigint().refine((value) => value > 0n, {
    message: "amount must be a positive integer.",
  }),
});
