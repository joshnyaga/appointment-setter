import axios from "axios";
import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const MyAppointments = () => {
    const [appointments, setAppointments] = useState([])
    let count =0
    const {user} = useSelector(state=>state.user)
    useEffect(()=>{
      const fetchAppointments = async()=>{
        try {
          const res = await axios.get("http://localhost:8080/api/v1/appointments/users/"+user.id,{withCredentials:true})
          setAppointments(res.data)
          console.log(appointments)
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
            <th>Bank Name</th>
            <th>location</th>
            <th>purpose</th>
            <th>Date</th>
            <th>time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>

         {appointments!==undefined?<>{appointments.map((appointment)=>(
            <tr>
              <td>{count+=1}</td>
              <td>{appointment.bankName}</td>
              <td>{appointment.bankLocation}</td>
              <td>{appointment.purpose}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status==="processed"?<>Check Email</>:<>{appointment.status}</>}</td>
            </tr>
         ))}</>:<>
         
         </>}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointments;
