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
  registerUser: Thunk<WalletModel>
  claimSubnet: Thunk<WalletModel, { subnetId: string }>
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
      (window.ethereum && state.connectionStatus === Status.UNDEFINED) ||
      Status.FAILED
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

        actions.setWalletAddress(address)
        actions.setConnectionStatus(Status.SUCCESS)
        window.ethereum.on("chainChanged", (chainId: string) => {
          const rightChainId = parseInt(chainId, 16) === SUPPORTED_CHAIN_ID
          const provider = rightChainId
            ? new Web3(window.ethereum)
            : new Web3(new Web3.providers.HttpProvider(RPC_URL))

          //Change chain
        })

        window.ethereum.on("accountsChanged", (accounts: Array<string>) => {
          const address = accounts[0]
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
  registerUser: thunk((actions, payload, helpers) => {}),
  claimSubnet: thunk((actions, payload, helpers) => {}),
}
