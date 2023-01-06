import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
  const { alertt } = props
  const [credentials, setcredentials] = useState({ name: '', email: '', password: '', cpassword: '' })
  const host = 'http://localhost:5000'
  let navigate = useNavigate();

  const onsubmit = async (e) => {
    const { name, email, password } = credentials
    e.preventDefault()
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ name, email, password }) // body data type must match "Content-Type" header
    });
    const res = await response.json(); // parses JSON response into native JavaScript objects
    console.log(res)
    if (res.sucess) {
      localStorage.setItem('token', res.token)
      navigate("/")
      alertt('Account created sucessfully', 'success')

    }
    else{
      alertt('Invalid details','danger')
    }
  }

    const onchange = (e) => {
      e.preventDefault()
      setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
      <div className='container my-3'>
        <h2 className='my-3'>Create a user account</h2>
        <form onSubmit={onsubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onchange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }

  export default SignUp