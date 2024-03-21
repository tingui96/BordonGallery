import { FIELD_NAMES } from "../constants/constants";

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function IsDiferent(user,newuser)
{
  if(newuser[FIELD_NAMES.NAME] != user.name)
    return true 
  if(newuser[FIELD_NAMES.PHONE] != user.phone)
    return true
  if(newuser[FIELD_NAMES.BIOGRAPHY] != user.biography)
    return true
  if(newuser[FIELD_NAMES.PHOTOURL] != user.photoUrl)
    return true
  return false
}

export const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

export const validatePassword = (password,confirmPassword) => password === confirmPassword