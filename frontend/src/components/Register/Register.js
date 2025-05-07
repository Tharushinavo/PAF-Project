import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

function Register() {
    const [user, setUser] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    // Validation logic
    const validate = () => {
        const errs = {};
        if (!user.full_name.trim()) errs.full_name = "Full name is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) errs.email = "Invalid email format";
        if (user.password.length < 6) errs.password = "Password must be at least 6 characters";
        if (!/^\d{10}$/.test(user.phone)) errs.phone = "Phone must be 10 digits";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
        setSubmitError('');
        setSubmitSuccess('');
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setSubmitError('');
        setSubmitSuccess('');
        try {
            const response = await axios.post("http://localhost:8080/user/register", user);
            if (response.status === 201) {
                setSubmitSuccess("Registration successful! Redirecting to login...");
                setTimeout(() => window.location.href = "/login", 1500);
            }
        } catch (error) {
            setSubmitError(error.response?.data?.message || "Registration failed. Please try again!");
        } finally {
            setLoading(false);
        }
    };

   //styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1600891964599-f61ba0e24092")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        width: '100%',
        padding: '30px',
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.20)'
    };

    const inputContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        border: '1.5px solid #ddd',
        borderRadius: '6px',
        margin: '10px 0',
        padding: '10px',
        backgroundColor: 'white',
        position: 'relative'
    };

    const iconStyle = {
        marginRight: '10px',
        color: '#888'
    };

    const inputStyle = {
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        flex: 1,
        background: 'transparent'
    };

    const buttonStyle = {
        padding: '12px 20px',
        borderRadius: '6px',
        backgroundColor: '#FF7043',
        color: 'white',
        border: 'none',
        fontSize: '17px',
        cursor: loading ? 'not-allowed' : 'pointer',
        marginTop: '18px',
        fontWeight: 600,
        transition: 'background-color 0.3s'
    };

    const errorStyle = {
        color: '#e53935',
        fontSize: '0.95em',
        margin: '3px 0 0 5px'
    };

    const successStyle = {
        color: '#388e3c',
        fontSize: '1em',
        margin: '10px 0 0 0',
        textAlign: 'center'
    };

    const togglePasswordStyle = {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#888',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={onSubmit} style={formStyle} autoComplete="off" noValidate>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontWeight: 700, letterSpacing: 1 }}>Register</h2>

                <label htmlFor="fullName">Full Name</label>
                <div style={inputContainerStyle}>
                    <FaUser style={iconStyle} />
                    <input
                        type="text"
                        id="fullName"
                        name="full_name"
                        onChange={onInputChange}
                        value={user.full_name}
                        required
                        style={inputStyle}
                        placeholder="Enter your full name"
                        autoFocus
                    />
                </div>
                {errors.full_name && <div style={errorStyle}>{errors.full_name}</div>}

                <label htmlFor="email">Email</label>
                <div style={inputContainerStyle}>
                    <FaEnvelope style={iconStyle} />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={onInputChange}
                        value={user.email}
                        required
                        style={inputStyle}
                        placeholder="you@email.com"
                    />
                </div>
                {errors.email && <div style={errorStyle}>{errors.email}</div>}

                <label htmlFor="password">Password</label>
                <div style={inputContainerStyle}>
                    <FaLock style={iconStyle} />
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        onChange={onInputChange}
                        value={user.password}
                        required
                        style={inputStyle}
                        placeholder="At least 6 characters"
                    />
                    <button
                        type="button"
                        style={togglePasswordStyle}
                        tabIndex={-1}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.password && <div style={errorStyle}>{errors.password}</div>}

                <label htmlFor="phone">Phone</label>
                <div style={inputContainerStyle}>
                    <FaPhone style={iconStyle} />
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        onChange={onInputChange}
                        value={user.phone}
                        required
                        style={inputStyle}
                        placeholder="10-digit phone number"
                        maxLength={10}
                    />
                </div>
                {errors.phone && <div style={errorStyle}>{errors.phone}</div>}

                {submitError && <div style={errorStyle}>{submitError}</div>}
                {submitSuccess && <div style={successStyle}>{submitSuccess}</div>}

                <button type="submit" style={buttonStyle} disabled={loading}>
                    {loading ? <ClipLoader color="#fff" size={22} /> : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;
