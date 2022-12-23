import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import logo from "../../../images/logo.png"
import { logout } from '../../../redux/userSlice';
const Nav = () => {
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
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" />
          <p>{user.username}</p>
        </div>
        <div className="links">
          <Link to="" className={pathname === undefined? "nav-item active":"nav-item"}>
            Appointments
          </Link>
          <Link to="locations" className={pathname === "locations"? "nav-item active":"nav-item"}>
            Locations
          </Link>
          
          <Link to="#" onClick={handleLogout} className="nav-item">
            Logout
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Nav