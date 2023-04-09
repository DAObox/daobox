import { DaoAction } from "@aragon/sdk-client";
import { isAddress } from "ethers/lib/utils";
import { TokenType, WithdrawParams } from "../types";
import { Contract } from "ethers";
import { hexToBytes } from "../lib";

export function encodeWithdrawAction(params: WithdrawParams): DaoAction {
  let to = params.recipientAddress;
  if (!isAddress(params.recipientAddress)) {
    throw new Error("EncodeWithdrawAction: Invalid Address");
  }

  switch (params.type) {
    case TokenType.NATIVE:
      return { to, value: params.amount, data: new Uint8Array() };
    case TokenType.ERC20:
      if (!params.tokenAddress) {
        throw new Error("Empty token contract address");
      }
      const iface = new Contract(params.tokenAddress, [
        "function transfer(address to, uint256 amount)",
      ]).interface;
      const data = iface.encodeFunctionData("transfer", [
        params.recipientAddress,
        params.amount,
      ]);
      return {
        to: params.tokenAddress,
        value: BigInt(0),
        data: hexToBytes(data),
      };
    default:
      throw new Error("Unsupported token type");
  }
}
