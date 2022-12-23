import axios from "axios";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchFailure, fetchSuccess, remove } from "../redux/appointmentSlice";

const AppointmentsAdmin = () => {
    const [appointments, setAppointments] = useState([])
    const dispatch = useDispatch();
    
    dispatch(remove())
    let count =0
    const {user} = useSelector(state=>state.user)
    useEffect(()=>{
      const fetchAppointments = async()=>{
        try {
          const res = await axios.get("http://localhost:8080/api/v1/appointments",{withCredentials:true})
          setAppointments(res.data)
        } catch (error) {
          toast("An error occurred fetching data")
        }
      }
      fetchAppointments()
    },[])
   


  return (
    <div className="container">
      
    <table className="styled-table">
      <thead>
        <tr>
          <th>No</th>
          <th>User name</th>
          <th>location</th>
          <th>purpose</th>
          <th>Date</th>
          <th>time</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

       {appointments!==undefined?<>{appointments.map((appointment)=>(
          <tr>
            <td>{count+=1}</td>
            <td>{appointment.userName}</td>
            <td>{appointment.bankLocation}</td>
            <td>{appointment.purpose}</td>
            <td>{appointment.date}</td>
            <td>{appointment.time}</td>
            <td>{appointment.status}</td>
            <td>{appointment.status==="processed"?<></>:<Link to={`/bank/respond/${appointment.appointmentId}`} onClick={async()=>{
        try {
          const res = await axios.get(
            "http://localhost:8080/api/v1/appointments/"+appointment.appointmentId ,

            { withCredentials: true }
          );
          
          dispatch(fetchSuccess(res.data))
         
        } catch (error) {
          console.log(error);
          toast("Request failed. Error occurred");
          dispatch(fetchFailure())
        }
      }} className="btn btn-green">Respond</Link>}</td>
          </tr>
       ))}</>:<>
       
       </>}
      </tbody>
    </table>
  </div>
  )
}

export default AppointmentsAdmin