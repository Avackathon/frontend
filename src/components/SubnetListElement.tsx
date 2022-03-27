import { CheckCircleIcon, KeyIcon } from "@heroicons/react/outline"
import { Actions, State, useStoreActions, useStoreState } from "easy-peasy"
import { useEffect, useMemo, useState } from "react"
import { RootModel } from "../store"
import { Blockchain, Subnet } from "../store/subnets"
import { EVMID, SPACESVMID, TIMESTAMPVMID } from "../utils/blockchains"
import RegisterSubnetModal from "./RegisterSubnetModal"

const VMIndicator = (props: { name: string }) => {
  if (props.name === "evm") {
    return (
      <span className="rounded float-right p-1 m-1 text-xs font-bold text-center text-white bg-green-700">
        {props.name}
      </span>
    )
  } else
    return (
      <span className="rounded float-right p-1 m-1 text-xs font-bold text-center text-white  bg-orange-700">
        {props.name}
      </span>
    )
}
const SubnetHeader = (props: Subnet) => {
  const walletState = useStoreState((state: State<RootModel>) => state.wallet)
  const claim = useStoreActions(
    (actions: Actions<RootModel>) => actions.subnets.claimSubnet
  )
  const registerSubnet = useStoreActions(
    (actions: Actions<RootModel>) => actions.subnets.registerSubnet
  )
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="flex flex-row items-center h-10">
      <RegisterSubnetModal
        open={modalOpen}
        id={props.id}
        onClose={() => setModalOpen(false)}
        name={props.name}
      />
      <p className=" font-bold">{props.name ? props.name : props.id}</p>
      {props.owner?.cChainAddress ? (
        <>
          <CheckCircleIcon className=" stroke-green-600 h-4 w-4 mx-2 " />
          {props.owner?.cChainAddress === walletState.address ? (
            <div
              onClick={() => {
                setModalOpen(true)
              }}
              className=" text-sm rounded-xl  bg-slate-500 px-2 py-0.5 ml-6 text-white hover:bg-slate-400 "
            >
              Update Infos
            </div>
          ) : undefined}
        </>
      ) : walletState.address ? (
        <div
          onClick={() => {
            claim(props.id)
          }}
          className=" text-sm rounded-xl  bg-slate-500 px-2 py-0.5 ml-6 text-white hover:bg-slate-400 "
        >
          claim
        </div>
      ) : undefined}
    </div>
  )
}
const SubnetInfos = (props: Subnet) => {
  return (
    <div className=" p-3 flex flex-row   ">
      <div className=" w-3/12  mx-3">
        <p className="font-bold">Description</p>
        <p>{props.description}</p>
      </div>
      {props.owner && props.owner.mail !== "" ? (
        <div className=" w-8/12 mx-3">
          <p className="font-bold">Owner Infos</p>
          <p>C-Chain: {props.owner.cChainAddress}</p>
          <p>Mail: {props.owner.mail}</p>
          <p>twitter: {props.owner.twitterHandle}</p>
        </div>
      ) : undefined}
    </div>
  )
}
const BlockchainsInfos = (props: { blockchains: Array<Blockchain> }) => {
  return (
    <div className=" p-3 mt-2 ">
      <p className="font-bold">Blockchains</p>
      {props.blockchains.map((el) => {
        return (
          <div className="rounded-xl  w-1/2 p-2 text-sm my-1 bg-slate-600 text-white  ">
            <div>
              <p>
                {el.vmId} &emsp;
                <b>{el.name} </b>
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const SubnetListElement = (props: Subnet) => {
  const blockchains = useStoreState(
    (state: State<RootModel>) => state.subnets.blockchains
  )
  const subnetBlockchains = useMemo(() => {
    return blockchains.filter((el) => el.subnetId === props.id)
  }, [blockchains, props])

  const hasEVM = useMemo(() => {
    return subnetBlockchains.findIndex((el) => el.vmId === EVMID) !== -1
  }, [subnetBlockchains])
  const hasSpaces = useMemo(() => {
    return subnetBlockchains.findIndex((el) => el.vmId === SPACESVMID) !== -1
  }, [subnetBlockchains])
  const hasTimestamp = useMemo(() => {
    return subnetBlockchains.findIndex((el) => el.vmId === TIMESTAMPVMID) !== -1
  }, [subnetBlockchains])
  return (
    <div className="rounded bg-slate-300 p-3  odd:bg-slate-200  mx-auto w-10/12 mt-4">
      {hasEVM ? <VMIndicator name="evm" /> : undefined}
      {hasSpaces ? <VMIndicator name="spacesVM" /> : undefined}
      {hasTimestamp ? <VMIndicator name="timestampVM" /> : undefined}
      <SubnetHeader {...props} />
      {props.name ? <SubnetInfos {...props} /> : undefined}
      {subnetBlockchains.length > 0 ? (
        <BlockchainsInfos blockchains={subnetBlockchains} />
      ) : undefined}
    </div>
  )
}

export default SubnetListElement
