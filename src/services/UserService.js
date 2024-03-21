import { QUERY_PARAM } from "../constants/constants"
import ApiEndPointsEnum from "../helpers/ApiEndPointsEnum"

export async function GetAllUsers (pageNumber,pageSize)
{
    let result = await fetch(ApiEndPointsEnum.Users.replace(QUERY_PARAM.PageNumber, pageNumber)
        .replace(QUERY_PARAM.PageSize, pageSize),
        { 
            method:'GET'
        })        
      .then(async response => {
        const xPagination = response.headers.get('X-Pagination');
        const pagination = JSON.parse(xPagination);
        let json = await response.json()
        return { pagination: pagination, result : json }
      })
    return result  
}

export async function UpdateUserActive (user,token)
{
    let result = await fetch(ApiEndPointsEnum.UpdateUserActive,
        { 
            method:'PUT',
            body : JSON.stringify({ 
                id : user.id,
                active : user.activo}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
        })        
      .then(response => response.json())
      .then(json => { 
        return json
       })
    return result
}
export async function UpdateUserPhoto (user,token)
{
    let result = await fetch(ApiEndPointsEnum.UpdateUserPhoto,
        { 
            method:'PUT',
            body : JSON.stringify({ 
                id : user.id,
                photoUrl : user.photoUrl}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
        })        
      .then(response => response.json())
      .then(json => { 
        return json
       })
    return result
}
export async function UpdateUser (data,token)
{
    let result = await fetch(ApiEndPointsEnum.UpdateUser.replace(QUERY_PARAM.Id,data.id),
        { 
            method:'Put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
            body: JSON.stringify(data)
        })        
      .then(response => response.json())
      .then(json => { 
        return json
       })
    return result
}
export async function DeleteUser (user,token)
{
    let result = await fetch(ApiEndPointsEnum.DeleteUser.replace(QUERY_PARAM.Id,user.id),
        { 
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
        })        
      .then(response => response.json())
      .then(json => { 
        return json
       })
    return result
}

export async function AddToRole (user,roleId,token)
{
    let result = await fetch(ApiEndPointsEnum.AddtoRole.replace(QUERY_PARAM.Id,user.id)
        .replace(QUERY_PARAM.RoleId,roleId),
        { 
            method:'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            },
        })        
      .then(response => response.json())
      .then(json => { 
        return json
       })
    return result
}