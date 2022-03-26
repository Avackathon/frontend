import { Actions, State, useStoreActions, useStoreState } from "easy-peasy"
import { useEffect, useMemo, useState } from "react"
import Paginator from "../components/Paginator"
import RegisterModal from "../components/RegisterModal"
import SubnetListElement from "../components/SubnetListElement"
import WalletConnect from "../components/WalletConnect"
import "../index.css"
import { RootModel } from "../store"
import { EVMID, SPACESVMID, TIMESTAMPVMID } from "../utils/blockchains"

const Subnets = () => {
  const walletActions = useStoreActions(
    (actions: Actions<RootModel>) => actions.wallet
  )
  const walletState = useStoreState((state: State<RootModel>) => state.wallet)

  useEffect(() => {
    walletActions.connectWallet()
  }, [])
  useEffect(() => {
    walletActions.addNewNetwork()
  }, [walletState, walletActions])
  const fetchSubnets = useStoreActions(
    (actions: Actions<RootModel>) => actions.subnets.fetchSubnets
  )
  const subnets = useStoreState((state: RootModel) => state.subnets.subnets)
  const blockchains = useStoreState(
    (state: RootModel) => state.subnets.blockchains
  )

  const [registerUserModalOpen, setRegisterUserModalOpen] = useState(false)
  const [claimSubnetModalOpen, setClaimSubnetModalOpen] = useState(false)
  const [startingItem, setStartingItem] = useState(0)

  const [filterClaimed, setFilterClaimed] = useState(false)
  const [filterEVM, setFilterEVM] = useState(false)
  const [filterTimestampVM, setFilterTimestampVM] = useState(false)
  const [filterSpacesVM, setFilterSpacesVM] = useState(false)

  const filteredSubnets = useMemo(() => {
    const filter1 = filterClaimed
      ? subnets.filter((el) => el.name !== undefined)
      : subnets
    const filter2 = filterEVM
      ? filter1.filter(
          (el) =>
            blockchains.findIndex(
              (bc) => bc.subnetId === el.id && bc.vmId === EVMID
            ) !== 1
        )
      : filter1
    const filter3 = filterSpacesVM
      ? filter1.filter(
          (el) =>
            blockchains.findIndex(
              (bc) => bc.subnetId === el.id && bc.vmId === SPACESVMID
            ) !== 1
        )
      : filter2
    const filter4 = filterTimestampVM
      ? filter1.filter(
          (el) =>
            blockchains.findIndex(
              (bc) => bc.subnetId === el.id && bc.vmId === TIMESTAMPVMID
            ) !== 1
        )
      : filter3

    return filter4
  }, [
    subnets,
    filterClaimed,
    filterEVM,
    blockchains,
    filterSpacesVM,
    filterTimestampVM,
  ])

  const pageSize = 40
  useEffect(() => {
    fetchSubnets()
  }, [])

  return (
    <div className="">
      <div className="h-10 bg-cyan-300">
        <span
          onClick={() => {
            console.log("filter")
            setFilterClaimed(!filterClaimed)
          }}
        >
          filter Claimed subnets
        </span>
        <span
          onClick={() => {
            setFilterEVM(!filterEVM)
          }}
        >
          {" "}
          EVM
        </span>
        <span
          onClick={() => {
            setFilterSpacesVM(!filterSpacesVM)
          }}
        >
          SpacesVM
        </span>
        <span
          onClick={() => {
            setFilterTimestampVM(!filterTimestampVM)
          }}
        >
          TimestampVM
        </span>
      </div>
      <WalletConnect />
      <p onClick={() => setRegisterUserModalOpen(true)}>Register User</p>
      <p onClick={() => setClaimSubnetModalOpen(true)}> Claim subnet</p>
      <RegisterModal
        open={registerUserModalOpen}
        onClose={() => {
          setRegisterUserModalOpen(false)
        }}
      />
      {filteredSubnets
        .slice(
          startingItem,
          Math.min(startingItem + pageSize, filteredSubnets.length)
        )
        .map((sub) => {
          return <SubnetListElement key={sub.id} {...sub} />
        })}
      <Paginator
        pageSize={40}
        totalItems={filteredSubnets.length}
        onNext={() => {
          setStartingItem(
            Math.min(startingItem + pageSize, filteredSubnets.length - pageSize)
          )
        }}
        onPrevious={() => {
          setStartingItem(Math.max(0, startingItem - pageSize))
        }}
        onPage={(num) => {
          setStartingItem(num * pageSize)
        }}
        startingIndex={startingItem}
      />
    </div>
  )
}

export default Subnets
