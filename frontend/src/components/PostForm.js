import React, { useState } from 'react';
import { createPost } from '../services/api';
import './PostForm.css';

const PostForm = ({ currentUser, onPostCreated }) => {
  const [formData, setFormData] = useState({
    imageUrl: '',
    review: '',
    location: '',
    tags: '',
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ ...formData, username: currentUser });
    onPostCreated();
    setFormData({
      imageUrl: '',
      review: '',
      location: '',
      tags: '',
      rating: 0,
    });
  };

  return (
    <div className="post-form">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <textarea
          name="review"
          placeholder="Write your review..."
          value={formData.review}
          onChange={handleChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={handleChange}
        />
        <input
          name="rating"
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={formData.rating}
          onChange={handleChange}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostForm;
