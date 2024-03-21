import {useTheme} from "next-themes";
import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";
import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { THEME } from "../constants/constants";


export default function App() {
  const { theme, setTheme } = useTheme()
  const [isSelected,setSelect] = useState(theme === THEME.dark ? false : true)

  const HandleOnChange = () => {
    const select = !isSelected
    setSelect(select)
    if(select) setTheme(THEME.light)
    else setTheme(THEME.dark)
  }
  return (
    <Switch
      isSelected={isSelected}
      size="sm"
      color="default"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={HandleOnChange}
    >
      {theme}
    </Switch>
  )
}