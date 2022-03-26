import { useStoreActions, useStoreState, State, Actions } from "easy-peasy"
import React from "react"
import { RootModel } from "../store"
import { Status } from "../utils/types"

const WalletConnect = () => {
  const walletState = useStoreState((state: State<RootModel>) => state.wallet)
  const walletActions = useStoreActions(
    (actions: Actions<RootModel>) => actions.wallet
  )

  return (
    <div className="bg-black-100 text-slate-50">
      {walletState.connectionStatus === (Status.UNDEFINED || Status.FAILED) ? (
        <p
          onClick={() => {
            walletActions.connectWallet()
          }}
        >
          CONNECT WALLET
        </p>
      ) : walletState.connectionStatus === Status.PENDING ? (
        <p>PENDING CONNECTION</p>
      ) : (
        <p className="ext-slate-50">{walletState.address}</p>
      )}
    </div>
  )
}

export default WalletConnect
