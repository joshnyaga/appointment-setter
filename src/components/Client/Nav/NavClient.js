import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from "../../../images/logo.png"
import { logout } from '../../../redux/userSlice'
const NavClient = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const pathname = useLocation().pathname.split("/")[2];
    let username
    const {user} = useSelector(state=>state.user)
    if(user){
        username = user.username
    }else{
        navigate("/login")
    }
   
    useEffect(()=>{
        if(user=== undefined || user === null){
            navigate("/login")
        }
    },[])
    
    const handleLogout = ()=>{
        dispatch(logout())
    }
  return (
    <div className="nav">
      {username != null ? <nav>
        <div className="logo">
          <img src={logo} alt="logo" />
          <p>{user.username}</p>
        </div>
        <div className="links">
        <Link to="/client" className="nav-item">
            Book
          </Link>
          <Link to="/client/myappointments" className="nav-item">
            My appointments
          </Link>
          <Link to="#" onClick={handleLogout} className="nav-item">
            Logout
          </Link>
        </div>
      </nav>:<>Not loged</>}
      <Outlet />
    </div>
  )
}

export default NavClient