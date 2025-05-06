import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaTrashAlt, FaUtensils } from 'react-icons/fa';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User not logged in');
            setLoading(false);
            return;
        }
        axios.get(`http://localhost:8080/user/${userId}`)
            .then(response => {
                setUser(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Error fetching user data');
                setLoading(false);
            });
    }, []);

    const UpdateNavigate = (id) => {
        navigate(`/updateprofile/${id}`);
    };

    const goToMealPlan = () => {
        navigate("/meal-planner");
    };

    const deleteAccount = async () => {
        const userId = localStorage.getItem('userId');
        const confirmation = window.confirm('Are you sure you want to delete this account?');
        if (confirmation) {
            try {
                await axios.delete(`http://localhost:8080/user/${userId}`);
                alert('Account deleted successfully');
                localStorage.removeItem('userId');
                navigate('/register');
            } catch (error) {
                alert('Error deleting account');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <style>{`
                .profile-container {
                    max-width: 450px;
                    margin: 50px auto;
                    padding: 30px;
                    border: 1px solid #ccc;
                    border-radius: 12px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-color: #fdfdfd;
                }

                .avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 20px;
                    border: 2px solid #007bff;
                }

                .profile-container h2 {
                    margin-bottom: 15px;
                    color: #333;
                }

                .profile-container p {
                    font-size: 16px;
                    margin: 8px 0;
                    color: #444;
                }

                .button-group {
                    margin-top: 20px;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 16px;
                    font-size: 14px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.2s ease-in-out;
                }

                .btn-update {
                    background-color: #007bff;
                    color: white;
                }

                .btn-update:hover {
                    background-color: #0056b3;
                }

                .btn-delete {
                    background-color: #dc3545;
                    color: white;
                }

                .btn-delete:hover {
                    background-color: #b02a37;
                }

                .btn-meal {
                    background-color: #28a745;
                    color: white;
                }

                .btn-meal:hover {
                    background-color: #218838;
                }
            `}</style>

            <div className="profile-container">
                <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="User Avatar"
                    className="avatar"
                />
                <h2>User Profile</h2>
                {user ? (
                    <>
                        <p><strong>Full Name:</strong> {user.full_name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>

                        <div className="button-group">
                            <button className="btn btn-update" onClick={() => UpdateNavigate(user.id)}>
                                <FaUserEdit /> Update Profile
                            </button>
                            <button className="btn btn-delete" onClick={deleteAccount}>
                                <FaTrashAlt /> Delete Account
                            </button>
                            <button className="btn btn-meal" onClick={goToMealPlan}>
                                <FaUtensils /> Add Meal Plan
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No user found</p>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
