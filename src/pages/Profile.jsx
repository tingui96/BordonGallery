import { Button, Card, CardBody, CardHeader, Input,Code, Textarea, Tooltip } from "@nextui-org/react"
import { Navigate } from "react-router-dom"
import { useUser } from "../store/userStore/userStore"
import { useEffect, useState } from "react"
import { FIELD_NAMES } from "../constants/constants"
import { UpdateUser } from "../services/UserService"
import { IsDiferent } from "../utils/utils"
import AvatarButton from "../components/AvatarButton"
import { Upload } from '../services/UploadService';

export default function Profile()
{
    const {user,updateUser,token} = useUser()
    const [error,setError] = useState()
    const [errorMessage,setErrorMessage] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [isDiferent,setIsDiferent] = useState(false)
    const [tooltip,setToolTips] = useState(false)
    const [userToUpdate, setUserToUpdate] = useState({
        [FIELD_NAMES.ID] : user?.id,
        [FIELD_NAMES.NAME]: user?.name,
        [FIELD_NAMES.PHONE]: user?.phone,
        [FIELD_NAMES.BIOGRAPHY]: user?.biography,
        [FIELD_NAMES.PHOTOURL]: user?.photoUrl ,
    })
    const HandleOnChange = (e,field) => {
        setUserToUpdate((prevUser) => ({
            ...prevUser,
            [field]: e.target.value,
          }));
        
        setErrorMessage()
    }
    useEffect(()=>{
        if(!user) return
        let isDif = IsDiferent(user,userToUpdate)
        setIsDiferent(isDif)
    },[userToUpdate,user])

    useEffect(() => {
        if(!tooltip) return
        setInterval(()=> {setToolTips(false)},2000)
    },[tooltip])

    const HandleOnClick = async() => {
        setIsLoading(true)
        let json = await UpdateUser(userToUpdate,token)
        if(json.statusCode === 200 || json.statusCode === 204)
        {  
            let newUser = structuredClone(user);
            newUser.name = userToUpdate[FIELD_NAMES.NAME]
            newUser.phone = userToUpdate[FIELD_NAMES.PHONE]
            newUser.biography = userToUpdate[FIELD_NAMES.BIOGRAPHY]
            newUser.photoUrl = userToUpdate[FIELD_NAMES.PHOTOURL]
            updateUser(newUser)
            setIsLoading(false)
            setToolTips(true)
        }
        else
        {
            setError(json.message)
            setIsLoading(false)
        }

    }
    const onSubmit = async (event) => {
        if (event.target.files.length === 0) {
            return;
          }
        const selectedFile = event.target.files[0];
        const extension = selectedFile?.name.split('.').pop()
        const formData = new FormData();
        formData.append('file', selectedFile, `user-${user?.id}-`.concat(Date.now()).concat('.').concat(extension));
        const pathImage = await Upload(formData,token)
        let newUser = structuredClone(userToUpdate);
        newUser[FIELD_NAMES.PHOTOURL] = pathImage
        setUserToUpdate(newUser)
      };
    return(
        <>
        { !user && <Navigate to="/" replace/>}
    <Card>
        <CardHeader>
            My Profile
        </CardHeader>
        <CardBody>
            <div className="flex gap-5 m-2">
                <AvatarButton user={userToUpdate} onChange={onSubmit}/>
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h1 color="primary" className="text font-semibold leading-none">{user?.userName}</h1> 
                    <h4 className="text-small tracking-tight text-default-400">{user?.role?.name}</h4>           
                </div>
            </div>
            <div className="flex gap-5 m-2">
                <div className="flex flex-col gap-1 items-start justify-center">
                    <Input label="Name" type="text" value={userToUpdate?.name} onChange={(e) => HandleOnChange(e,FIELD_NAMES.NAME)}></Input>
                </div>
                <div className="flex flex-col gap-1 items-start justify-center">
                    <Input label="Phone" type="text" value={userToUpdate?.phone} onChange={(e) => HandleOnChange(e,FIELD_NAMES.PHONE)}></Input>
                </div>
            </div>
            <div className="flex gap-5 m-2">
                <div className="flex flex-col gap-1 items-start justify-center w-full">
                    <Input label="Email" color="primary" fullWidth isReadOnly type="email" value={user?.email}></Input>
                </div>  
            </div>
            <div className="flex gap-5 m-2">
                <div className="flex flex-col gap-1 items-start justify-center w-full">
                    <Textarea label="Biography" value={userToUpdate?.biography} onChange={(e) => HandleOnChange(e,FIELD_NAMES.BIOGRAPHY)}
                     placeholder="Enter your description" className="w-full"/>
                </div>
            </div>
            { error && <Code color="danger">{errorMessage}</Code> }
            <div className="flex gap-5 m-2 justify-end">
                <Tooltip isOpen={tooltip} color="success" content="Save correctly" placement="left">
                    <Button isDisabled={!isDiferent} isLoading={isLoading} onClick={HandleOnClick} color="primary">Save</Button>
                </Tooltip>
            </div>
        </CardBody>
    </Card>
    
    </>
    )
}