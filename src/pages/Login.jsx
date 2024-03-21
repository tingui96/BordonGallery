import { useState } from "react";
import {Button, Input, Code } from "@nextui-org/react";
import {EyeFilledIcon} from "../components/icons/EyeFilledIcon";
import {EyeSlashFilledIcon} from "../components/icons/EyeSlashFilledIcon";
import { LoginRequest } from "../services/AuthService";
import { useUser } from "../store/userStore/userStore";
import { Navigate } from "react-router-dom";
import { Card,CardHeader,CardBody,CardFooter } from "@nextui-org/react";

export default function App() {
    const {user,updateUser,updateToken} = useUser()
    const [loading,setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorUser, setErrorUser] = useState(false)

    const toggleVisibility = () => setIsVisible(!isVisible);

    const HandleLoginOnClick = async () => {
        setLoading(true)
        let json = await LoginRequest({userName,password})
        if(json.statusCode === 200)
        {  
            let user = json.result.user
            let token = json.result.token
            updateUser(user)
            setLoading(false) 
            updateUser(user)
            updateToken(token)
        }
        else
        {
            //user not found
            if(json.statusCode === 404)
            {
                setErrorUser(true)
                setErrorMessage(json.message)
            }                 
            //wrong password
            else if(json.statusCode === 400)
                setError(true)
            setErrorMessage(json.message)
        }       
        //Loading...
        setLoading(false)           
    }

    const HandleUserNameOnChange = (e) => {
        setUserName(e.target.value)
    }
    const HandlePasswordOnChange = (e) => {
        setPassword(e.target.value)
    }

    const ResetError = () =>
    {
        setError(false)
        setErrorUser(false)
        setErrorMessage(null)
    }

  return ( 
     user ? <Navigate to="/" replace /> 
     :
     <Card className="max-w-full">
        <CardHeader>
            Login
        </CardHeader>
        <CardBody>
            <div className="flex flex-col gap-6">   
                <Input className="max-w-xs" key="inside" type="text" label="Username" isInvalid={errorUser}
                    labelPlacement="inside" value={userName || ''} onChange={HandleUserNameOnChange} onClick={ResetError}/>

                <Input label="Password" variant="bordered" placeholder="Enter your password" onClick={ResetError}
                    value={password} onChange={HandlePasswordOnChange} isInvalid={error}
                    endContent = {
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        { isVisible ? 
                            ( <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" /> )
                            : ( <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" /> )
                        }
                        </button>
                    }
                    type={isVisible ? "text" : "password"} className="max-w-xs"
                />
            </div>    
        </CardBody>
        <CardFooter className="flex flex-col gap-2">
                { (error||errorUser) && <Code color="danger">{errorMessage}</Code> }
            <Button fullWidth radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onClick={HandleLoginOnClick}
                isLoading={loading}>
                    Login
                </Button> 
        </CardFooter>
     </Card>
  )
}
