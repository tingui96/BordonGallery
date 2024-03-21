import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useListUserStore = create((set) => ({
  users: [],
  updateUsers: (newListUsers) => {
    set({ users: newListUsers })
  },
  updateUserInList: (updatedUser) => {
    set((state) => ({
      users: state.users?.map((user) =>
        user?.id === updatedUser?.id ? { ...user, ...updatedUser } : user
      ),
    }))
  },
  removeUser: (removeUser) => 
  {
    set((state) => ({
      users: state.users?.filter((user) => user?.id !== removeUser?.id),
    }));
  },
  clearUsers: () => { 
    set({ users: [] })
   },
}))

export function useListUser() {
  return useListUserStore(
    useShallow((state) => 
      ({
          users:state.users, updateUsers: state.updateUsers, updateUserInList: state.updateUserInList,
          removeUser: state.removeUser , clearUsers: state.clearUsers,
      }))
    )
}