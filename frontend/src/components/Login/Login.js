import axios from 'axios';
import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    
    const validate = () => {
        const errs = {};
        if (!email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Invalid email format";
        if (!password) errs.password = "Password is required";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        if (!validate()) return;
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/user/login', { email, password });
            if (response.data.id) {
                localStorage.setItem('userId', response.data.id);
                window.location.href = "/userProfile";
            } else {
                setSubmitError('Invalid credentials');
            }
        } catch (err) {
            setSubmitError('Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    //styles
    const pageStyle = {
        minHeight: '100vh',
        backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        width: '100%',
        padding: '32px',
        borderRadius: '14px',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
    };

    const inputContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        border: '1.5px solid #ddd',
        borderRadius: '6px',
        margin: '10px 0',
        padding: '10px',
        backgroundColor: 'white'
    };

    const inputStyle = {
        border: 'none',
        outline: 'none',
        fontSize: '16px',
        flex: 1,
        background: 'transparent'
    };

    const buttonStyle = {
        padding: '12px 0',
        borderRadius: '6px',
        backgroundColor: '#FF5733',
        color: 'white',
        border: 'none',
        fontSize: '17px',
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '18px',
        fontWeight: 600,
        transition: 'background-color 0.3s'
    };

    const labelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: 'bold',
        marginTop: '10px',
        color: '#333'
    };

    const errorStyle = {
        color: '#e53935',
        fontSize: '0.97em',
        margin: '2px 0 0 5px'
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
        <div style={pageStyle}>
            <form onSubmit={onSubmit} style={formStyle} autoComplete="off" noValidate>
                <h1 style={{ textAlign: 'center', marginBottom: '18px', color: '#333', fontWeight: 700, letterSpacing: 1 }}>Login</h1>

                <label htmlFor="email" style={labelStyle}><FaEnvelope /> Email</label>
                <div style={inputContainerStyle}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={e => { setEmail(e.target.value); setErrors({ ...errors, email: '' }); setSubmitError(''); }}
                        value={email}
                        required
                        style={inputStyle}
                        placeholder="you@email.com"
                        autoFocus
                    />
                </div>
                {errors.email && <div style={errorStyle}>{errors.email}</div>}

                <label htmlFor="password" style={labelStyle}><FaLock /> Password</label>
                <div style={inputContainerStyle}>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        onChange={e => { setPassword(e.target.value); setErrors({ ...errors, password: '' }); setSubmitError(''); }}
                        value={password}
                        required
                        style={inputStyle}
                        placeholder="Enter your password"
                    />
                    <button
                        type="button"
                        style={togglePasswordStyle}
                        tabIndex={-1}
                        onClick={() => setShowPassword(prev => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.password && <div style={errorStyle}>{errors.password}</div>}

                {submitError && <div style={errorStyle}>{submitError}</div>}

                <button type="submit" style={buttonStyle} disabled={loading}>
                    {loading ? <ClipLoader color="#fff" size={22} /> : <><FaSignInAlt /> Login</>}
                </button>
            </form>
        </div>
    );
}

export default Login;
