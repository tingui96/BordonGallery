import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Image} from "@nextui-org/react";
import BordonLogo from "../assets/logo4.svg";
import { useUser } from "../store/userStore/userStore";
import { ROLES, THEME } from "../constants/constants";
import ThemeSwitcher from './ThemeSwitcher'
import BordonLogoDark from "../assets/logo4dark.svg"
import { useTheme } from "next-themes";
import { useListUser } from "../store/tableAdminStore";

export default function NavBar() {
  const { theme } = useTheme()
  const {user,clearUser} = useUser()
  const { clearUsers } = useListUser()
  const OnClickLogout = () =>
  {
    clearUser()
    clearUsers()
  }
  return (
    <Navbar classNames={{
      item: [
        "flex",
        "relative",
        "h-full",
        "items-center",
        "data-[active=true]:after:content-['']",
        "data-[active=true]:after:absolute",
        "data-[active=true]:after:bottom-0",
        "data-[active=true]:after:left-0",
        "data-[active=true]:after:right-0",
        "data-[active=true]:after:h-[2px]",
        "data-[active=true]:after:rounded-[2px]",
        "data-[active=true]:after:bg-primary",
      ],
    }}>
      <NavbarBrand>
        <Link href="/" color="foreground">
          <Image src={theme === THEME.dark ? BordonLogoDark : BordonLogo} alt="BordonLogo" width={50} height={50}/>
          <p className="font-bold text-inherit m-5">Bordon Gallery</p>    
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" color="foreground">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
        {
          user?.role.name === ROLES.admin &&
            <NavbarItem> 
              <Link color="warning" href="/admin">  
                Administration
              </Link>
            </NavbarItem>
        }
      </NavbarContent>
    { 
      !user ? 
      <NavbarContent justify="end">
        <NavbarItem className="sm">
          <ThemeSwitcher/>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem className="sm">
          <Button as={Link} href="/register" color="primary" variant="flat">Sign Up</Button>
        </NavbarItem>
      </NavbarContent>
      :
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user.name}
              size="sm"
              src={user.photoUrl}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2" textValue={user.userName}>
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.userName}</p>
            </DropdownItem>
            <DropdownItem as={Link} href="/myprofile" key="settings">My Profile</DropdownItem>
            <DropdownItem as={Link} htrf="/myjob" key="job">My Job</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={OnClickLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
        }
    </Navbar>
  );
}
