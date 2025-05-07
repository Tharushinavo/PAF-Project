import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaTrashAlt, FaUtensils } from 'react-icons/fa';

//
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

    if (loading) return <p style={{ color: '#fff' }}>Loading...</p>;
    if (error) return <p style={{ color: '#fff' }}>{error}</p>;

    return (
        <div style={outerContainerStyle}>
            <div style={overlayStyle} />
            <div style={containerStyle}>
                <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="User Avatar"
                    style={avatarStyle}
                />
                <h2 style={headingStyle}>Welcome, {user.full_name.split(" ")[0]}!</h2>

                <div style={infoCardStyle}>
                    <p style={infoTextStyle}><strong>Full Name:</strong> {user.full_name}</p>
                    <p style={infoTextStyle}><strong>Email:</strong> {user.email}</p>
                    <p style={infoTextStyle}><strong>Phone:</strong> {user.phone}</p>
                </div>

                <div style={buttonGroupStyle}>
                    <button style={{ ...btnStyle, ...btnUpdateStyle }} onClick={() => UpdateNavigate(user.id)}>
                        <FaUserEdit /> Edit Profile
                    </button>
                    <button style={{ ...btnStyle, ...btnMealStyle }} onClick={goToMealPlan}>
                        <FaUtensils /> Meal Plans
                    </button>
                    <button style={{ ...btnStyle, ...btnDeleteStyle }} onClick={deleteAccount}>
                        <FaTrashAlt /> Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}

const outerContainerStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
};

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 0,
};

const containerStyle = {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '50px 35px',
    borderRadius: '20px',
    maxWidth: '480px',
    width: '90%',
    textAlign: 'center',
    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.3s',
};

const avatarStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '4px solid #28a745',
    transition: 'transform 0.3s',
};

const headingStyle = {
    marginBottom: '25px',
    fontSize: '30px',
    color: '#333',
    fontWeight: '700',
};

const infoCardStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '30px',
    boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)',
};

const infoTextStyle = {
    fontSize: '16px',
    color: '#444',
    margin: '10px 0',
};

const buttonGroupStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
};

const btnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    fontSize: '15px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease-in-out',
    minWidth: '160px',
};

const btnUpdateStyle = {
    backgroundColor: '#007bff',
    color: 'white',
};

const btnDeleteStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
};

const btnMealStyle = {
    backgroundColor: '#28a745',
    color: 'white',
};

export default UserProfile;
