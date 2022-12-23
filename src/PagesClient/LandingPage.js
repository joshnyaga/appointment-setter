import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"
const LandingPage = () => {
  return (
    <>
    {/* <Link to="/login" className='btn btn-green'>Login Page</Link>
    <Link to="/register" className='btn btn-green'>Register</Link> */}
    <main class="main">
  <div class="card-wrapper">
    <div class="card-summary">
      <h1>Appointment Setter</h1>
      <h2>For Banks</h2>
      <p>
        Create an account and allow your customers to create appointment with you

      </p>
      
    </div>
    
    <div class="card-features">
      <div class="subscribtion">
        <h3 class="feature-title">For Customers</h3>
        <div class="pricing-plan">
          
          <p>Create an appointment with your bank and get response immediately</p>
        </div>
        <Link to="/register" class="btn">Register</Link>
        <Link to="/login" class="btn">Login</Link>
      </div>
      <div class="why-us">
        <h3 class="feature-title">Why Us</h3>
        <ul>
          <li>Connect with your customers</li>
          <li>Allow customers to get emails about appointments</li>
          <li>Set notes of when you are not available</li>
          <li>Create multiple branches in various locations</li>
          
        </ul>
      </div>
    </div>
  </div>
</main>

    </>
  )
}

export default LandingPage