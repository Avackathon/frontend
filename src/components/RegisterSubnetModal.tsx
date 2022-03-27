import { Dialog, Transition } from "@headlessui/react"
import { Actions, useStoreActions } from "easy-peasy"
import { Fragment, useState } from "react"
import { RootModel } from "../store"

type Props = {
  id: string
  open: boolean
  name?: string
  onClose: () => void
}
const RegisterSubnetModal = (props: Props) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const register = useStoreActions(
    (actions: Actions<RootModel>) => actions.subnets.registerSubnet
  )
  return (
    <>
      <Transition appear show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={props.onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Register {props.name} information
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Update you subnet information
                  </p>
                  <input
                    className="bg-slate-300"
                    value={name}
                    placeholder="Subnet name"
                    onChange={(evt) => {
                      setName(evt.target.value)
                    }}
                  />
                  <input
                    className="bg-slate-200 mx-3"
                    placeholder="Description"
                    value={description}
                    onChange={(evt) => {
                      setDescription(evt.target.value)
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      props.onClose()
                      register({
                        subnetId: props.id,
                        name: name,
                        description: description,
                      })
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default RegisterSubnetModal
