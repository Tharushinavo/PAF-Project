import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Update.css';

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
    imageUrl: '',
    tags: '',
    location: '',
    rating: '',
    restaurantDescription: '',
    foodQuality: '',
    service: '',
    atmosphere: '',
  });
<div className="update-container"> ... </div>

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
        const postData = response.data;

        setFormData({
          id: postData.id || '',
          title: postData.title || '',
          content: postData.content || '',
          imageUrl: '', // Don't prefill file input
          tags: postData.tags || '',
          location: postData.location || '',
          rating: postData.rating || '',
          restaurantDescription: postData.restaurantDescription || '',
          foodQuality: postData.foodQuality || '',
          service: postData.service || '',
          atmosphere: postData.atmosphere || '',
        });
      } catch (err) {
        console.error('Error fetching post data:', err);
      }
    };

    fetchPostData();
  }, [id]);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    const postPayload = {
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
    };

    // ✅ Send 'post' as a JSON Blob
    data.append('post', new Blob([JSON.stringify(postPayload)], { type: 'application/json' }));

    // ✅ Include image if selected
    if (formData.imageUrl && typeof formData.imageUrl !== 'string') {
      data.append('file', formData.imageUrl);
    }

    try {
      await axios.put(`http://localhost:8080/api/posts/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Post Updated!');
      navigate('/allitems');
    } catch (err) {
      console.error('Error updating post:', err.response?.data || err.message);
      alert('Failed to update post. Please check the console for details.');
    }
  };

  return (
    <div>
      <h2>Update Post</h2>
      <form onSubmit={onSubmit}>
        <label>Post ID (readonly)</label><br />
        <input type="text" name="id" value={formData.id} readOnly /><br />

        <label>Title</label><br />
        <input type="text" name="title" value={formData.title} onChange={onInputChange} required /><br />

        <label>Content</label><br />
        <input type="text" name="content" value={formData.content} onChange={onInputChange} required /><br />

        <label>Tags</label><br />
        <input type="text" name="tags" value={formData.tags} onChange={onInputChange} required /><br />

        <label>Location</label><br />
        <input type="text" name="location" value={formData.location} onChange={onInputChange} required /><br />

        <label>Rating</label><br />
        <select name="rating" value={formData.rating} onChange={onInputChange} required>
          <option value="" disabled>Select rating</option>
          <option value="1 out of 5">1 out of 5</option>
          <option value="2 out of 5">2 out of 5</option>
          <option value="3 out of 5">3 out of 5</option>
          <option value="4 out of 5">4 out of 5</option>
          <option value="5 out of 5">5 out of 5</option>
        </select><br />

        <label>Restaurant Description</label><br />
        <input type="text" name="restaurantDescription" value={formData.restaurantDescription} onChange={onInputChange} required /><br />

        <label>Food Quality</label><br />
        <input type="text" name="foodQuality" value={formData.foodQuality} onChange={onInputChange} required /><br />

        <label>Service</label><br />
        <input type="text" name="service" value={formData.service} onChange={onInputChange} required /><br />

        <label>Atmosphere</label><br />
        <input type="text" name="atmosphere" value={formData.atmosphere} onChange={onInputChange} required /><br />

        <label>Image (optional)</label><br />
        <input
          type="file"
          name="imageUrl"
          accept="image/*"
          onChange={onInputChange}
        /><br /><br />

        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}

export default Update;
