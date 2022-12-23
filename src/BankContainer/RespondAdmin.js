import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchFailure, fetchSuccess } from "../redux/appointmentSlice";

const RespondAdmin = () => {
    const [input, setInput] = useState({});
    const [approvedStatus, setApprovedStatus]= useState("")
    const dispatch = useDispatch()
    const {appointment} = useSelector(state=>state.appointment)
    const pathname = useLocation().pathname.split("/")[3];
    useEffect(()=>{
      const fetchAppointment = async()=>{
       
        try {
          const res = await axios.get(
            "http://localhost:8080/api/v1/appointments/"+pathname ,
          
            { withCredentials: true }
          );
          
          dispatch(fetchSuccess(res.data))
          console.log(res.data)
          
         
        } catch (error) {
          console.log(error);
          toast("Request failed. Error occurred");
          dispatch(fetchFailure())
        }
      }
      fetchAppointment()
    },[pathname])
    const handleChange = (e) => {
        setInput((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const res = await axios.post(
            "http://localhost:8080/api/v1/approval" ,
            {
                ...input,appointmentId: pathname
            },
            { withCredentials: true }
          );
          if(res.data.approved===1){setApprovedStatus("Yes")}else{setApprovedStatus("No")}
          console.log(appointment.userEmail, appointment.userName, appointment.bankName)
          const res3 = await axios.post("http://localhost:8080/api/v1/sendEmail", {
            recipient: appointment.userEmail,
            msgBody: `Hey ${appointment.userName}, \n\n This is a response of the appointment you created with ${appointment.bankName}.\n Approved Status: ${approvedStatus} \n Comment: ${res.data.comment} \n\n Thanks`,
            subject: "Responding to your Previous Appointment",
            attachment: "",
          });
         toast(res3.data)
         const resUpdate = await axios.put(`http://localhost:8080/api/v1/appointments/${appointment.appointmentId}`,{
          userId: appointment.userId,
          bankName: appointment.bankName,
          userName: appointment.userName,
          userEmail: appointment.userEmail,
          bankLocation: appointment.bankLocation,
          purpose: appointment.purpose,
          date: appointment.date,
          time: appointment.time,
          status: "processed"
         },{withCredentials:true})
         toast("Appointment Updated Successfully")
        
        } catch (error) {
          console.log(error);
          toast("Request failed. Error occurred");
        }
      };
  return (
    <div className="formWrapper">
    <h2 className="formWrapper__headerText">Respond to appointment</h2>

    <label htmlFor="">Comment</label>
    <textarea
      name="comment"
      onChange={handleChange}
      className="formInput__input_textarea"
      id="comment"
      cols="70"
      rows="30"
    >
      as
    </textarea>
    <label htmlFor="">Approve?</label>
    <div className="formInput">
      <select name="approved" className='formInput__input' onChange={handleChange}>
      <option >Select option</option>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
      <span className="formInput__error"></span>
    </div>


    <button onClick={handleSubmit} className="btn btn-green">
      submit
    </button>
    <ToastContainer />
  </div>
  )
}

export default RespondAdmin