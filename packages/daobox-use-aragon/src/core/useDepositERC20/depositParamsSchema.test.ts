import { depositParamsSchema, validateData } from "../..";

describe("validateData function and depositParamsSchema", () => {
  test("validates correct input", () => {
    const input = {
      daoAddressOrEns: "test.dao.eth",
      token: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      amount: 1000n,
    };

    expect(() => validateData(depositParamsSchema, input)).not.toThrow();
  });

  test("returns error for invalid daoAddressOrEns", () => {
    const input = {
      daoAddressOrEns: "invalid.ens",
      token: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      amount: 1000n,
    };

    expect(() => validateData(depositParamsSchema, input)).toThrow(
      /daoAddressOrEns must be a valid ENS name or Ethereum address/
    );
  });

  test("returns error for invalid token", () => {
    const input = {
      daoAddressOrEns: "test.dao.eth",
      token: "0xinvalidaddress",
      amount: 1000n,
    };

    expect(() => validateData(depositParamsSchema, input)).toThrow(
      /token must be a valid Ethereum address/
    );
  });

  test("returns error for invalid amount", () => {
    const input = {
      daoAddressOrEns: "test.dao.eth",
      token: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      amount: -1000n,
    };

    expect(() => validateData(depositParamsSchema, input)).toThrow(
      /amount must be a positive integer/
    );
  });
});
