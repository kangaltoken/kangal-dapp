/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { StakingContract } from "../StakingContract";

export class StakingContract__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _rewardToken: string,
    _stakedToken: string,
    _APRM: BigNumberish,
    _minimumStakeAmount: BigNumberish,
    _minimumStakeTime: BigNumberish,
    _processingFeeForStakedToken: BigNumberish,
    _feeVaultAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StakingContract> {
    return super.deploy(
      _rewardToken,
      _stakedToken,
      _APRM,
      _minimumStakeAmount,
      _minimumStakeTime,
      _processingFeeForStakedToken,
      _feeVaultAddress,
      overrides || {}
    ) as Promise<StakingContract>;
  }
  getDeployTransaction(
    _rewardToken: string,
    _stakedToken: string,
    _APRM: BigNumberish,
    _minimumStakeAmount: BigNumberish,
    _minimumStakeTime: BigNumberish,
    _processingFeeForStakedToken: BigNumberish,
    _feeVaultAddress: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _rewardToken,
      _stakedToken,
      _APRM,
      _minimumStakeAmount,
      _minimumStakeTime,
      _processingFeeForStakedToken,
      _feeVaultAddress,
      overrides || {}
    );
  }
  attach(address: string): StakingContract {
    return super.attach(address) as StakingContract;
  }
  connect(signer: Signer): StakingContract__factory {
    return super.connect(signer) as StakingContract__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingContract {
    return new Contract(address, _abi, signerOrProvider) as StakingContract;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_rewardToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_stakedToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_APRM",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minimumStakeAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minimumStakeTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_processingFeeForStakedToken",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_feeVaultAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "paused",
        type: "bool",
      },
    ],
    name: "DepositsPaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EmergencyWithdrawal",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bool",
        name: "paused",
        type: "bool",
      },
    ],
    name: "WithdrawalsPaused",
    type: "event",
  },
  {
    inputs: [],
    name: "APRM",
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
        name: "userAddress",
        type: "address",
      },
    ],
    name: "calculateLatestRewards",
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
        name: "userAddress",
        type: "address",
      },
    ],
    name: "calculateTotalPendingRewards",
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
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositsPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feeVaultAddress",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "firstDepositTimestamps",
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
    name: "minimumStakeAmount",
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
    name: "minimumStakeTime",
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
    inputs: [
      {
        internalType: "bool",
        name: "pause",
        type: "bool",
      },
    ],
    name: "pauseDeposits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "pause",
        type: "bool",
      },
    ],
    name: "pauseWithdrawals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "pendingRewardsUpToLastDeposit",
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
    name: "processingFeeForStakedToken",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewardCalculationStartTimestamps",
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
    name: "rewardToken",
    outputs: [
      {
        internalType: "contract IRewardToken",
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
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "setFeeVaultAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minimumStakeAmount",
        type: "uint256",
      },
    ],
    name: "setMinimumStakeAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_minimumStakeTime",
        type: "uint256",
      },
    ],
    name: "setMinimumStakeTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakedBalances",
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
    name: "stakedToken",
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
    name: "totalStakedSupply",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawalsPaused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6101006040523480156200001257600080fd5b506040516200336138038062003361833981810160405281019062000038919062000235565b60006200004a620001ff60201b60201c565b9050806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a350600180819055508673ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b815250508573ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1660601b815250508460c0818152505083600781905550826008819055508160e0818152505080600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600960146101000a81548160ff0219169083151502179055506000600960156101000a81548160ff0219169083151502179055505050505050505062000354565b600033905090565b600081519050620002188162000320565b92915050565b6000815190506200022f816200033a565b92915050565b600080600080600080600060e0888a0312156200025157600080fd5b6000620002618a828b0162000207565b9750506020620002748a828b0162000207565b9650506040620002878a828b016200021e565b95505060606200029a8a828b016200021e565b9450506080620002ad8a828b016200021e565b93505060a0620002c08a828b016200021e565b92505060c0620002d38a828b0162000207565b91505092959891949750929550565b6000620002ef82620002f6565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6200032b81620002e2565b81146200033757600080fd5b50565b620003458162000316565b81146200035157600080fd5b50565b60805160601c60a05160601c60c05160e051612f6b620003f660003960008181610d35015281816113690152611e3501526000818161144a0152611c02015260008181610d8e01528181610e3f0152818161165d0152818161174a01528181611a9701528181611bde01528181611e8e0152611f3f0152600081816108ea0152818161097701528181610fa60152818161103301526123db0152612f6b6000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c80638da5cb5b116100f9578063db2e21bc11610097578063f2ccb6d911610071578063f2ccb6d9146104ab578063f2fde38b146104c9578063f4cc87ba146104e5578063f7c618c114610501576101c4565b8063db2e21bc14610467578063e942204614610471578063e9f2838e1461048d576101c4565b8063b6b55f25116100d3578063b6b55f25146103f1578063bcdc3cfc1461040d578063cc7a262e1461042b578063d82a2aa614610449576101c4565b80638da5cb5b14610387578063af62f747146103a5578063b67c15b4146103d5576101c4565b80633ccfd60b116101665780636b036f45116101405780636b036f4514610325578063715018a614610343578063738b62e51461034d5780638169779b14610369576101c4565b80633ccfd60b146102cd57806355db2703146102d757806360da3e8314610307576101c4565b806319f48cff116101a257806319f48cff1461024557806322f6d00314610275578063242df9e1146102a5578063372500ab146102c3576101c4565b806303237a04146101c95780630d29fcd4146101f95780631460fa8714610215575b600080fd5b6101e360048036038101906101de91906124c6565b61051f565b6040516101f09190612a3a565b60405180910390f35b610213600480360381019061020e9190612541565b610587565b005b61022f600480360381019061022a91906124c6565b61060d565b60405161023c9190612a3a565b60405180910390f35b61025f600480360381019061025a91906124c6565b610625565b60405161026c9190612a3a565b60405180910390f35b61028f600480360381019061028a91906124c6565b61063d565b60405161029c9190612a3a565b60405180910390f35b6102ad610655565b6040516102ba9190612a3a565b60405180910390f35b6102cb61065b565b005b6102d5610a73565b005b6102f160048036038101906102ec91906124c6565b611134565b6040516102fe9190612a3a565b60405180910390f35b61030f61114c565b60405161031c9190612849565b60405180910390f35b61032d61115f565b60405161033a9190612a3a565b60405180910390f35b61034b611165565b005b610367600480360381019061036291906124ef565b61129f565b005b610371611367565b60405161037e9190612a3a565b60405180910390f35b61038f61138b565b60405161039c91906127a5565b60405180910390f35b6103bf60048036038101906103ba91906124c6565b6113b4565b6040516103cc9190612a3a565b60405180910390f35b6103ef60048036038101906103ea91906124c6565b6114fd565b005b61040b60048036038101906104069190612541565b6115bd565b005b610415611bd6565b6040516104229190612a3a565b60405180910390f35b610433611bdc565b6040516104409190612864565b60405180910390f35b610451611c00565b60405161045e9190612a3a565b60405180910390f35b61046f611c24565b005b61048b60048036038101906104869190612541565b6120a9565b005b61049561212f565b6040516104a29190612849565b60405180910390f35b6104b3612142565b6040516104c091906127a5565b60405180910390f35b6104e360048036038101906104de91906124c6565b612168565b005b6104ff60048036038101906104fa91906124ef565b612311565b005b6105096123d9565b604051610516919061287f565b60405180910390f35b60008061052b836113b4565b905061057f600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054826123fd90919063ffffffff16565b915050919050565b61058f612413565b73ffffffffffffffffffffffffffffffffffffffff166105ad61138b565b73ffffffffffffffffffffffffffffffffffffffff1614610603576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105fa9061297a565b60405180910390fd5b8060078190555050565b60036020528060005260406000206000915090505481565b60046020528060005260406000206000915090505481565b60056020528060005260406000206000915090505481565b60085481565b600260015414156106a1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610698906129fa565b60405180910390fd5b6002600181905550600960159054906101000a900460ff16156106f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f09061299a565b60405180910390fd5b6000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008111610780576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107779061295a565b60405180910390fd5b600854600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054426107ce9190612b47565b101561080f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610806906129ba565b60405180910390fd5b600061081a3361051f565b90506000811161085f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108569061289a565b60405180910390fd5b42600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166340c10f1933836040518363ffffffff1660e01b8152600401610943929190612820565b600060405180830381600087803b15801561095d57600080fd5b505af1158015610971573d6000803e3d6000fd5b505050507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166340c10f19600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b81526004016109f2929190612820565b600060405180830381600087803b158015610a0c57600080fd5b505af1158015610a20573d6000803e3d6000fd5b50505050803373ffffffffffffffffffffffffffffffffffffffff167f75690555e75b04e280e646889defdcbefd8401507e5394d1173fd84290944c2960405160405180910390a3505060018081905550565b60026001541415610ab9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ab0906129fa565b60405180910390fd5b6002600181905550600960159054906101000a900460ff1615610b11576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b089061299a565b60405180910390fd5b6000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008111610b98576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b8f9061295a565b60405180910390fd5b6000600854600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205442610be89190612b47565b10610bf957610bf63361051f565b90505b6000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610cdd8260025461241b90919063ffffffff16565b6002819055506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000610d71612710610d637f00000000000000000000000000000000000000000000000000000000000000008661243190919063ffffffff16565b61244790919063ffffffff16565b90506000610d88828561241b90919063ffffffff16565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff1660e01b8152600401610de7929190612820565b602060405180830381600087803b158015610e0157600080fd5b505af1158015610e15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e399190612518565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866040518363ffffffff1660e01b8152600401610eba929190612820565b602060405180830381600087803b158015610ed457600080fd5b505af1158015610ee8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f0c9190612518565b9050818015610f185750805b610f57576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4e906129da565b60405180910390fd5b823373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b6560405160405180910390a36000851115611125577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166340c10f1933876040518363ffffffff1660e01b8152600401610fff929190612820565b600060405180830381600087803b15801561101957600080fd5b505af115801561102d573d6000803e3d6000fd5b505050507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166340c10f19600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16876040518363ffffffff1660e01b81526004016110ae929190612820565b600060405180830381600087803b1580156110c857600080fd5b505af11580156110dc573d6000803e3d6000fd5b50505050843373ffffffffffffffffffffffffffffffffffffffff167f75690555e75b04e280e646889defdcbefd8401507e5394d1173fd84290944c2960405160405180910390a35b50505050505060018081905550565b60066020528060005260406000206000915090505481565b600960149054906101000a900460ff1681565b60075481565b61116d612413565b73ffffffffffffffffffffffffffffffffffffffff1661118b61138b565b73ffffffffffffffffffffffffffffffffffffffff16146111e1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111d89061297a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a360008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6112a7612413565b73ffffffffffffffffffffffffffffffffffffffff166112c561138b565b73ffffffffffffffffffffffffffffffffffffffff161461131b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113129061297a565b60405180910390fd5b80600960146101000a81548160ff0219169083151502179055508015157f5ef34f53269a04b5b817e5be24a51ba6b477118b399ec9dd5b2baf5b299563dc60405160405180910390a250565b7f000000000000000000000000000000000000000000000000000000000000000081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60008061143b601861142d603c61141f603c600560008a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054426114119190612b47565b61244790919063ffffffff16565b61244790919063ffffffff16565b61244790919063ffffffff16565b905060006114c56127106114b77f0000000000000000000000000000000000000000000000000000000000000000600360008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461243190919063ffffffff16565b61244790919063ffffffff16565b905060006114f0836114e261016d8561244790919063ffffffff16565b61243190919063ffffffff16565b9050809350505050919050565b611505612413565b73ffffffffffffffffffffffffffffffffffffffff1661152361138b565b73ffffffffffffffffffffffffffffffffffffffff1614611579576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115709061297a565b60405180910390fd5b80600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60026001541415611603576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115fa906129fa565b60405180910390fd5b6002600181905550600960149054906101000a900460ff161561165b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116529061291a565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b81526004016116b69291906127c0565b60206040518083038186803b1580156116ce57600080fd5b505afa1580156116e2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611706919061256a565b811115611748576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161173f90612a1a565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016117a191906127a5565b60206040518083038186803b1580156117b957600080fd5b505afa1580156117cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117f1919061256a565b811115611833576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161182a906128ba565b60405180910390fd5b600754811015611878576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161186f906128da565b60405180910390fd5b6000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000811115611912576118ce3361051f565b600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b611927826002546123fd90919063ffffffff16565b60028190555061197f82600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546123fd90919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541415611a4f5742600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b42600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b8152600401611af2939291906127e9565b602060405180830381600087803b158015611b0c57600080fd5b505af1158015611b20573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b449190612518565b905080611b86576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b7d9061293a565b60405180910390fd5b823373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c60405160405180910390a350506001808190555050565b60025481565b7f000000000000000000000000000000000000000000000000000000000000000081565b7f000000000000000000000000000000000000000000000000000000000000000081565b60026001541415611c6a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c61906129fa565b60405180910390fd5b60026001819055506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008111611cf9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cf09061295a565b60405180910390fd5b611d0e8160025461241b90919063ffffffff16565b6002819055506000600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000611e71612710611e637f00000000000000000000000000000000000000000000000000000000000000008561243190919063ffffffff16565b61244790919063ffffffff16565b90506000611e88828461241b90919063ffffffff16565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff1660e01b8152600401611ee7929190612820565b602060405180830381600087803b158015611f0157600080fd5b505af1158015611f15573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f399190612518565b905060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16866040518363ffffffff1660e01b8152600401611fba929190612820565b602060405180830381600087803b158015611fd457600080fd5b505af1158015611fe8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061200c9190612518565b90508180156120185750805b612057576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161204e906129da565b60405180910390fd5b823373ffffffffffffffffffffffffffffffffffffffff167f23d6711a1d031134a36921253c75aa59e967d38e369ac625992824315e204f2060405160405180910390a3505050505060018081905550565b6120b1612413565b73ffffffffffffffffffffffffffffffffffffffff166120cf61138b565b73ffffffffffffffffffffffffffffffffffffffff1614612125576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161211c9061297a565b60405180910390fd5b8060088190555050565b600960159054906101000a900460ff1681565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b612170612413565b73ffffffffffffffffffffffffffffffffffffffff1661218e61138b565b73ffffffffffffffffffffffffffffffffffffffff16146121e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121db9061297a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415612254576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161224b906128fa565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff1660008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b612319612413565b73ffffffffffffffffffffffffffffffffffffffff1661233761138b565b73ffffffffffffffffffffffffffffffffffffffff161461238d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016123849061297a565b60405180910390fd5b80600960156101000a81548160ff0219169083151502179055508015157f129d33f7856617012aed60524381cfff7233cfc57df58d9f6613a5593d3dc21860405160405180910390a250565b7f000000000000000000000000000000000000000000000000000000000000000081565b6000818361240b9190612a66565b905092915050565b600033905090565b600081836124299190612b47565b905092915050565b6000818361243f9190612aed565b905092915050565b600081836124559190612abc565b905092915050565b60008135905061246c81612ef0565b92915050565b60008135905061248181612f07565b92915050565b60008151905061249681612f07565b92915050565b6000813590506124ab81612f1e565b92915050565b6000815190506124c081612f1e565b92915050565b6000602082840312156124d857600080fd5b60006124e68482850161245d565b91505092915050565b60006020828403121561250157600080fd5b600061250f84828501612472565b91505092915050565b60006020828403121561252a57600080fd5b600061253884828501612487565b91505092915050565b60006020828403121561255357600080fd5b60006125618482850161249c565b91505092915050565b60006020828403121561257c57600080fd5b600061258a848285016124b1565b91505092915050565b61259c81612b7b565b82525050565b6125ab81612b8d565b82525050565b6125ba81612bc3565b82525050565b6125c981612be7565b82525050565b60006125dc601283612a55565b91506125e782612c69565b602082019050919050565b60006125ff601883612a55565b915061260a82612c92565b602082019050919050565b6000612622602c83612a55565b915061262d82612cbb565b604082019050919050565b6000612645602683612a55565b915061265082612d0a565b604082019050919050565b6000612668601383612a55565b915061267382612d59565b602082019050919050565b600061268b601683612a55565b915061269682612d82565b602082019050919050565b60006126ae601183612a55565b91506126b982612dab565b602082019050919050565b60006126d1602083612a55565b91506126dc82612dd4565b602082019050919050565b60006126f4601483612a55565b91506126ff82612dfd565b602082019050919050565b6000612717602183612a55565b915061272282612e26565b604082019050919050565b600061273a601183612a55565b915061274582612e75565b602082019050919050565b600061275d601f83612a55565b915061276882612e9e565b602082019050919050565b6000612780601483612a55565b915061278b82612ec7565b602082019050919050565b61279f81612bb9565b82525050565b60006020820190506127ba6000830184612593565b92915050565b60006040820190506127d56000830185612593565b6127e26020830184612593565b9392505050565b60006060820190506127fe6000830186612593565b61280b6020830185612593565b6128186040830184612796565b949350505050565b60006040820190506128356000830185612593565b6128426020830184612796565b9392505050565b600060208201905061285e60008301846125a2565b92915050565b600060208201905061287960008301846125b1565b92915050565b600060208201905061289460008301846125c0565b92915050565b600060208201905081810360008301526128b3816125cf565b9050919050565b600060208201905081810360008301526128d3816125f2565b9050919050565b600060208201905081810360008301526128f381612615565b9050919050565b6000602082019050818103600083015261291381612638565b9050919050565b600060208201905081810360008301526129338161265b565b9050919050565b600060208201905081810360008301526129538161267e565b9050919050565b60006020820190508181036000830152612973816126a1565b9050919050565b60006020820190508181036000830152612993816126c4565b9050919050565b600060208201905081810360008301526129b3816126e7565b9050919050565b600060208201905081810360008301526129d38161270a565b9050919050565b600060208201905081810360008301526129f38161272d565b9050919050565b60006020820190508181036000830152612a1381612750565b9050919050565b60006020820190508181036000830152612a3381612773565b9050919050565b6000602082019050612a4f6000830184612796565b92915050565b600082825260208201905092915050565b6000612a7182612bb9565b9150612a7c83612bb9565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612ab157612ab0612c0b565b5b828201905092915050565b6000612ac782612bb9565b9150612ad283612bb9565b925082612ae257612ae1612c3a565b5b828204905092915050565b6000612af882612bb9565b9150612b0383612bb9565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615612b3c57612b3b612c0b565b5b828202905092915050565b6000612b5282612bb9565b9150612b5d83612bb9565b925082821015612b7057612b6f612c0b565b5b828203905092915050565b6000612b8682612b99565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000612bce82612bd5565b9050919050565b6000612be082612b99565b9050919050565b6000612bf282612bf9565b9050919050565b6000612c0482612b99565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e4f2050454e44494e4720524557415244530000000000000000000000000000600082015250565b7f4e4f5420454e4f55474820544f4b454e2042414c414e43450000000000000000600082015250565b7f414d4f554e542043414e4e4f5420424520534d414c4c4552205448414e204d4960008201527f4e494d554d20414d4f554e540000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4445504f53495453204152452050415553454400000000000000000000000000600082015250565b7f5452414e534645525f46524f4d20524556455254454400000000000000000000600082015250565b7f4e4f205354414b45442042414c414e4345000000000000000000000000000000600082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f5749544844524157532041524520504155534544000000000000000000000000600082015250565b7f4d494e494d554d205354414b452054494d4520484153204e4f5420504153534560008201527f4400000000000000000000000000000000000000000000000000000000000000602082015250565b7f5452414e53464552205245564552544544000000000000000000000000000000600082015250565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00600082015250565b7f4e4f5420454e4f55474820414c4c4f57414e4345000000000000000000000000600082015250565b612ef981612b7b565b8114612f0457600080fd5b50565b612f1081612b8d565b8114612f1b57600080fd5b50565b612f2781612bb9565b8114612f3257600080fd5b5056fea264697066735822122016cb5c5c0360ebeb89f334bbe089b9fbcf7a9e43b6f994d8d0f05524cde08d9664736f6c63430008040033";