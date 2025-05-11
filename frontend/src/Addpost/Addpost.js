import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Addpost.css';

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    rating: '',
    food_quality: '',
    service: '',
    atmosphere: '',
    restaurant_description: '',
    tags: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append the image file
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Create a copy of formData and remove the image field
      const { image, ...postData } = formData;

      // Convert the post data to JSON string and append
      formDataToSend.append('post', JSON.stringify(postData));

      // Send the multipart/form-data request
      await axios.post('http://localhost:8080/api/posts', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Post submitted successfully!');
      navigate('/display');
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('Error submitting the post. Please check the console and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Content</label>
      <input type="text" name="content" value={formData.content} onChange={handleChange} required />

      <label>Location</label>
      <input type="text" name="location" value={formData.location} onChange={handleChange} required />

      <label>Rating</label>
      <select name="rating" value={formData.rating} onChange={handleChange} required>
        <option value="">Select Rating</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>

      <label>Food Quality</label>
      <input type="text" name="food_quality" value={formData.food_quality} onChange={handleChange} required />

      <label>Service</label>
      <input type="text" name="service" value={formData.service} onChange={handleChange} required />

      <label>Atmosphere</label>
      <input type="text" name="atmosphere" value={formData.atmosphere} onChange={handleChange} required />

      <label>Restaurant Description</label>
      <input type="text" name="restaurant_description" value={formData.restaurant_description} onChange={handleChange} required />

      <label>Tags</label>
      <input type="text" name="tags" value={formData.tags} onChange={handleChange} required />

      <label>Image</label>
      <input type="file" name="image" onChange={handleChange} accept="image/*" required />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddPost;










