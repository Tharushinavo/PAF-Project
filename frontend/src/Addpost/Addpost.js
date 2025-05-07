import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Addpost.css';

function Addpost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
    tags: '',
    location: '',
    rating: '',
    restaurantDescription: '',
    foodQuality: '',
    service: '',
    atmosphere: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageName = '';
      if (formData.image) {
        const imgData = new FormData();
        imgData.append('file', formData.image);
        const imgRes = await axios.post(
          'http://localhost:8080/post/image',
          imgData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        imageName = imgRes.data;
      }

      const payload = {
        id: formData.id,
        title: formData.title,
        content: formData.content,
        tags: formData.tags,
        location: formData.location,
        rating: formData.rating,
        restaurantDescription: formData.restaurantDescription,
        foodQuality: formData.foodQuality,
        service: formData.service,
        atmosphere: formData.atmosphere,
        imageUrl: imageName
      };

      await axios.post('http://localhost:8080/api/posts', payload);
      alert('Post submitted successfully!');
      navigate('/display');
    } catch (err) {
      console.error('Error submitting post:', err);
      alert('Error submitting the post. Please check the console and try again.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Post ID</label><br />
        <input name="id" value={formData.id} onChange={handleChange} required /><br />

        <label>Title</label><br />
        <input name="title" value={formData.title} onChange={handleChange} required /><br />

        <label>Content</label><br />
        <textarea name="content" value={formData.content} onChange={handleChange} required /><br />

        <label>Tags</label><br />
        <input name="tags" value={formData.tags} onChange={handleChange} /><br />

        <label>Location</label><br />
        <input name="location" value={formData.location} onChange={handleChange} /><br />

        <label>Rating</label><br />
        <select name="rating" value={formData.rating} onChange={handleChange} required>
          <option value="" disabled>Select rating</option>
          <option value="1 out of 5">1 out of 5</option>
          <option value="2 out of 5">2 out of 5</option>
          <option value="3 out of 5">3 out of 5</option>
          <option value="4 out of 5">4 out of 5</option>
          <option value="5 out of 5">5 out of 5</option>
        </select><br />

        <label>Restaurant Description</label><br />
        <input name="restaurantDescription" value={formData.restaurantDescription} onChange={handleChange} required /><br />

        <label>Food Quality</label><br />
        <input name="foodQuality" value={formData.foodQuality} onChange={handleChange} required /><br />

        <label>Service</label><br />
        <input name="service" value={formData.service} onChange={handleChange} required /><br />

        <label>Atmosphere</label><br />
        <input name="atmosphere" value={formData.atmosphere} onChange={handleChange} required /><br />

        <label>Upload Image</label><br />
        <input type="file" name="image" onChange={handleImageChange} /><br /><br />

        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default Addpost;










