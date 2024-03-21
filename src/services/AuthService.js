import ApiEndPointsEnum from "../helpers/ApiEndPointsEnum"

export async function LoginRequest ({userName,password})
{
    let result = await fetch(ApiEndPointsEnum.Login,
        { 
            method:'POST',
            body : JSON.stringify({ Usuario : userName, Password: password }),
            headers: {
                'Content-Type': 'application/json'
            },
        })        
      .then(response => response.json())
      .then(json => { 
        return json
       })
    return result
}

export async function RegisterRequest (registerModel)
{
    let result = await fetch(ApiEndPointsEnum.Register,
        { 
            method:'POST',
            body : JSON.stringify({ 
                userName : registerModel.userName,
                name : registerModel.name,
                email : registerModel.email,
                password: registerModel.password,
                confirmPassword: registerModel.confirmPassword }),
            headers: {
                'Content-Type': 'application/json'
            },
        })        
      .then(response => response.json())
      .then(json => { 
        return json
       })
    return result
}