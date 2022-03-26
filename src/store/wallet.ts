import axios from "axios"
import { action, Action, thunk, Thunk } from "easy-peasy"
import Web3 from "web3"
import { subNavABI } from "../utils/abi/SubNav"
import {
  RPC_URL,
  SUBNAV_CONTRACT_ADDRESS,
  SUPPORTED_CHAIN_ID,
} from "../utils/chain_infos"
import { Status } from "../utils/types"

export type EnrichedUserInfos = {
  email: string
  twitterHandle: string
}
export type WalletState = {
  connectionStatus: Status
  address?: string
  infos?: EnrichedUserInfos
  rightChain?: boolean
}
export type WalletModel = WalletState & {
  setConnectionStatus: Action<WalletModel, Status>
  setWalletAddress: Action<WalletModel, string>
  setRightChain: Action<WalletModel, boolean>
  setEnrichedUserInfos: Action<WalletModel, EnrichedUserInfos>
  connectWallet: Thunk<WalletModel>
  registerUser: Thunk<WalletModel, EnrichedUserInfos>
  addNewNetwork: Thunk<WalletModel>
  getFaucetTokens: Thunk<WalletModel, string>
}
declare let window: any
const web3 = new Web3(window.ethereum)

const subnetNavContract = new web3.eth.Contract(
  subNavABI as any,
  SUBNAV_CONTRACT_ADDRESS
)
export const initialWalletModel: WalletModel = {
  connectionStatus: Status.UNDEFINED,
  setConnectionStatus: action((state, payload) => {
    state.connectionStatus = payload
  }),
  setWalletAddress: action((state, payload) => {
    state.address = payload
  }),
  setRightChain: action((state, payload) => {
    state.rightChain = payload
  }),
  setEnrichedUserInfos: action((state, payload) => {
    state.infos = payload
  }),
  connectWallet: thunk(async (actions, payload, helpers) => {
    const state = helpers.getState()
    if (
      window.ethereum &&
      (state.connectionStatus === Status.UNDEFINED ||
        state.connectionStatus === Status.FAILED)
    ) {
      actions.setConnectionStatus(Status.PENDING)
      try {
        await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        let provider = new Web3(window.ethereum)
        const accounts = await provider.eth.getAccounts()
        const address = accounts[0]
        const chainId = await provider.eth.getChainId()
        const rightChainId = chainId === SUPPORTED_CHAIN_ID
        provider = rightChainId
          ? new Web3(window.ethereum)
          : new Web3(new Web3.providers.HttpProvider(RPC_URL))

        console.log("ADDRESS: ", address)
        actions.setWalletAddress(address)
        actions.setConnectionStatus(Status.SUCCESS)
        window.ethereum.on("chainChanged", (chainId: string) => {
          const rightChainId = parseInt(chainId, 16) === SUPPORTED_CHAIN_ID

          console.log("CHAIN CHANGED: ")
          //Change chain
        })

        window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
          const address = accounts[0]
          console.log("ACCOUNT CHANGED: ", address)
          if (!address) {
            actions.setConnectionStatus(Status.UNDEFINED)
            return
          }

          actions.setConnectionStatus(Status.SUCCESS)
          actions.setWalletAddress(address)
        })
      } catch (error) {
        console.log("Website connection rejected", (error as Error).message)
        actions.setConnectionStatus(Status.FAILED)
      }
    } else {
      console.log("No web3 wallet")
      actions.setConnectionStatus(Status.FAILED)
      return
    }
  }),
  registerUser: thunk(async (actions, payload, helpers) => {
    const state = helpers.getState()
    actions.setEnrichedUserInfos(payload)
    try {
      await subnetNavContract.methods
        .registerUser(payload.email, payload.twitterHandle)
        .send({ from: state.address })
    } catch (e) {
      helpers.fail((e as Error).message)
    }
  }),
  addNewNetwork: thunk(async (actions, undefined, helpers) => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x339d",
            chainName: "Avalanche Fuji SubNav",
            nativeCurrency: {
              name: "SubNav Coin",
              symbol: "SUB",
              decimals: 18,
            },
            rpcUrls: [RPC_URL],
          },
        ],
      })
    } catch (e) {
      helpers.fail((e as Error).message)
    }
  }),
  getFaucetTokens: thunk(async (actions, payload, helpers) => {
    try {
      const config = {
        url: "https://api.subnav.network/faucet/" + payload,
        method: "GET",
        headers: {
          // "Access-Control-Allow-Origin": "*",
          // origin: "x-requested-with",
          // "Access-Control-Allow-Headers":
          //   "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
          // "Content-Type": "application/json",
        },
      }
      const res = await axios(config as any)
      console.log("Faucet response: " + res)
    } catch (e) {
      helpers.fail((e as Error).message)
    }
  }),
}
