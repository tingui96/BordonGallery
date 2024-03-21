import ApiEndPointsEnum from "../helpers/ApiEndPointsEnum"

export async function GetAllRoles ()
{
    let result = await fetch(ApiEndPointsEnum.Roles,
        { 
            method:'GET'
        })        
      .then(response => response.json())
      .then(json => { 
        return json
       })
    return result.result
}