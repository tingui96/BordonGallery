import { Select, SelectItem, useDisclosure } from "@nextui-org/react";
import PropTypes from 'prop-types'
import ModalChangeRol from './ModalChangeRol'
import { useRole } from "../store/roleStore";
import { useState } from "react";

export default function SelectRole({user,roleSelected}) {
    const { isOpen,onOpen,onClose,onOpenChange} = useDisclosure()
    const {roles} = useRole()
    const [selectedRole,setSelectedRole] = useState(roleSelected.id)
  
    return (
      <>
      <Select isRequired selectionMode="single" label="Role" defaultSelectedKeys={[roleSelected.id.toString()]}
        items={roles} className="max-w-xs" onChange={onOpen} selectedKeys={selectedRole.toString()}>
        {
          roles?.map((rol) => 
              (<SelectItem key={rol.id} onClick={()=> setSelectedRole(rol.id)} value={rol.id}>{rol.name}</SelectItem>))
        }
      </Select>
      <ModalChangeRol isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}
         user={user} roleId={selectedRole} setRole={setSelectedRole}/>
      </>
    );
}
SelectRole.propTypes = {
    user: PropTypes.object,
    roleSelected: PropTypes.object,
};