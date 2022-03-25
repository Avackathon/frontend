import axios from "axios"
import { action, Action, thunk, Thunk } from "easy-peasy"
import { Status } from "../utils/types"

export type Subnet = {
  id: string
  controlKeys: Array<string>
}
export type SubnetsState = {
  fetchingStatus: Status
  subnets: Array<Subnet>
}

export type SubnetsModel = SubnetsState & {
  setFetchStatus: Action<SubnetsModel, Status>
  setSubnet: Action<SubnetsModel, Subnet>

  fetchSubnets: Thunk<SubnetsModel>
}

export const initialSubnetsModel: SubnetsModel = {
  fetchingStatus: Status.UNDEFINED,
  subnets: new Array<Subnet>(),
  setFetchStatus: action((state, payload) => {
    state.fetchingStatus = payload
  }),
  setSubnet: action((state, payload) => {
    const index = state.subnets.findIndex((el) => el.id == payload.id)
    if (index === -1) state.subnets.push(payload)
  }),
  fetchSubnets: thunk(async (actions, payload, helpers) => {
    actions.setFetchStatus(Status.PENDING)
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
      })
      actions.setFetchStatus(Status.SUCCESS)
    } catch (e) {
      actions.setFetchStatus(Status.FAILED)
      helpers.fail((e as Error).message)
    }
  }),
}
