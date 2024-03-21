import ApiEndPointsEnum from "../helpers/ApiEndPointsEnum"

export async function Upload (formData,token)
{
    let response = await fetch(ApiEndPointsEnum.Upload,
        { 
            method:'POST',
            'Content-Type': 'image/jpeg',
            'Authorization': `bearer ${token}`,
            body: formData
        })        
      .then(response => response.json())
      .then(json => { 
        return json
       })
    const result = ApiEndPointsEnum.Server +'/'+ response.result.result
    return result
}