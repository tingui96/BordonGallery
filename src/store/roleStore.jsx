import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import { GetAllRoles } from '../services/RoleService'

const roleList = await GetAllRoles()

const useListRoleStore = create((set) => ({
  roles: roleList,
  updateRoles: (newListRoles) => {
    set({ roles: newListRoles })
  },
}))

export function useRole() {
    return useListRoleStore(
      useShallow((state) => 
        ({
            roles:state.roles , updateRoles:state.updateRoles
        }))
      )
  }