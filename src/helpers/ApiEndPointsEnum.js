import { QUERY_PARAM } from "../constants/constants"

const server = 'https://localhost:7209'
const envAPI = server + '/api'
const envAPIUser = envAPI + '/users'
const envAPIRole = envAPI + '/roles'
const envAPIUpload = envAPI + '/upload'
const ApiEndPointsEnum  = {
    Login : envAPI + '/login',
    Register : envAPI + '/register',
    Users : envAPIUser + '?pageNumber='+ QUERY_PARAM.PageNumber +'&pageSize='+ QUERY_PARAM.PageSize,
    UpdateUserActive : envAPIUser + '/update-user-active',
    UpdateUser : envAPIUser + '/' + QUERY_PARAM.Id,
    DeleteUser: envAPIUser + '/' + QUERY_PARAM.Id,
    AddtoRole: envAPIUser + '/' + QUERY_PARAM.Id + '/addrole/' + QUERY_PARAM.RoleId,
    UpdateUserPhoto: envAPIUser + '/update-user-photo',
    Roles: envAPIRole,
    Upload: envAPIUpload,
    Server: server
}
export default ApiEndPointsEnum;