import {Modal, ModalContent, ModalHeader, ModalBody,Code, ModalFooter, Button} from "@nextui-org/react";
import UserCardDetails from './UserCardDetails'
import { useState } from "react";
import PropTypes from 'prop-types';
import { UpdateUserActive } from "../services/UserService";
import { useUser } from "../store/userStore/userStore";
import { useListUser } from "../store/tableAdminStore";

export default function App({isOpen,onClose,onOpenChange,user}) {
  const [isLoading,setIsLoading] = useState(false)
  const { token} = useUser()
  const { updateUserInList } = useListUser()
  const [error,setError] = useState()
  
  const HandleOnClickSave = async () =>
  {
    setIsLoading(true)
    let json = await UpdateUserActive(user,token)
    if(json.statusCode === 200 || json.statusCode === 204)
    {  
        updateUserInList(user)
        setIsLoading(false)
        onClose()
    }
    else
      {
         setError(json.message)
         setIsLoading(false)
      }
  }
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">User details</ModalHeader>
          <ModalBody>
            <UserCardDetails user={user}/>
            {error && <Code color="danger">{error}</Code>}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={HandleOnClickSave} isLoading={isLoading}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
App.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onOpenChange: PropTypes.func,
    user: PropTypes.object,
}