import { Actions, State, useStoreActions, useStoreState } from "easy-peasy"
import React, { useState } from "react"
import { RootModel } from "../store"
import avaxLogo from "../assets/logo.png"
import RegisterModal from "./RegisterModal"

const HeaderButton = (props: { name: string; active: boolean }) => {
  if (props.active) {
    return (
      <div className=" h-9 rounded-xl bg-slate-800 text-center mx-1 py-1 px-4 ">
        {props.name}
      </div>
    )
  } else {
    return (
      <div className=" h-9 rounded-xl bg-slate-700 text-center mx-1 py-1 hover:bg-slate-600 px-4 ">
        {props.name}
      </div>
    )
  }
}
const AppLogo = () => {
  return <img src={avaxLogo} alt="Avalanche logo" className="w-9 h9 mr-4" />
}

const WalletButton = () => {
  const walletState = useStoreState((state: State<RootModel>) => state.wallet)
  const connectWallet = useStoreActions(
    (actions: Actions<RootModel>) => actions.wallet.connectWallet
  )
  return (
    <>
      {walletState.address ? (
        <div className="rounded-2xl text-sm bg-red-500 px-4 py-1.5 mx-5  ">
          {walletState.address.substring(0, 12) + "..."}
        </div>
      ) : (
        <div
          onClick={() => {
            connectWallet()
          }}
          className="w-40 rounded px-4 text-sm py-1.5 mx-5 bg-red-500 hover:bg-red-400 text-center"
        >
          Connect Wallet
        </div>
      )}
    </>
  )
}

const Header = () => {
  const [registerUserModalOpen, setRegisterUserModalOpen] = useState(false)
  const getFaucet = useStoreActions(
    (actions: Actions<RootModel>) => actions.wallet.getFaucetTokens
  )
  const walletState = useStoreState((state: State<RootModel>) => state.wallet)
  return (
    <div className="w-screen h-14 flex flex-row bg-slate-700 text-slate-100">
      <div className="flex-auto flex flex-row items-center px-7">
        <AppLogo />
        <HeaderButton name="Subnets" active={true} />
        <HeaderButton name="Validators" active={false} />
        <HeaderButton name="VMs" active={false} />
      </div>
      {walletState.address ? (
        <div className="w-5/12 flex-initial flex items-center justify-end">
          <div
            onClick={() => {
              getFaucet(walletState.address ? walletState.address : "")
            }}
            className="rounded  text-sm px-3 py-3  bg-gray-700 hover:bg-gray-500"
          >
            Get faucet tokens
          </div>
          <div
            onClick={() => {
              setRegisterUserModalOpen(true)
            }}
            className="rounded text-sm px-3 py-3 mx-3 bg-slate-800"
          >
            Register user
          </div>
        </div>
      ) : undefined}
      <div className="w-2/12 flex-initial flex items-center justify-end">
        <WalletButton />
      </div>

      <RegisterModal
        open={registerUserModalOpen}
        onClose={() => {
          setRegisterUserModalOpen(false)
        }}
      />
    </div>
  )
}

export default Header
