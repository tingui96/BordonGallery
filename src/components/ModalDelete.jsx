import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Code, Button} from "@nextui-org/react";
import { useState } from "react";
import PropTypes from 'prop-types';
import { DeleteUser } from "../services/UserService";
import { useUser } from "../store/userStore/userStore";
import { useListUser } from "../store/tableAdminStore";

export default function App({isOpen,onClose,onOpenChange,user}) {
    const [isLoading,setIsLoading] = useState(false)
    const {token} = useUser()
    const { removeUser } = useListUser()
    const [error,setError] = useState()
    const HandleOnClickSave = async () =>
    {
      setIsLoading(true)
      let json = await DeleteUser(user,token)
      if(json.statusCode === 200)
      {  
          removeUser(user)
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
            <ModalHeader className="flex flex-col gap-1">Delete user {user.userName}</ModalHeader>
            <ModalBody>
              {error && <Code color="danger">{error}</Code>}
              Are you sure?
            </ModalBody>            
            <ModalFooter>            
              <Button color="default" variant="flat" onPress={() => { setError();onClose() }}>
                Close
              </Button>
              <Button color="danger" onPress={HandleOnClickSave} isLoading={isLoading}>
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