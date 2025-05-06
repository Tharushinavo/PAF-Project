import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";

function Register() {
    const [user, setUser] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: ''
    });

    const { full_name, email, password, phone } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/user/register", user);
            if (response.status === 201) {
                alert("Registration successful!");
                window.location.href = "/login"; // Redirect to login page
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert("Registration failed. Please try again!");
        }
    };

    // Styles
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9'
    };

    const inputContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '5px',
        margin: '10px 0',
        padding: '10px',
        backgroundColor: 'white'
    };

    const iconStyle = {
        marginRight: '10px',
        color: '#888'
    };

    const inputStyle = {
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        flex: 1
    };

    const buttonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        marginTop: '15px'
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Register</h1>
            <form onSubmit={onSubmit} style={formStyle}>

                <label htmlFor="fullName">Full Name</label>
                <div style={inputContainerStyle}>
                    <FaUser style={iconStyle} />
                    <input
                        type="text"
                        id="fullName"
                        name="full_name"
                        onChange={onInputChange}
                        value={full_name}
                        required
                        style={inputStyle}
                    />
                </div>

                <label htmlFor="email">Email</label>
                <div style={inputContainerStyle}>
                    <FaEnvelope style={iconStyle} />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={onInputChange}
                        value={email}
                        required
                        style={inputStyle}
                    />
                </div>

                <label htmlFor="password">Password</label>
                <div style={inputContainerStyle}>
                    <FaLock style={iconStyle} />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={onInputChange}
                        value={password}
                        required
                        style={inputStyle}
                    />
                </div>

                <label htmlFor="phone">Phone</label>
                <div style={inputContainerStyle}>
                    <FaPhone style={iconStyle} />
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        onChange={onInputChange}
                        value={phone}
                        required
                        style={inputStyle}
                    />
                </div>

                <button type="submit" style={buttonStyle}>Register</button>
            </form>
        </div>
    );
}

export default Register;
