import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { clearTokenStorage, clearUserStorage, getTokenStorage, getUserStorage, setTokenStorage, setUserStorage } from '../../services/localstorage'

const userLocalStorage = getUserStorage()
const tokenLocalStorage = getTokenStorage()
const useUserStore = create((set) => ({
  user: userLocalStorage,
  token: tokenLocalStorage,
  updateUser: (newUser) => {
    set({ user: newUser })
    setUserStorage(newUser)
  },
  removeUser: () => { 
    set({ user: null })
    clearUserStorage()
   },
   updateToken: (newToken) => {
    set({ token: newToken })
    setTokenStorage(newToken)
  },
  removeToken: () => { 
    set({ token: null })
    clearTokenStorage()
   },
}))

export function useUser() {
  return useUserStore(
    useShallow((state) => 
      ({
        user:state.user, updateUser: state.updateUser , clearUser: state.removeUser,
        token: state.token, updateToken: state.updateToken, clearToken: state.removeToken
      }))
    )
}

export default useUserStore