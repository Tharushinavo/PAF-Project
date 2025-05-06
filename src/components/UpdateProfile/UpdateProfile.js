import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUserEdit, FaEnvelope, FaLock, FaPhone, FaSave } from 'react-icons/fa';

function UpdateProfile() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/user/${id}`);
                setFormData({
                    full_name: data.full_name || '',
                    email: data.email || '',
                    password: data.password || '',
                    phone: data.phone || '',
                });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchData();
    }, [id]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/user/${id}`, formData);
            alert('Profile updated successfully!');
            navigate('/userProfile');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div>
            <style>{`
                .form-container {
                    max-width: 400px;
                    margin: 50px auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    font-family: Arial, sans-serif;
                    background-color: #fff;
                }
                .form-container h1 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }
                .form-container label {
                    display: flex;
                    align-items: center;
                    margin: 10px 0 5px;
                    font-weight: bold;
                    gap: 8px;
                    color: #333;
                }
                .form-container input {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 14px;
                }
                .form-container button {
                    width: 100%;
                    padding: 10px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    margin-top: 15px;
                    cursor: pointer;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .form-container button:hover {
                    background-color: #218838;
                }
            `}</style>

            <div className="form-container">
                <h1>Update Profile</h1>
                <form onSubmit={onSubmit}>
                    <label htmlFor="fullName"><FaUserEdit /> Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="full_name"
                        onChange={onInputChange}
                        value={formData.full_name}
                        required
                    />

                    <label htmlFor="email"><FaEnvelope /> Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={onInputChange}
                        value={formData.email}
                        required
                    />

                    <label htmlFor="password"><FaLock /> Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={onInputChange}
                        value={formData.password}
                        required
                    />

                    <label htmlFor="phone"><FaPhone /> Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        onChange={onInputChange}
                        value={formData.phone}
                        required
                    />

                    <button type="submit"><FaSave /> Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfile;
