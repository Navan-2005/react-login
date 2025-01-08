import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();

        const data = { name, password };

        axios.post('http://localhost:8080/', data)
            .then((response) => {
                console.log(response.data.message);
                setErrorMessage('');
                navigate('/home');
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
                console.error("Error:", error.response?.data || error.message);
            });
    };

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <form onSubmit={handlesubmit}>
                <h3>Login Here</h3>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Email or Phone"
                    onChange={(e) => setname(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setpassword(e.target.value)}
                />
                <button type="submit">Log In</button>
                <p>Dont have an account? <a className="link" href="/signup">SignUp</a></p>
            </form>
        </div>
    );
}

export default Login;
