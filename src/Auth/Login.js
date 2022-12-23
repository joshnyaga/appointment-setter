import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css"
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
const Login = () => {
  const [inputLogin, setInputLogin] = useState({});
  const [isBank, setIsBank] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let bValue =0;
  const handleChange = (e) => {
    setInputLogin((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if(isBank)bValue =1
    console.log(bValue)
  
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/signin",
          {
            ...inputLogin
          },
          {
            withCredentials: true,
          }
        );

        dispatch(loginSuccess(res.data))
        if(res.data.bank ===0){
          navigate("/client")
        }else{
          navigate("/bank")
        }
        
      } catch (error) {
        console.log(error)
        toast("Authentication failed");
        dispatch(loginFailure())
      }
    };
    
 
  return (
    <div className="formWrapper">
      <h2 className="formWrapper__headerText">Sign in</h2>
      <p className="formWrapper__tagline">Sign in to request appointments!</p>
      <form onSubmit={handleLogin}>
      <div className="formInput">
          <select className="formInput__input" onChange={()=>setIsBank(true)}>
            <option value="customer">Customer</option>
            <option value="bank">Bank</option>
          </select>
          <span className="formInput__error"></span>
        </div>
      {isBank?<div className="formInput">
      <input
        type="email"
        className="formInput__input"
        placeholder="Enter bank Email"
        name="usernameOrEmail"
        onChange={handleChange}
      />
      <span className="formInput__error"></span>
    </div>:<div className="formInput">
      <input
        type="email"
        className="formInput__input"
        placeholder="Enter Your Email"
        name="usernameOrEmail"
        
        onChange={handleChange}
      />
      <span className="formInput__error"></span>
    </div>}
    <div className="formInput">
      <input
        type="password"
        className="formInput__input"
        placeholder="Enter Passsword"
        onChange={handleChange}
        name="password"
      />
      <span className="formInput__error"></span>
    </div>
      <div className="formOptions">
        <div className="formOption__checkBox">
          <input type="checkbox" />
          <label>Remember me</label>
        </div>
        <Link to="/register" className="formOption__forgotPassword">Register</Link>
      </div>
      <button type="submit" className="btn btn-green">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};



export default Login