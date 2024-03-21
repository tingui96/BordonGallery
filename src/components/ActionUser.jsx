import { Tooltip, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from './icons/DeleteIcon'
import { EyeIcon } from "./icons/EyeIcon";
import ModalUserDetails from './ModalUserDetails'
import ModalDelete from './ModalDelete'
import PropTypes from 'prop-types';
import { useState } from "react";

export default function ActionUser({user}){
    const {isOpen, onOpen,onClose, onOpenChange } = useDisclosure()
    const [defaultModal,setDefaultModal] = useState(true)
    return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" 
              onClick={() => {setDefaultModal(true); onOpen()}}>
              <EyeIcon/>
            </span>
          </Tooltip>
          
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50" 
              onClick={() => { setDefaultModal(false); onOpen()}}>
              <DeleteIcon />
            </span>
          </Tooltip> 
          {
            defaultModal ? 
            <ModalUserDetails isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} user={user}/>
            :
            <ModalDelete isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} user={user} /> 
          }
        </div>
      );
}
ActionUser.propTypes = {
    user: PropTypes.object,
  };