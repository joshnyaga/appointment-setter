import axios from "axios";
import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LocationsAdmin = () => {
    const [branch, setBranch] = useState([])
    let count =0
    const {user} = useSelector(state=>state.user)
    useEffect(()=>{
      const fetchBranch = async()=>{
        try {
          const res = await axios.get("http://localhost:8080/api/v1/branch/user/"+user.id,{withCredentials:true})
          setBranch(res.data)
          console.log(branch)
        } catch (error) {
          toast("An error occurred fetching data")
        }
      }
      fetchBranch()
    },[])
    
  return (
    <div className="container">
      <Link to="/bank/locations-add" className="btn btn-green">Add Branch</Link>
      
    <table className="styled-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Branch Name</th>
          <th>location</th>
          <th>Contact</th>
          <td>Action</td>
        </tr>
      </thead>
      <tbody>

       {branch!==undefined?<>{branch.map((bran)=>(
          <tr>
            <td>{count+=1}</td>
            <td>{bran.branchName}</td>
            <td>{bran.location}</td>
            <td>{bran.contact}</td>
            <td><Link to={`/bank/location-update/${bran.branchId}`} className="btn btn-green">Edit</Link><Link onClick={async()=>{await axios.delete(`http://localhost:8080/api/v1/branch/${bran.branchId}`, {withCredentials:true})}} className="btn btn-red">Delete</Link></td>
          </tr>
       ))}</>:<>
       
       </>}
      </tbody>
    </table>
  </div>
  )
}

export default LocationsAdmin