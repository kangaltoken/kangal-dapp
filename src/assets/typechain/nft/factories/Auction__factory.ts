/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { Auction } from "../Auction";

export class Auction__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Auction> {
    return super.deploy(overrides || {}) as Promise<Auction>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Auction {
    return super.attach(address) as Auction;
  }
  connect(signer: Signer): Auction__factory {
    return super.connect(signer) as Auction__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Auction {
    return new Contract(address, _abi, signerOrProvider) as Auction;
  }
}

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
    ],
    name: "CancelOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "NewBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "orderId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "contract IERC721",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "NewOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "bid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "bidToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "burnAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endTimestampOffset",
        type: "uint256",
      },
    ],
    name: "createOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderId",
        type: "uint256",
      },
    ],
    name: "endTimestampOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lastOrderId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minimumBidIncrease",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orderById",
    outputs: [
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "contract IERC721",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTimestampOffset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastBidPrice",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "lastBidder",
        type: "address",
      },
      {
        internalType: "bool",
        name: "hasBeenClaimed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "replacedBidBurnPct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setBidToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60e060405261dead73ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff1660601b81525069152d02c7e14af680000060a090815250606460c0908152503480156200006257600080fd5b5062000083620000776200009060201b60201c565b6200009860201b60201c565b600180819055506200015c565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60805160601c60a05160c051612c47620001ab600039600081816105ff0152610aa0015260008181610833015261156901526000818161048e01528181610ae701526112730152612c476000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370d5ae05116100975780638da5cb5b116100665780638da5cb5b14610266578063dfafd4fd14610284578063f2fde38b146102a2578063f7d6b330146102be576100f5565b806370d5ae05146101d6578063715018a6146101f4578063872fd05e146101fe5780638d77eba51461022e576100f5565b8063501ee126116100d3578063501ee126146101645780635662ecc714610180578063598647f81461019e5780636f652e1a146101ba576100f5565b8063150b7a02146100fa578063379607f51461012a5780634517011814610146575b600080fd5b610114600480360381019061010f9190611b73565b6102dc565b6040516101219190612183565b60405180910390f35b610144600480360381019061013f9190611c8a565b6102f0565b005b61014e6105fd565b60405161015b91906123fb565b60405180910390f35b61017e60048036038101906101799190611b19565b610621565b005b6101886106e1565b60405161019591906123fb565b60405180910390f35b6101b860048036038101906101b39190611ce4565b6106e7565b005b6101d460048036038101906101cf9190611c23565b610cd5565b005b6101de611271565b6040516101eb9190612052565b60405180910390f35b6101fc611295565b005b61021860048036038101906102139190611c8a565b61131d565b60405161022591906123fb565b60405180910390f35b61024860048036038101906102439190611c8a565b611365565b60405161025d999897969594939291906120cd565b60405180910390f35b61026e611420565b60405161027b9190612052565b60405180910390f35b61028c611449565b604051610299919061219e565b60405180910390f35b6102bc60048036038101906102b79190611b19565b61146f565b005b6102c6611567565b6040516102d391906123fb565b60405180910390f35b600063150b7a0260e01b9050949350505050565b60026001541415610336576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161032d906123db565b60405180910390fd5b6002600181905550600060036000838152602001908152602001600020905061035e8261131d565b421161039f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103969061235b565b60405180910390fd5b600015158160070160149054906101000a900460ff161515146103f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ee906122bb565b60405180910390fd5b8060070160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610489576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104809061223b565b60405180910390fd5b6104fa7f00000000000000000000000000000000000000000000000000000000000000008260060154600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661158b9092919063ffffffff16565b8060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166342842e0e303384600201546040518463ffffffff1660e01b815260040161055f93929190612096565b600060405180830381600087803b15801561057957600080fd5b505af115801561058d573d6000803e3d6000fd5b5050505060018160070160146101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff16827f35538759d80c1fd7bb450a0d05601db5a99fa8b5d073a07c847a9fd61029b10760405160405180910390a3506001808190555050565b7f000000000000000000000000000000000000000000000000000000000000000081565b610629611611565b73ffffffffffffffffffffffffffffffffffffffff16610647611420565b73ffffffffffffffffffffffffffffffffffffffff161461069d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610694906122db565b60405180910390fd5b80600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60045481565b6002600154141561072d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610724906123db565b60405180910390fd5b6002600181905550600060036000848152602001908152602001600020905060006107578461131d565b905080421061079b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107929061231b565b60405180910390fd5b8160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561082e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108259061227b565b60405180910390fd5b6108657f0000000000000000000000000000000000000000000000000000000000000000836006015461161990919063ffffffff16565b8310156108a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161089e906121db565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016109029190612052565b60206040518083038186803b15801561091a57600080fd5b505afa15801561092e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109529190611cb7565b831115610994576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098b906123bb565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b81526004016109f192919061206d565b60206040518083038186803b158015610a0957600080fd5b505afa158015610a1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a419190611cb7565b831115610a83576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7a9061225b565b60405180910390fd5b816003015482600601541115610bd8576000610ae0612710610ad27f0000000000000000000000000000000000000000000000000000000000000000866006015461162f90919063ffffffff16565b61164590919063ffffffff16565b9050610b4f7f000000000000000000000000000000000000000000000000000000000000000082600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661158b9092919063ffffffff16565b610bd68360070160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610b8e83866006015461165b90919063ffffffff16565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1661158b9092919063ffffffff16565b505b610c27333085600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16611671909392919063ffffffff16565b338260070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508282600601819055506102588111610c9a57610c916102588261161990919063ffffffff16565b82600501819055505b82847f632f5622fa7b1e8ef1a95c87de56ccc3584d8bc0f17283a3ad0ff221aa4cc61260405160405180910390a35050600180819055505050565b610cdd611611565b73ffffffffffffffffffffffffffffffffffffffff16610cfb611420565b73ffffffffffffffffffffffffffffffffffffffff1614610d51576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d48906122db565b60405180910390fd5b60026001541415610d97576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d8e906123db565b60405180910390fd5b600260018190555062015180811015610de5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddc9061221b565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16636352211e856040518263ffffffff1660e01b8152600401610e3591906123fb565b60206040518083038186803b158015610e4d57600080fd5b505afa158015610e61573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e859190611b46565b73ffffffffffffffffffffffffffffffffffffffff1614610edb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ed29061237b565b60405180910390fd5b3073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1663081812fc856040518263ffffffff1660e01b8152600401610f2b91906123fb565b60206040518083038186803b158015610f4357600080fd5b505afa158015610f57573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f7b9190611b46565b73ffffffffffffffffffffffffffffffffffffffff1614610fd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fc8906122fb565b60405180910390fd5b60006001600454610fe2919061249e565b90506040518061012001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152602001428152602001838152602001848152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600015158152506003600083815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020155606082015181600301556080820151816004015560a0820151816005015560c0820151816006015560e08201518160070160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506101008201518160070160146101000a81548160ff021916908315150217905550905050806004819055508473ffffffffffffffffffffffffffffffffffffffff166342842e0e3330876040518463ffffffff1660e01b81526004016111ec93929190612096565b600060405180830381600087803b15801561120657600080fd5b505af115801561121a573d6000803e3d6000fd5b50505050838573ffffffffffffffffffffffffffffffffffffffff16827f08d66ed2414ca210c867459225e790c42150fa947370d9d64f9124145d73ca2860405160405180910390a4506001808190555050505050565b7f000000000000000000000000000000000000000000000000000000000000000081565b61129d611611565b73ffffffffffffffffffffffffffffffffffffffff166112bb611420565b73ffffffffffffffffffffffffffffffffffffffff1614611311576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611308906122db565b60405180910390fd5b61131b60006116fa565b565b600061135e6003600084815260200190815260200160002060050154600360008581526020019081526020016000206004015461161990919063ffffffff16565b9050919050565b60036020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154908060040154908060050154908060060154908060070160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060070160149054906101000a900460ff16905089565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b611477611611565b73ffffffffffffffffffffffffffffffffffffffff16611495611420565b73ffffffffffffffffffffffffffffffffffffffff16146114eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114e2906122db565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561155b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611552906121fb565b60405180910390fd5b611564816116fa565b50565b7f000000000000000000000000000000000000000000000000000000000000000081565b61160c8363a9059cbb60e01b84846040516024016115aa92919061215a565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506117be565b505050565b600033905090565b60008183611627919061249e565b905092915050565b6000818361163d9190612525565b905092915050565b6000818361165391906124f4565b905092915050565b60008183611669919061257f565b905092915050565b6116f4846323b872dd60e01b85858560405160240161169293929190612096565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506117be565b50505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000611820826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166118859092919063ffffffff16565b905060008151111561188057808060200190518101906118409190611bf6565b61187f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118769061239b565b60405180910390fd5b5b505050565b6060611894848460008561189d565b90509392505050565b6060824710156118e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118d99061229b565b60405180910390fd5b6118eb856119b1565b61192a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119219061233b565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051611953919061203b565b60006040518083038185875af1925050503d8060008114611990576040519150601f19603f3d011682016040523d82523d6000602084013e611995565b606091505b50915091506119a58282866119c4565b92505050949350505050565b600080823b905060008111915050919050565b606083156119d457829050611a24565b6000835111156119e75782518084602001fd5b816040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a1b91906121b9565b60405180910390fd5b9392505050565b6000611a3e611a398461243b565b612416565b905082815260208101848484011115611a5a57611a59612786565b5b611a65848285612681565b509392505050565b600081359050611a7c81612bb5565b92915050565b600081519050611a9181612bb5565b92915050565b600081519050611aa681612bcc565b92915050565b600082601f830112611ac157611ac0612781565b5b8135611ad1848260208601611a2b565b91505092915050565b600081359050611ae981612be3565b92915050565b600081359050611afe81612bfa565b92915050565b600081519050611b1381612bfa565b92915050565b600060208284031215611b2f57611b2e612790565b5b6000611b3d84828501611a6d565b91505092915050565b600060208284031215611b5c57611b5b612790565b5b6000611b6a84828501611a82565b91505092915050565b60008060008060808587031215611b8d57611b8c612790565b5b6000611b9b87828801611a6d565b9450506020611bac87828801611a6d565b9350506040611bbd87828801611aef565b925050606085013567ffffffffffffffff811115611bde57611bdd61278b565b5b611bea87828801611aac565b91505092959194509250565b600060208284031215611c0c57611c0b612790565b5b6000611c1a84828501611a97565b91505092915050565b60008060008060808587031215611c3d57611c3c612790565b5b6000611c4b87828801611ada565b9450506020611c5c87828801611aef565b9350506040611c6d87828801611aef565b9250506060611c7e87828801611aef565b91505092959194509250565b600060208284031215611ca057611c9f612790565b5b6000611cae84828501611aef565b91505092915050565b600060208284031215611ccd57611ccc612790565b5b6000611cdb84828501611b04565b91505092915050565b60008060408385031215611cfb57611cfa612790565b5b6000611d0985828601611aef565b9250506020611d1a85828601611aef565b9150509250929050565b611d2d816125b3565b82525050565b611d3c816125c5565b82525050565b611d4b816125d1565b82525050565b6000611d5c8261246c565b611d668185612482565b9350611d76818560208601612690565b80840191505092915050565b611d8b81612639565b82525050565b611d9a8161264b565b82525050565b6000611dab82612477565b611db5818561248d565b9350611dc5818560208601612690565b611dce81612795565b840191505092915050565b6000611de660488361248d565b9150611df1826127a6565b606082019050919050565b6000611e0960268361248d565b9150611e148261281b565b604082019050919050565b6000611e2c60338361248d565b9150611e378261286a565b604082019050919050565b6000611e4f60228361248d565b9150611e5a826128b9565b604082019050919050565b6000611e72601a8361248d565b9150611e7d82612908565b602082019050919050565b6000611e95601e8361248d565b9150611ea082612931565b602082019050919050565b6000611eb860268361248d565b9150611ec38261295a565b604082019050919050565b6000611edb60168361248d565b9150611ee6826129a9565b602082019050919050565b6000611efe60208361248d565b9150611f09826129d2565b602082019050919050565b6000611f21602d8361248d565b9150611f2c826129fb565b604082019050919050565b6000611f4460168361248d565b9150611f4f82612a4a565b602082019050919050565b6000611f67601d8361248d565b9150611f7282612a73565b602082019050919050565b6000611f8a601e8361248d565b9150611f9582612a9c565b602082019050919050565b6000611fad60358361248d565b9150611fb882612ac5565b604082019050919050565b6000611fd0602a8361248d565b9150611fdb82612b14565b604082019050919050565b6000611ff360188361248d565b9150611ffe82612b63565b602082019050919050565b6000612016601f8361248d565b915061202182612b8c565b602082019050919050565b6120358161262f565b82525050565b60006120478284611d51565b915081905092915050565b60006020820190506120676000830184611d24565b92915050565b60006040820190506120826000830185611d24565b61208f6020830184611d24565b9392505050565b60006060820190506120ab6000830186611d24565b6120b86020830185611d24565b6120c5604083018461202c565b949350505050565b6000610120820190506120e3600083018c611d24565b6120f0602083018b611d91565b6120fd604083018a61202c565b61210a606083018961202c565b612117608083018861202c565b61212460a083018761202c565b61213160c083018661202c565b61213e60e0830185611d24565b61214c610100830184611d33565b9a9950505050505050505050565b600060408201905061216f6000830185611d24565b61217c602083018461202c565b9392505050565b60006020820190506121986000830184611d42565b92915050565b60006020820190506121b36000830184611d82565b92915050565b600060208201905081810360008301526121d38184611da0565b905092915050565b600060208201905081810360008301526121f481611dd9565b9050919050565b6000602082019050818103600083015261221481611dfc565b9050919050565b6000602082019050818103600083015261223481611e1f565b9050919050565b6000602082019050818103600083015261225481611e42565b9050919050565b6000602082019050818103600083015261227481611e65565b9050919050565b6000602082019050818103600083015261229481611e88565b9050919050565b600060208201905081810360008301526122b481611eab565b9050919050565b600060208201905081810360008301526122d481611ece565b9050919050565b600060208201905081810360008301526122f481611ef1565b9050919050565b6000602082019050818103600083015261231481611f14565b9050919050565b6000602082019050818103600083015261233481611f37565b9050919050565b6000602082019050818103600083015261235481611f5a565b9050919050565b6000602082019050818103600083015261237481611f7d565b9050919050565b6000602082019050818103600083015261239481611fa0565b9050919050565b600060208201905081810360008301526123b481611fc3565b9050919050565b600060208201905081810360008301526123d481611fe6565b9050919050565b600060208201905081810360008301526123f481612009565b9050919050565b6000602082019050612410600083018461202c565b92915050565b6000612420612431565b905061242c82826126c3565b919050565b6000604051905090565b600067ffffffffffffffff82111561245657612455612752565b5b61245f82612795565b9050602081019050919050565b600081519050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b60006124a98261262f565b91506124b48361262f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156124e9576124e86126f4565b5b828201905092915050565b60006124ff8261262f565b915061250a8361262f565b92508261251a57612519612723565b5b828204905092915050565b60006125308261262f565b915061253b8361262f565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612574576125736126f4565b5b828202905092915050565b600061258a8261262f565b91506125958361262f565b9250828210156125a8576125a76126f4565b5b828203905092915050565b60006125be8261260f565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6000612608826125b3565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006126448261265d565b9050919050565b60006126568261265d565b9050919050565b60006126688261266f565b9050919050565b600061267a8261260f565b9050919050565b82818337600083830152505050565b60005b838110156126ae578082015181840152602081019050612693565b838111156126bd576000848401525b50505050565b6126cc82612795565b810181811067ffffffffffffffff821117156126eb576126ea612752565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f416d6f756e74206d75737420626520626967676572207468616e206f7220657160008201527f75616c20746f206c6173744269645072696365202b206d696e696d756d42696460208201527f496e637265617365000000000000000000000000000000000000000000000000604082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f456e642074696d657374616d70206d757374206265206269676765722074686160008201527f6e206f7220657175616c20746f20612064617900000000000000000000000000602082015250565b7f4f6e6c7920746865206c617374206269646465722063616e2063616c6c20746860008201527f6973000000000000000000000000000000000000000000000000000000000000602082015250565b7f4e6f7420656e6f75676820746f6b656e20616c6c6f77616e6365000000000000600082015250565b7f53656c6c65722063616e6e6f742062696420746f206f776e206f726465720000600082015250565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b7f4f7264657220686173206265656e20636c61696d656400000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f41756374696f6e20636f6e747261637420646f6573206e6f742068617665207460008201527f6f6b656e20617070726f76616c00000000000000000000000000000000000000602082015250565b7f4f726465722061756374696f6e2066696e697368656400000000000000000000600082015250565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b7f4f726465722061756374696f6e20686173206e6f742066696e69736865640000600082015250565b7f596f75206d75737420626520746865206f776e6572206f662074686520746f6b60008201527f656e20746f2063726561746520616e206f726465720000000000000000000000602082015250565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b7f4e6f7420656e6f75676820746f6b656e2062616c616e63650000000000000000600082015250565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b612bbe816125b3565b8114612bc957600080fd5b50565b612bd5816125c5565b8114612be057600080fd5b50565b612bec816125fd565b8114612bf757600080fd5b50565b612c038161262f565b8114612c0e57600080fd5b5056fea2646970667358221220cf6d04e63816887e62eec4afa1cbe5e4e9bc1a3cde0db2e7d90dbfadea8f339f64736f6c63430008070033";