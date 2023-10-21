// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
import {AxelarExecutable} from "./AxelarExecutable.sol";

contract CrossNftMinter is AxelarExecutable {
    function buyNft(
        string calldata destinationAddress,
        string[] calldata destinationDomain,
        address token,
        bytes memory tokenData,
    ) external payable{
        bytes memory payload = abi.encode(msg.sender,tokenData);
        gasService.payNativeGasForContractCall{value: relayerFee[i]}(
            address(this),
            destinationDomain,
            destinationAddress,
            payload,
            msg.sender
        );

        gateway.callContract(destinationDomain, destinationAddress, payload);
    }

    function _execute(
        string calldata,
        string calldata,
        bytes calldata payload_
    ) internal override {
        (address token, bytes memory _calldata) = abi.decode(
            payload_,
            (address, bytes)
        );
        token.call(_calldata);
    }
}
