import { User, Chip } from "@nextui-org/react";
import { statusColorMap } from "../constants/constants";
import Action from "./ActionUser";
import SelectRole from "./SelectRole"
import PropTypes from 'prop-types';

export function Celda({user,columnKey})
{ 
  const cellValue = user[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <div className="relative flex items-center">
              <User
                avatarProps={{radius: "sm", src: user?.photoUrl}}
                description={""}
                name={cellValue}
              >
                {cellValue}
              </User>
            </div>
          );
        case "role":
          return (
            <div className="relative flex items-center">
               <SelectRole user={user} roleSelected={cellValue} />
            </div>
          );
        case "activo":
          return (    
            <Chip className="capitalize" 
              color={cellValue ? statusColorMap.active : statusColorMap.paused} 
              size="sm" variant="flat">
              {cellValue ? 'Active' : 'Inactive'}
            </Chip>
          );
        case "actions":
          return(<Action user={user}/>)
  
        default:
          return (
            <div className="relative flex items-center">
              {cellValue}
            </div>
          );
      }
}

Celda.propTypes =
{
   user: PropTypes.object,
   columnKey: PropTypes.string,
}