import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRequest = () => {
  const [bankName, setBankName] = useState([]);
  const [number, setNumber] = useState(1);
  const [branch, setBranch] = useState([]);
  const [bank, setBank] = useState(0);
  const navigate = useNavigate();
  const [branchName, setBranchName] = useState("");
  const { user } = useSelector((state) => state.user);
  const [input, setInput] = useState({});
  useEffect(() => {
    const fetchBank = async () => {
      const res = await axios.get("http://localhost:8080/api/v1/banks", {
        withCredentials: true,
      });
      setBankName(res.data);
    };

    fetchBank();
  }, []);
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/v1/branch/user/" + number,
          { withCredentials: true }
        );
        setBranch(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBranch();
  }, [number]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res2 = await axios.get(
        "http://localhost:8080/api/v1/user/" + number,
        { withCredentials: true }
      );

      const res = await axios.post(
        "http://localhost:8080/api/v1/appointments",
        {
          bankName: res2.data.username,
          userId: user.id,
          userName: user.username,
          status: "pending",
          bankLocation: branchName,
          userEmail: user.email,
          ...input,
        }
      );

      toast("Successfully Created an Appointment");
      const res3 = await axios.post("http://localhost:8080/api/v1/sendEmail", {
        recipient: user.email,
        msgBody: `Hey, \n\n You have successfully set an appointment with ${res2.data.username}. We will get back to you soon \n\n Thanks`,
        subject: "Appointment set",
        attachment: "",
      });
      toast(res3.data);
      navigate("/client/myappointments");
    } catch (error) {
      console.log(error);
      toast(error.response.data);
    }
  };
  return (
    <div className="formWrapper">
      <h2 className="formWrapper__headerText">Request an Appointment</h2>
      <p className="formWrapper__tagline">fill the form below</p>

      <label htmlFor="">Select bank name</label>
      <select
        name="bank"
        onChange={(e) => {
          setNumber(e.target.value);
          setBank(e.target.value);
        }}
        className="formInput__input"
        id="service"
      >
        <option value="">Select</option>
        {bankName && (
          <>
            {bankName.map((bank) => (
              <option label={bank.username} value={bank.id}>
                {bank.username}
              </option>
            ))}
          </>
        )}
      </select>
      <label htmlFor="">Select the location</label>
      <select
        name="location"
        onChange={(e) => {
          setBranchName(e.target.value);
          
        }}
        className="formInput__input"
        id="location"
      >
        <option value="">Select</option>
        {branch && (
          <>
            {branch.map((bran) => (
              <option value={bran.location}>{bran.location}=Unavailable on:{bran.note}</option>
            ))}
          </>
        )}
      </select>
              
     
      <label htmlFor="">Purpose</label>
      <textarea
        name="purpose"
        onChange={handleChange}
        className="formInput__input_textarea"
        id="purpose"
        cols="70"
        rows="30"
      >
      
      </textarea>
      <label htmlFor="">Date</label>
      <div className="formInput">
        <input
          type="date"
          className="formInput__input"
          placeholder="Date"
          name="date"
          onChange={handleChange}
        />
        <span className="formInput__error"></span>
      </div>
      <label htmlFor="">Time</label>
      <div className="formInput">
        <input
          type="time"
          className="formInput__input"
          placeholder="Time"
          name="time"
          onChange={handleChange}
        />
        <span className="formInput__error"></span>
      </div>

      <button onClick={handleSubmit} className="btn btn-green">
        submit
      </button>
      <ToastContainer />
    </div>
  );
};

export default CreateRequest;
