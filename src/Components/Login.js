
import React,{useState} from 'react'
import { useNavigate} from 'react-router-dom'
const Login = (props) => {
    const {alertt}=props
    const host = 'http://localhost:5000'
    const [credentials, setcredentials] = useState({ email: '', password: '' })
    let navigate=useNavigate()

    const onsubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email: credentials.email, password :credentials.password}) // body data type must match "Content-Type" header
        });
        const res = await response.json(); // parses JSON response into native JavaScript objects
        console.log(res)
        if(res.sucess){
            // save the auth token in local storage and redirect
            localStorage.setItem('token',res.token)
            console.log('congratulations')
            navigate("/")
            alertt("logged in Sucessfully","success")

        }
        else{
            alertt('Invalid credentials','danger')
        }
    }

    const onchange = (e) => {
        e.preventDefault()
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <div className='container my-3'>
            <h2 className='my-3'>Please Login to use iNotebook</h2>
            <form onSubmit={onsubmit}>
                <div className="form-group ">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Login</button>
            </form>
        </div>
    )
}

export default Login