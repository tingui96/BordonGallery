import { Button, CardFooter, CardHeader, Input } from "@nextui-org/react"
import { MailIcon } from "../components/icons/MailIcon"
import { useMemo, useState } from "react";
import { INPUT_NAME } from "../constants/constants";
import { RegisterRequest } from "../services/AuthService";
import { Code } from "@nextui-org/react";
import { Navigate } from "react-router-dom";
import { Card, CardBody } from "@nextui-org/react";
import { validateEmail, validatePassword } from "../utils/utils";

export default function App()
{ 
    const [register,setRegister] = useState({userName:'', name:'',email:'',password:'',confirmPassword:''});
    const [finish,setFinish] = useState(false)
    const [error,setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading,setLoading] = useState(false)

    const isInvalid = useMemo(() => {
        if (register.email === "") return false
        return validateEmail(register.email) ? false : true;
      }, [register.email])

    const notMatchPassword = useMemo(() => {
        if (register.password === "") return false
        return validatePassword(register.password,register.confirmPassword) ? false : true;
      }, [register.password,register.confirmPassword])

    const isInvalidLength = useMemo(() => {
        if(register.password.length === 0) return false
        if(register.password.length < 8) return true
    },[register.password])

    const handleInputChange = (field, value) => {
        setRegister(prevState => ({
            ...prevState,
            [field]: value
        }));
        setError(false)
        setErrorMessage('')
    };

    const HandleRegisterOnClick = async () => {
        setLoading(true)
        let json = await RegisterRequest(register)
        if(json.statusCode === 200)
        {  
            setLoading(false)
            setRegister({userName:'', name:'',email:'',password:'',confirmPassword:''})
            setFinish(true)
        }
        else
        {
            setError(true)
            if(json.message)
                setErrorMessage(json.message)
            //Loading...
            setLoading(false) 
        }       
    }
    return(
        finish ? <Navigate to='/' replace /> 
        :
        <Card className="max-w-full">
            <CardHeader className="items-center">
                <p>Register</p>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-4">
                <Input isRequired label="Name" type="text" labelPlacement="inside"
                    value={register.name}
                    onChange={(e) => handleInputChange(INPUT_NAME.name, e.target.value)}
                />
                <Input isRequired label="UserName" type="text" labelPlacement="inside"
                    value={register.userName}
                    onChange={(e) => handleInputChange(INPUT_NAME.userName, e.target.value)}
                />             
           
                <Input isRequired type="email" label="Email" placeholder="you@example.com" labelPlacement="outside"
                    value={register.email} 
                    variant="bordered"
                    isInvalid={isInvalid}
                    color={isInvalid ? "danger" : "default"}
                    errorMessage={isInvalid && "Please enter a valid email"}
                    onChange={(e) => handleInputChange(INPUT_NAME.email, e.target.value)}
                    startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>}
                />            
            
                <Input isRequired label="Password" type="password" labelPlacement="inside" value={register.password}
                    isInvalid={isInvalidLength}
                    color={isInvalidLength ? "danger" : "default"}
                    errorMessage={isInvalidLength && "Must contain at least 8 character"}
                    onChange={(e) => handleInputChange(INPUT_NAME.password, e.target.value)}
                />
                <Input isRequired label="Confirm password" type="password" labelPlacement="inside" value={register.confirmPassword}
                    isInvalid={notMatchPassword}
                    color={notMatchPassword ? "danger" : "default"}
                    errorMessage={notMatchPassword && "Password diferent to Confirm password"}
                    onChange={(e) => handleInputChange(INPUT_NAME.confirmPassword, e.target.value)}
                />      
            </div>
            </CardBody>
            <CardFooter className="flex flex-col gap-2">
                { error && <Code color="danger">{errorMessage}</Code> }
                <Button fullWidth radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                    onClick={HandleRegisterOnClick}
                    isLoading={loading}>
                        Register
                    </Button>           
            </CardFooter>
        </Card>
    )
}