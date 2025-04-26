import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const Registerpage = () => {
    const [credentials, setCredentials] = useState({
        name:'',
        email:'',
        password1:'',
        password2:''
    })

  const {handleUserRegister} = useAuth()

  const handleInputChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setCredentials({...credentials, [name]:value})
    // console.log("cred:", credentials)
  }
  return (
    <div className="auth--container">
    <div className="form--wrapper">
      <form onSubmit={(e) => {handleUserRegister(e, credentials)}}>
      <div className="field--wrapper">
          <label htmlFor="">Name:</label>
          <input
            type="text"
            required
            name="name"
            placeholder="Enter your name"
            value={credentials.name}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="field--wrapper">
          <label htmlFor="">Email:</label>
          <input
            type="email"
            required
            name="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="field--wrapper">
          <label htmlFor="">Password:</label>
          <input
            type="password"
            required
            name="password1"
            placeholder="Enter password..."
            value={credentials.password1}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="field--wrapper">
          <label htmlFor="">Confirm Password:</label>
          <input
            type="password"
            required
            name="password2"
            placeholder="Confirm your password..."
            value={credentials.password2}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="field--wrapper">
          <input className="btn btn--lg btn--main " type="submit" value="Register" />
        </div>
      </form>
          <p>Already have an account? <Link to="/login">Click here</Link></p>

    </div>
  </div>
  )
}

export default Registerpage