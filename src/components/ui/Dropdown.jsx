import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  UserIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
  DocumentPlusIcon
} from '@heroicons/react/16/solid'
import { useSelector } from 'react-redux'
import Modal from '../Modal'
import UpdatePassword from '../forms/UpdatePassword'
import UpdateUserDetails from '../forms/UpdateUserDetails'
import UpdateImages from '../forms/UpdateImages'
import Logout from '../../components/Logout'





export default function Dropdown({user}) {
  const userData= useSelector((state)=>state?.auth?.userData)

  return (
    <div className=" w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-700 data-open:bg-gray-700">
          <UserIcon className="size-4 fill-white/60"/>
          {userData && userData?.userName}
          <ChevronDownIcon className="size-4 " />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right flex flex-col gap-1 rounded-xl border border-white/5 bg-gray-800 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
        >
          
          <MenuItem>
            <Modal 
            title="Change Password" 
            buttonChildren="Change Password"
            >
              <UpdatePassword/>
            </Modal>
          </MenuItem>
          <MenuItem>
            <Modal 
            title="Update User"
            buttonChildren="Update User" >
              <UpdateUserDetails/>
            </Modal>
          </MenuItem>
          <MenuItem>
            <Modal title="Update Images"
            buttonChildren="Update Images"
             >
              <UpdateImages/>
            </Modal>
          </MenuItem>
          <MenuItem>
            <Logout/>
          </MenuItem>
          
          
        </MenuItems>
      </Menu>
    </div>
  )
}
