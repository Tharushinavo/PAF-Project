import React from 'react';
import './Home.css'; // Import the CSS file

function Home() {
    return (
        <div className="home-container">
            <h1 className="group-details-title">Group Details</h1>
            <div className="button-container">
                <button className="custom-button" onClick={() => (window.location.href = '/addgroup')}>
                    Add Group
                </button>
                <button className="custom-button" onClick={() => (window.location.href = '/allgroups')}>
                    All Groups
                </button>
            </div>
        </div>
    );
}

export default Home;
