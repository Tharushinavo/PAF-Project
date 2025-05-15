import React, { useEffect, useState } from 'react';
import {
  fetchPosts,
  addLike,
  removeLike,
} from '../services/api';
import CommentSection from './CommentSection';
import './PostList.css';

const PostList = ({ currentUser, refreshSignal }) => {
  const [posts, setPosts] = useState([]);
  const [reloadKey, setReloadKey] = useState(Date.now());

  const loadPosts = async () => {
    const response = await fetchPosts();
    setPosts(response.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [refreshSignal]);

  const handleLike = async (postId) => {
    await addLike(postId, currentUser);
    loadPosts();
    setReloadKey(Date.now());
  };

  const handleUnlike = async (postId) => {
    await removeLike(postId, currentUser);
    loadPosts();
  };

  return (
    <div className="post-list">
      {posts.map((post) => {
        console.log('Image URL for post', post.id, ':', post.imageUrl); // Debug image URL

        return (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h3>@{post.username}</h3>
            </div>
            <div className="post-body">
              <img src={post.imageUrl} alt="Post" className="post-image" />
              <p className="review">{post.review}</p>
              <div className="post-info">
                <p><strong>📍 Location:</strong> {post.location}</p>
                <p><strong>🏷️ Tags:</strong> {post.tags}</p>
                <p><strong>⭐ Rating:</strong> {post.rating}</p>
                <p><strong>❤️ Likes:</strong> {post.likesCount}</p>
              </div>
              <div className="post-actions">
                <button onClick={() => handleLike(post.id)}>👍 Like</button>
                <button onClick={() => handleUnlike(post.id)}>👎 Unlike</button>
              </div>
            </div>

            <CommentSection
              postId={post.id}
              currentUser={currentUser}
              onActivity={() => setReloadKey(Date.now())}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
