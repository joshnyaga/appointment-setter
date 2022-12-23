import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css"
const Register = () => {
  const [inputRegister, setInputRegister] = useState({});
  const [isBank, setIsBank] = useState(false);
  const navigate = useNavigate()
  let bValue =0;
  const handleChange = (e) => {
    setInputRegister((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  if(isBank)
  {
    bValue =1
  }
  else{
    bValue =0
  }
  console.log(bValue)
  const handleRegister = async (e) => {
    e.preventDefault();
    
    console.log(bValue)
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/signup",
          {
            ...inputRegister,bank:bValue
          },
          {
            withCredentials: true,
          }
        );

        toast(res.data.message);
        navigate("/login")
      } catch (error) {
        
        toast(error.response.data);
      }
    
   
  };
  return (
    <div className="formWrapper">
      <h2 className="formWrapper__headerText">Sign in</h2>
      <p className="formWrapper__tagline">Sign in to request appointments!</p>
      <form onSubmit={handleRegister}>
        <div className="formInput">
          <select className="formInput__input" onChange={()=>setIsBank(!isBank)}>
            <option value="customer">Customer</option>
            <option value="bank">Bank</option>
          </select>
          <span className="formInput__error"></span>
        </div>
        {isBank?<>
          <div className="formInput">
          <input
            type="username"
            className="formInput__input"
            onChange={handleChange}
            placeholder="Bank Name"
            required
            name="username"
          />
          <span className="formInput__error"></span>
        </div>
        <div className="formInput">
          <input
            type="email"
            className="formInput__input"
            placeholder="Bank email"
            required
            name="email"
            onChange={handleChange}
          />
          <span className="formInput__error"></span>
        </div>
        <div className="formInput">
          <input
            type="password"
            className="formInput__input"
            placeholder="Enter Password"
            required
            onChange={handleChange}
            name="password"
          />
          <span className="formInput__error"></span>
        </div>
        </>:<>
        <div className="formInput">
          <input
            type="username"
            className="formInput__input"
            onChange={handleChange}
            placeholder="Username"
            required
            name="username"
          />
          <span className="formInput__error"></span>
        </div>
        <div className="formInput">
          <input
            type="email"
            className="formInput__input"
            placeholder="Input Email"
            required
            name="email"
            onChange={handleChange}
          />
          <span className="formInput__error"></span>
        </div>
        <div className="formInput">
          <input
            type="password"
            className="formInput__input"
            placeholder="Enter Password"
            required
            name="password"
            onChange={handleChange}
          />
          <span className="formInput__error"></span>
        </div>
        </>}
        <div className="formOptions">
          <Link to="/login" className="formOption__forgotPassword">
            Login
          </Link>
        </div>
        <button type="submit" className="btn btn-green">
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
