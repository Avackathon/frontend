import { Actions, useStoreActions, useStoreState } from "easy-peasy"
import { useEffect } from "react"
import Paginator from "../components/Paginator"
import "../index.css"
import { RootModel } from "../store"
import { CheckCircleIcon } from "@heroicons/react/solid"
import SubnetListElement from "../components/SubnetListElement"
import WalletConnect from "../components/WalletConnect"
import RegisterModal from "../components/RegisterModal"

const Subnets = () => {
  const fetchSubnets = useStoreActions(
    (actions: Actions<RootModel>) => actions.subnets.fetchSubnets
  )
  const subnets = useStoreState((state: RootModel) => state.subnets.subnets)
  const blockchains = useStoreState(
    (state: RootModel) => state.subnets.blockchains
  )

  useEffect(() => {
    fetchSubnets()
  }, [])

  return (
    <div className="">
      <p>subnets</p>
      <WalletConnect />
      <RegisterModal />
      {subnets.slice(0, 10).map((sub) => {
        return (
          //   <div className="container">
          //     <div
          //       className=" rounded-lg bg-zinc-900   my-1 p-5 text-zinc-300"
          //       key={sub.id}
          //     >
          //       <p className="font-bold ">{sub.id}</p>

          //       {sub.name ? (
          //         <>
          //           <p>
          //             {sub.name} - {sub.description}
          //           </p>
          //           <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
          //         </>
          //       ) : undefined}
          //       <p>control key 1: {sub.controlKeys[0]}</p>
          //       <h4>blockchains</h4>
          //       {blockchains
          //         .filter((el) => el.subnetId === sub.id)
          //         .map((bc) => {
          //           return (
          //             <div>
          //               <p>{bc.name}</p>
          //               <p>VM : {bc.vmId}</p>
          //             </div>
          //           )
          //         })}
          //     </div>
          //   </div>
          <SubnetListElement {...sub} />
        )
      })}
      <Paginator />
    </div>
  )
}

export default Subnets
