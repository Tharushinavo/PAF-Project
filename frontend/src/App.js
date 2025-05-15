import React, { useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import NotificationPanel from './components/NotificationPanel';
import './App.css';  // Make sure this path is correct!

const App = () => {
  const [currentUser, setCurrentUser] = useState('john_doe');

  // For reloading posts after new post is created
  const [refreshPostsTrigger, setRefreshPostsTrigger] = useState(0);

  // For triggering notification reload on likes/comments
  const [reloadKey, setReloadKey] = useState(Date.now());

  const handlePostCreated = () => {
    setRefreshPostsTrigger(Date.now());
  };

  return (
    <div className="app-container">
      <h1>Welcome to Testagram</h1>

      <NotificationPanel currentUser={currentUser} reloadKey={reloadKey} />

      <PostForm currentUser={currentUser} onPostCreated={handlePostCreated} />

      <PostList
        currentUser={currentUser}
        refreshSignal={refreshPostsTrigger}
        setReloadKey={setReloadKey}
      />
    </div>
  );
};

export default App;
