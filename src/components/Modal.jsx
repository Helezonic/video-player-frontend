import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Button, Input } from './ui/index.js'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { modalOff, modalOn } from '../app/modalSlice.js'

export default function Modal({title, children, altButton, className, buttonChildren}) {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()


  const open = () => {
    setIsOpen(true)
    dispatch(modalOn())
  }

  const close = () => {
    setIsOpen(false)
    dispatch(modalOff())
  }

  return (
    <>
      {buttonChildren && <Button onClick={open} className={className} >
        {buttonChildren}
      </Button>
      }
      {altButton}

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle className=" text-xl font-medium text-white text-center">
                {title}
              </DialogTitle>
              
              
              {children}

              <div className='italic px-2 text-center  text-gray-500'>Click Outside to Cancel</div>

            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
