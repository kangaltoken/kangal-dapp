/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface BridgeBSCInterface extends ethers.utils.Interface {
  functions: {
    "bridgeRequestsToPolygon(uint256)": FunctionFragment;
    "burnAddress()": FunctionFragment;
    "changeOperator(address)": FunctionFragment;
    "changeOperatorFee(uint256)": FunctionFragment;
    "makeBridgeRequestToPolygon(uint256)": FunctionFragment;
    "maxOperatorFee()": FunctionFragment;
    "operator()": FunctionFragment;
    "operatorFee()": FunctionFragment;
    "owner()": FunctionFragment;
    "paused()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "requestToPolygonNonce()": FunctionFragment;
    "token()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "bridgeRequestsToPolygon",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "burnAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "changeOperator",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "changeOperatorFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "makeBridgeRequestToPolygon",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "maxOperatorFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "operator", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "operatorFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requestToPolygonNonce",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "bridgeRequestsToPolygon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "burnAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeOperatorFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "makeBridgeRequestToPolygon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "maxOperatorFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "operator", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "operatorFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestToPolygonNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "BridgeRequestToPolygon(address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BridgeRequestToPolygon"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export class BridgeBSC extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: BridgeBSCInterface;

  functions: {
    bridgeRequestsToPolygon(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { user: string; amount: BigNumber }>;

    "bridgeRequestsToPolygon(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { user: string; amount: BigNumber }>;

    burnAddress(overrides?: CallOverrides): Promise<[string]>;

    "burnAddress()"(overrides?: CallOverrides): Promise<[string]>;

    changeOperator(
      _operator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "changeOperator(address)"(
      _operator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeOperatorFee(
      _operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "changeOperatorFee(uint256)"(
      _operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    makeBridgeRequestToPolygon(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "makeBridgeRequestToPolygon(uint256)"(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    maxOperatorFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    "maxOperatorFee()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    operator(overrides?: CallOverrides): Promise<[string]>;

    "operator()"(overrides?: CallOverrides): Promise<[string]>;

    operatorFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    "operatorFee()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    "owner()"(overrides?: CallOverrides): Promise<[string]>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    "paused()"(overrides?: CallOverrides): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    requestToPolygonNonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    "requestToPolygonNonce()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    token(overrides?: CallOverrides): Promise<[string]>;

    "token()"(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bridgeRequestsToPolygon(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { user: string; amount: BigNumber }>;

  "bridgeRequestsToPolygon(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { user: string; amount: BigNumber }>;

  burnAddress(overrides?: CallOverrides): Promise<string>;

  "burnAddress()"(overrides?: CallOverrides): Promise<string>;

  changeOperator(
    _operator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "changeOperator(address)"(
    _operator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeOperatorFee(
    _operatorFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "changeOperatorFee(uint256)"(
    _operatorFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  makeBridgeRequestToPolygon(
    _amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "makeBridgeRequestToPolygon(uint256)"(
    _amount: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  maxOperatorFee(overrides?: CallOverrides): Promise<BigNumber>;

  "maxOperatorFee()"(overrides?: CallOverrides): Promise<BigNumber>;

  operator(overrides?: CallOverrides): Promise<string>;

  "operator()"(overrides?: CallOverrides): Promise<string>;

  operatorFee(overrides?: CallOverrides): Promise<BigNumber>;

  "operatorFee()"(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  "owner()"(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  "paused()"(overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "renounceOwnership()"(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  requestToPolygonNonce(overrides?: CallOverrides): Promise<BigNumber>;

  "requestToPolygonNonce()"(overrides?: CallOverrides): Promise<BigNumber>;

  token(overrides?: CallOverrides): Promise<string>;

  "token()"(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferOwnership(address)"(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bridgeRequestsToPolygon(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { user: string; amount: BigNumber }>;

    "bridgeRequestsToPolygon(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { user: string; amount: BigNumber }>;

    burnAddress(overrides?: CallOverrides): Promise<string>;

    "burnAddress()"(overrides?: CallOverrides): Promise<string>;

    changeOperator(_operator: string, overrides?: CallOverrides): Promise<void>;

    "changeOperator(address)"(
      _operator: string,
      overrides?: CallOverrides
    ): Promise<void>;

    changeOperatorFee(
      _operatorFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "changeOperatorFee(uint256)"(
      _operatorFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    makeBridgeRequestToPolygon(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "makeBridgeRequestToPolygon(uint256)"(
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    maxOperatorFee(overrides?: CallOverrides): Promise<BigNumber>;

    "maxOperatorFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    operator(overrides?: CallOverrides): Promise<string>;

    "operator()"(overrides?: CallOverrides): Promise<string>;

    operatorFee(overrides?: CallOverrides): Promise<BigNumber>;

    "operatorFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    "owner()"(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    "paused()"(overrides?: CallOverrides): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "renounceOwnership()"(overrides?: CallOverrides): Promise<void>;

    requestToPolygonNonce(overrides?: CallOverrides): Promise<BigNumber>;

    "requestToPolygonNonce()"(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<string>;

    "token()"(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    BridgeRequestToPolygon(
      account: string | null,
      amount: BigNumberish | null,
      nonce: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { account: string; amount: BigNumber; nonce: BigNumber }
    >;

    OwnershipTransferred(
      previousOwner: string | null,
      newOwner: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    Paused(account: null): TypedEventFilter<[string], { account: string }>;

    Unpaused(account: null): TypedEventFilter<[string], { account: string }>;
  };

  estimateGas: {
    bridgeRequestsToPolygon(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "bridgeRequestsToPolygon(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burnAddress(overrides?: CallOverrides): Promise<BigNumber>;

    "burnAddress()"(overrides?: CallOverrides): Promise<BigNumber>;

    changeOperator(
      _operator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "changeOperator(address)"(
      _operator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeOperatorFee(
      _operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "changeOperatorFee(uint256)"(
      _operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    makeBridgeRequestToPolygon(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "makeBridgeRequestToPolygon(uint256)"(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    maxOperatorFee(overrides?: CallOverrides): Promise<BigNumber>;

    "maxOperatorFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    operator(overrides?: CallOverrides): Promise<BigNumber>;

    "operator()"(overrides?: CallOverrides): Promise<BigNumber>;

    operatorFee(overrides?: CallOverrides): Promise<BigNumber>;

    "operatorFee()"(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    "owner()"(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    "paused()"(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    requestToPolygonNonce(overrides?: CallOverrides): Promise<BigNumber>;

    "requestToPolygonNonce()"(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    "token()"(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bridgeRequestsToPolygon(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "bridgeRequestsToPolygon(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burnAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "burnAddress()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    changeOperator(
      _operator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "changeOperator(address)"(
      _operator: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeOperatorFee(
      _operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "changeOperatorFee(uint256)"(
      _operatorFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    makeBridgeRequestToPolygon(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "makeBridgeRequestToPolygon(uint256)"(
      _amount: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    maxOperatorFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "maxOperatorFee()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    operator(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "operator()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    operatorFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "operatorFee()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "owner()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "paused()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "renounceOwnership()"(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    requestToPolygonNonce(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "requestToPolygonNonce()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "token()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferOwnership(address)"(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
