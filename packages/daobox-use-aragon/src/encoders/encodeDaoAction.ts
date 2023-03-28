import { ethers } from "ethers";
import { encodeFunctionCall } from ".";
import { DaoAction } from "@aragon/sdk-client";

interface DaoActionInput {
  abi: ethers.utils.Fragment[] | null;
  functionSignature: string;
  parameters: any[];
  to: string;
  value: bigint;
}

/**
 * Encodes an array of DAO actions using the provided array of objects containing ABI, function signature, parameters, to, and value.
 * Returns an array of DaoAction objects, which contain the to, value, and data properties.
 *
 * @param {EncodeDaoActionParams[]} actions - An array of objects containing the contract ABI, function signature, parameters, to, and value for each DAO action.
 * @param {ethers.utils.Fragment[] | null} actions[].abi - The contract ABI.
 * @param {string} actions[].functionSignature - The function signature to encode.
 * @param {any[]} actions[].parameters - The parameters for the function call.
 * @param {string} actions[].to - The address to which the action will be sent.
 * @param {bigint} actions[].value - The value to be sent along with the action.
 * @returns {DaoAction[]} The array of DaoAction objects containing the encoded data for each action.
 */
export function encodeDaoActions(actions: DaoActionInput[]): DaoAction[] {
  return actions.map(({ abi, functionSignature, parameters, to, value }) => {
    const encodedFunctionCall = encodeFunctionCall({
      abi,
      functionSignature,
      parameters,
    });

    return {
      to,
      value,
      data: new Uint8Array(
        Buffer.from(
          encodedFunctionCall ? encodedFunctionCall.slice(2) : "",
          "hex"
        )
      ),
    };
  });
}
