import axios from 'axios';
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = { email, password };

        try {
            const response = await axios.post('http://localhost:8080/user/login', loginDetails);
            if (response.data.id) {
                localStorage.setItem('userId', response.data.id);
                alert('Login Successful');
                window.location.href = "/userProfile";
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            alert('Invalid credentials');
            window.location.href = "/login";
        }
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    };

    const inputStyle = {
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px'
    };

    const buttonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '10px'
    };

    const labelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 'bold',
        marginTop: '10px',
        color: '#333'
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '30px' }}>Login</h1>
            <form onSubmit={onSubmit} style={formStyle}>
                <label htmlFor="email" style={labelStyle}><FaEnvelope /> Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    style={inputStyle}
                />

                <label htmlFor="password" style={labelStyle}><FaLock /> Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    style={inputStyle}
                />

                <button type="submit" style={buttonStyle}>
                    <FaSignInAlt /> Login
                </button>
            </form>
        </div>
    );
}

export default Login;
