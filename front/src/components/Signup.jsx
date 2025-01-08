import { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const data = { name, password };

        axios.post('http://localhost:8080/signup', data)
            .then((response) => {
                console.log(response.data.message); 
                setErrorMessage(''); 
                navigate('/');   
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
                <h3>Signup here</h3>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <label htmlFor="name">Username</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Username"
                    onChange={(e) => setname(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setpassword(e.target.value)}
                />

                <button type="submit">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
