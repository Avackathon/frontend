import axios from "axios"
import { action, Action, thunk, Thunk } from "easy-peasy"
import Web3 from "web3"
import { Status } from "../utils/types"
import { SUBNAV_CONTRACT_ADDRESS } from "../utils/chain_infos"
import { subNavABI } from "../utils/abi/SubNav"

declare let window: any
const web3 = new Web3(window.ethereum)

const subnetNavContract = new web3.eth.Contract(
  subNavABI as any,
  SUBNAV_CONTRACT_ADDRESS
)
export type Blockchain = {
  id: string
  name: string
  subnetId: string
  vmId: string
}
export type User = {
  mail: string
  twitterHandle?: string
  cChainAddress?: string
}
export type Subnet = {
  id: string
  name?: string
  description?: string
  owner?: User
  controlKeys: Array<string>
}
export type SubnetsState = {
  fetchingSubnetsStatus: Status
  fetchingBlockchainsStatus: Status
  subnets: Array<Subnet>
  blockchains: Array<Blockchain>
}

export type SubnetsModel = SubnetsState & {
  setFetchSubnetsStatus: Action<SubnetsModel, Status>
  setFetchBlockchainsStatus: Action<SubnetsModel, Status>

  setSubnet: Action<SubnetsModel, Subnet>
  setBlockchain: Action<SubnetsModel, Blockchain>

  fetchSubnets: Thunk<SubnetsModel>
  fetchBlockchains: Thunk<SubnetsModel>
  fetchSubnetInfos: Thunk<SubnetsModel, Subnet>
  claimSubnet: Thunk<SubnetsModel, { subnetId: string }>
}

export const initialSubnetsModel: SubnetsModel = {
  fetchingSubnetsStatus: Status.UNDEFINED,
  fetchingBlockchainsStatus: Status.UNDEFINED,

  subnets: new Array<Subnet>(),
  blockchains: new Array<Blockchain>(),
  setFetchSubnetsStatus: action((state, payload) => {
    state.fetchingSubnetsStatus = payload
  }),
  setFetchBlockchainsStatus: action((state, payload) => {
    state.fetchingBlockchainsStatus = payload
  }),
  setSubnet: action((state, payload) => {
    const index = state.subnets.findIndex((el) => el.id == payload.id)
    if (index === -1) state.subnets.push(payload)
    else {
      state.subnets[index] = payload
    }
  }),
  setBlockchain: action((state, payload) => {
    const index = state.blockchains.findIndex((el) => el.id == payload.id)
    if (index === -1) state.blockchains.push(payload)
  }),
  fetchSubnets: thunk(async (actions, payload, helpers) => {
    actions.setFetchSubnetsStatus(Status.PENDING)
    const data = JSON.stringify({
      jsonrpc: "2.0",
      method: "platform.getSubnets",
      params: {},
      id: 1,
    })
    const config = {
      method: "post",
      url: "https://api.avax-test.network:443/ext/bc/P",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }

    try {
      const res = await axios(config as any)
      const formatted = res.data
      const subnets = (formatted["result"]["subnets"] as Array<any>).map(
        (el) => {
          return { id: el.id, controlKeys: el.controlKeys } as Subnet
        }
      )
      subnets.forEach((sub) => {
        actions.setSubnet(sub)
        actions.fetchSubnetInfos(sub)
      })
      actions.setFetchSubnetsStatus(Status.SUCCESS)
      actions.fetchBlockchains()
    } catch (e) {
      actions.setFetchSubnetsStatus(Status.FAILED)
      helpers.fail((e as Error).message)
    }
  }),
  fetchBlockchains: thunk(async (actions, payload, helpers) => {
    actions.setFetchBlockchainsStatus(Status.PENDING)
    const data = JSON.stringify({
      jsonrpc: "2.0",
      method: "platform.getBlockchains",
      params: {},
      id: 1,
    })

    const config = {
      method: "post",
      url: "https://api.avax-test.network:443/ext/bc/P",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    }
    try {
      const res = await axios(config as any)
      const formatted = res.data

      const blockchains = (
        formatted["result"]["blockchains"] as Array<any>
      ).map((el) => {
        return {
          id: el.id,
          name: el.name,
          subnetId: el.subnetID,
          vmId: el.vmID,
        } as Blockchain
      })
      blockchains.forEach((bc) => {
        actions.setBlockchain(bc)
      })
      actions.setFetchBlockchainsStatus(Status.SUCCESS)
    } catch (e) {
      actions.setFetchBlockchainsStatus(Status.FAILED)
      helpers.fail((e as Error).message)
    }
  }),
  fetchSubnetInfos: thunk(async (actions, payload, helpers) => {
    const res = await subnetNavContract.methods.subnets(payload.id).call()
    if (res[0] !== "") {
      const enrichedSubnet = {
        ...payload,
        name: res["name"],
        description: res["description"],
      } as Subnet
      actions.setSubnet(enrichedSubnet)
    }
    // console.log(res)
  }),
  claimSubnet: thunk((actions, payload, helpers) => {
    console.log("Claiming subnet ", payload)
  }),
}
