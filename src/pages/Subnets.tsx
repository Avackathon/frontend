import { Actions, useStoreActions, useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"
import Paginator from "../components/Paginator"
import "../index.css"
import { RootModel } from "../store"
import { CheckCircleIcon } from "@heroicons/react/solid"
import SubnetListElement from "../components/SubnetListElement"
import WalletConnect from "../components/WalletConnect"
import RegisterModal from "../components/RegisterModal"
import ClaimSubnetModal from "../components/ClaimSubnetModal"

const Subnets = () => {
  const fetchSubnets = useStoreActions(
    (actions: Actions<RootModel>) => actions.subnets.fetchSubnets
  )
  const subnets = useStoreState((state: RootModel) => state.subnets.subnets)

  const [registerUserModalOpen, setRegisterUserModalOpen] = useState(false)
  const [claimSubnetModalOpen, setClaimSubnetModalOpen] = useState(false)

  useEffect(() => {
    fetchSubnets()
  }, [])

  return (
    <div className="">
      <WalletConnect />
      <p onClick={() => setRegisterUserModalOpen(true)}>Register User</p>
      <p onClick={() => setClaimSubnetModalOpen(true)}> Claim subnet</p>
      <RegisterModal
        open={registerUserModalOpen}
        onClose={() => {
          setRegisterUserModalOpen(false)
        }}
      />
      {subnets.slice(0, 10).map((sub) => {
        return <SubnetListElement {...sub} />
      })}
      <Paginator />
    </div>
  )
}

export default Subnets
