import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserEdit, FaEnvelope, FaLock, FaPhone, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

//
function UpdateProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/user/${id}`);
                setFormData({
                    full_name: data.full_name || '',
                    email: data.email || '',
                    password: '', // Don't display existing password
                    phone: data.phone || '',
                });
            } catch (error) {
                console.error('Error fetching user:', error);
                setFormErrors({ fetch: 'Failed to load profile data' });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;

        if (!formData.full_name.trim()) errors.full_name = 'Full name is required';
        if (!emailRegex.test(formData.email)) errors.email = 'Invalid email format';
        if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
        if (!phoneRegex.test(formData.phone)) errors.phone = 'Invalid phone number (10 digits required)';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
       
        if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            await axios.put(`http://localhost:8080/user/${id}`, formData);
            navigate('/userProfile', { state: { success: 'Profile updated successfully!' } });
        } catch (error) {
            console.error('Update error:', error);
            setFormErrors({ submit: error.response?.data?.message || 'Update failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="loader-container">
                <ClipLoader color="#28a745" size={50} />
            </div>
        );
    }

    return (
        <div className="profile-update-container">
            <div className="update-form-card">
                <h1><FaUserEdit /> Update Profile</h1>
                
                {formErrors.fetch && (
                    <div className="error-banner">{formErrors.fetch}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName"><FaUserEdit /> Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleInputChange}
                            className={formErrors.full_name ? 'input-error' : ''}
                        />
                        {formErrors.full_name && 
                            <span className="error-message">{formErrors.full_name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email"><FaEnvelope /> Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={formErrors.email ? 'input-error' : ''}
                        />
                        {formErrors.email && 
                            <span className="error-message">{formErrors.email}</span>}
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password"><FaLock /> Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={formErrors.password ? 'input-error' : ''}
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {formErrors.password && 
                            <span className="error-message">{formErrors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone"><FaPhone /> Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={formErrors.phone ? 'input-error' : ''}
                            placeholder="1234567890"
                        />
                        {formErrors.phone && 
                            <span className="error-message">{formErrors.phone}</span>}
                    </div>

                    {formErrors.submit && 
                        <div className="error-message submit-error">{formErrors.submit}</div>}

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ClipLoader color="#fff" size={20} />
                        ) : (
                            <>
                                <FaSave /> Update Profile
                            </>
                        )}
                    </button>
                </form>
            </div>

            <style jsx>{`
                .profile-update-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                                url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80');
                    background-size: cover;
                    background-position: center;
                    padding: 2rem;
                }

                .update-form-card {
                    background: rgba(255, 255, 255, 0.95);
                    padding: 2.5rem;
                    border-radius: 1rem;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 500px;
                    backdrop-filter: blur(10px);
                }

                h1 {
                    text-align: center;
                    color: #2c3e50;
                    margin-bottom: 2rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    justify-content: center;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #34495e;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                input {
                    width: 100%;
                    padding: 0.8rem;
                    border: 2px solid #e0e0e0;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    transition: border-color 0.3s ease;
                }

                input:focus {
                    outline: none;
                    border-color: #28a745;
                    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.15);
                }

                .input-error {
                    border-color: #dc3545;
                }

                .input-error:focus {
                    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.15);
                }

                .error-message {
                    color: #dc3545;
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    display: block;
                }

                .submit-btn {
                    width: 100%;
                    padding: 1rem;
                    background: #28a745;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .submit-btn:hover {
                    background: #218838;
                }

                .submit-btn:disabled {
                    background: #6c757d;
                    cursor: not-allowed;
                }

                .password-group {
                    position: relative;
                }

                .password-input-wrapper {
                    position: relative;
                }

                .password-toggle {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: #6c757d;
                    cursor: pointer;
                    padding: 0.25rem;
                }

                .error-banner {
                    background: #dc3545;
                    color: white;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .loader-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
            `}</style>
        </div>
    );
}

export default UpdateProfile;
