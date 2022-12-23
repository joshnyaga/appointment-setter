import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddLocation = () => {
  const [input, setInput] = useState({});
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const {user} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/branch" ,
        {
            ...input,userId:user.id
        },
        { withCredentials: true }
      );
 
        toast("Branch and location added successfully")
        navigate("/bank/locations")
        
    } catch (error) {
      console.log(error);
      toast("Request failed. Error occurred");
    }
  };
  return (
    <div className="formWrapper">
    <h2 className="formWrapper__headerText">Add a branch</h2>
    <label htmlFor="">Branch Name</label>
      <div className="formInput">
        <input
          type="text"
          className="formInput__input"
          placeholder="Branch name"
          name="branchName"
          onChange={handleChange}
        />
        <span className="formInput__error"></span>
      </div>
      <label htmlFor="">Location</label>
      <div className="formInput">
        <input
          type="text"
          className="formInput__input"
          placeholder="Location name"
          name="location"
          onChange={handleChange}
        />
        <span className="formInput__error"></span>
      </div>
      <label htmlFor="">Contact</label>
      <div className="formInput">
        <input
          type="number"
          className="formInput__input"
          placeholder="Phone Number"
          name="contact"
          onChange={handleChange}
        />
        <span className="formInput__error"></span>
      </div>
      <label htmlFor="">List days unavailable</label>
      <textarea
        name="note"
        onChange={handleChange}
        className="formInput__input_textarea"
        id="note"
        cols="70"
        rows="30"
      >
      
      </textarea>
   


    <button onClick={handleSubmit} className="btn btn-green">
      submit
    </button>
    <ToastContainer />
  </div>
  )
}

export default AddLocation