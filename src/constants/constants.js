export const INPUT_NAME = {
    name: 'name',
    userName: 'userName',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword'
}

export const ROLES = {
    admin: 'Administrador',
    artist: 'Artist',
    viewer: 'Viewer' 
}

export const statusColorMap = {
    active: 'success',
    paused: 'danger',
    vacation: "warning",
  };

export const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export const columns = [
    {name: "NAME", uid: "name", sortable: true},
    {name: "USERNAME", uid: "userName", sortable: true},
    {name: "ROLE", uid: "role", sortable: true},
    {name: "EMAIL", uid: "email"},
    {name: "STATUS", uid: "activo", sortable: true},
    {name: "ACTIONS", uid: "actions"},
  ];

export const statusOptions = [
    {name: "Active", uid: "active"},
    {name: "Paused", uid: "paused"},
  ];

export const THEME = {
   dark: 'dark',
   light: 'light'
}

export const FIELD_NAMES = {
  ID: "id",
  NAME: "name",
  PHONE: "phone",
  BIOGRAPHY: "biography",
  PHOTOURL: "photoUrl",
};

export const QUERY_PARAM = {
  Id: '{id}',
  RoleId: '{roleId}',
  PageNumber: '{pageNumber}',
  PageSize: '{pageSize}'
}
export const PageSize = 10