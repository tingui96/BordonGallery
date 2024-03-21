import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Code, Button} from "@nextui-org/react";
import { useState } from "react";
import PropTypes from 'prop-types';
import { AddToRole } from "../services/UserService";
import { useUser } from "../store/userStore/userStore";

export default function App({isOpen,onClose,onOpenChange,user,roleId, setRole}) {
    const [isLoading,setIsLoading] = useState(false)
    const {token} = useUser()
    const [error,setError] = useState()
    const HandleOnClickSave = async () =>
    {
      setIsLoading(true)
      let json = await AddToRole(user,roleId,token)
      if(json.statusCode === 200 || json.statusCode === 204)
      {  
          setIsLoading(false)
          onClose()
      }
      else
      {
         setError(json.message)
         setIsLoading(false)
      }
    }
    const HandleOnPressCancel = () => {
        setRole(user.role.id)
        setError()
        onClose() 
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Change role</ModalHeader>
            <ModalBody>
              {error && <Code color="danger">{error}</Code>}
              Are you sure?
            </ModalBody>            
            <ModalFooter>            
              <Button color="default" variant="flat" onPress={HandleOnPressCancel}>
                Close
              </Button>
              <Button color="danger" onPress={HandleOnClickSave} isLoading={isLoading}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    );
  }
  App.propTypes = {
      isOpen: PropTypes.bool,
      onClose: PropTypes.func,
      onOpenChange: PropTypes.func,
      user: PropTypes.object,
      roleId: PropTypes.number,
      setRole: PropTypes.func
  }