import { Switch, Divider, Avatar} from "@nextui-org/react";
import { useState } from "react";
import PropTypes from 'prop-types';

export default function App({user}) {
    const [isSelected, setIsSelected] = useState(user.activo);

    const HandleOnChange = () => {
        const changeSelected = !isSelected
        setIsSelected(changeSelected)
        user.activo = changeSelected
    }

  return (
    <>
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src={user?.photoUrl} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{user?.userName}</h4>
            <h5 className="text-small tracking-tight text-default-400">{user?.email}</h5>
          </div>
        </div>
        <div className="flex h-5 items-center space-x-4 text-small">
            <div>👤{user?.name} </div>
            <Divider orientation="vertical"/>
            <div>📞{user?.phone}</div>
        </div>     
        <div className="flex gap-1">
          <p className="text-small">{user?.biography}</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">Role: {user?.role?.name}</p>
        </div>
        <div className="flex flex-col gap-2">
            <Switch size="sm" isSelected={isSelected} onValueChange={() => HandleOnChange()}>
                Active
            </Switch>  
            <p className="text-small text-default-500">Selected: {isSelected ? "true" : "false"}</p>
        </div>
    </>
  );
}

App.propTypes = {
    user: PropTypes.object,
  };