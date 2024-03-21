import './Footer.css'
import { useUser } from '../store/userStore/userStore'

export function Footer () {
  const  {user}  = useUser()

  return (
    <footer className='footer'>
      <h5>{user?.userName}</h5>
      <h6>{user?.role?.name}</h6>
    </footer>
  )
}