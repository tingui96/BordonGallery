import { Navigate } from "react-router-dom";
import { useUser } from "../../store/userStore/userStore";
import { ROLES, } from "../../constants/constants";
import { TableAdmin } from "../../components/TableAdmin";

export default function Administration(){
    const { user } = useUser()
    return (
      <>
        { 
          (!user && <Navigate to="/" replace/>)
            || (user?.role?.name != ROLES.admin && <Navigate to="/" replace/>)
        }
      <TableAdmin/>
      </>
    );
  }