import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const handleDisplayClick = () => {
    window.location.href = '/display';
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="fade-in">📬 Post Management App</h1>
        <p className="home-subtitle fade-in-delay">Effortlessly manage your posts with style and speed!</p>
        <div className="home-buttons slide-up">
          <Link to="/addpost" className="home-link">➕ Add New Post</Link>
          <button className="home-button" onClick={handleDisplayClick}>📋 View Posts</button>
        </div>
      </div>
    </div>
  );
}

export default Home;





