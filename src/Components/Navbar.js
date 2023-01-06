import React from 'react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate=useNavigate()
    const onclick=()=>{
        localStorage.removeItem('token')
        navigate('/Login')

    }
    let location = useLocation();
    useEffect(() => {

    }, [location])

    return (
        <><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/Home' ? "active" : ""}`} aria-current="page" to="/Home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/About' ? "active" : ""}`} to="/About">About</Link>
                        </li>
                    </ul>
                    {!(localStorage.getItem('token'))?<form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-1" to="/Login" role="button">Login</Link>
                        <Link className="btn btn-primary" to="/Signup" role="button">SignUp</Link>
                    </form>:<button className='btn btn-primary' onClick={onclick}>Logout</button>}
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar