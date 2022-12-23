import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdateLocation = () => {
  const [input, setInput] = useState({});
  const [branch, setBranch]= useState({})
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev,...branch, [e.target.name]: e.target.value };
    });
  };
  const {user} = useSelector(state=>state.user)
  const pathname = useLocation().pathname.split("/")[3];
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchBranch = async()=>{
      const res= await axios.get("http://localhost:8080/api/v1/branch/"+pathname, {withCredentials:true})
      setBranch(res.data)
    }
    fetchBranch()
  },[pathname])
  console.log(input)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      const res = await axios.put(
        `http://localhost:8080/api/v1/branch/${pathname}` ,
        {
            ...input,userId:user.id
        },
        { withCredentials: true }
      );
 
        toast("Branch and location updated successfully")
        navigate("/bank/locations")
        
    } catch (error) {
      console.log(error);
      toast("Request failed. Error occurred");
    }
  };
  return (
    <div className="formWrapper">
    <h2 className="formWrapper__headerText">Update  your Branch location</h2>
    <label htmlFor="">Branch Name</label>
      <div className="formInput">
        <input
          type="text"
          className="formInput__input"
          placeholder="Branch name"
          name="branchName"
          onChange={handleChange}
          defaultValue={branch.branchName}
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
          defaultValue={branch.location}
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
          defaultValue={branch.contact}
        />
        <span className="formInput__error"></span>
      </div>
      <textarea
        name="note"
        onChange={handleChange}
        className="formInput__input_textarea"
        id="purpose"
        cols="70"
        rows="30"
        defaultValue={branch.note}
      >
      
      </textarea>
   


    <button onClick={handleSubmit} className="btn btn-green">
      Update
    </button>
    <ToastContainer />
  </div>
  )
}

export default UpdateLocation