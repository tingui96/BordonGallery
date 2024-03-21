const USER_STORAGE = 'user'
const TOKEN_STORAGE = 'token'

const setUserStorage = (user) => {
    // Guardar el objeto state en LocalStorage
    localStorage.setItem(USER_STORAGE, JSON.stringify(user));
  }
  const getUserStorage = () => {
    let user = JSON.parse(localStorage.getItem(USER_STORAGE))
    return user
  }
  const clearUserStorage = () =>{
    localStorage.removeItem(USER_STORAGE)
  }
  const setTokenStorage = (token) => {
    // Guardar el objeto state en LocalStorage
    localStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));
  }
  const getTokenStorage = () => {
    let token = JSON.parse(localStorage.getItem(TOKEN_STORAGE))
    return token
  }
  const clearTokenStorage = () =>{
    localStorage.removeItem(TOKEN_STORAGE)
  }

export {setUserStorage, getUserStorage, clearUserStorage, setTokenStorage,getTokenStorage,clearTokenStorage}