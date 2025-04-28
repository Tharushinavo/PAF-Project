import React, { useState } from 'react';
import axios from 'axios';

function AddPost() {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    content: '',
    tags: '',
    location: '',
    rating: '',
    image: null // For image upload
  });

  // Handle form data change
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0] // Store the selected file
    });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // First, upload the image if it's provided
      let imageName = '';
      if (formData.image) {
        const formDataImage = new FormData();
        formDataImage.append('file', formData.image);

        const imageResponse = await axios.post('http://localhost:8080/post/image', formDataImage, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        imageName = imageResponse.data; // Assuming the response contains the image name or URL
      }

      // Now, create the post with or without the image URL
      const postData = {
        ...formData,
        postImage: imageName // Attach the image name (if uploaded)
      };

      const response = await axios.post('http://localhost:8080/api/posts', postData);
      console.log('Post submitted:', response.data);
      alert('Post submitted successfully!');
      window.location.reload(); // Reload the page to reset the form
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Error submitting the post. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Post</h2>
      <form id="postform" onSubmit={onSubmit}>
        <label htmlFor="id">Post ID</label><br />
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={onInputChange}
          required
        /><br />

        <label htmlFor="title">Title</label><br />
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          required
        /><br />

        <label htmlFor="content">Content</label><br />
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={onInputChange}
        /><br />

        <label htmlFor="tags">Tags</label><br />
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={onInputChange}
          required
        /><br />

        <label htmlFor="location">Location</label><br />
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={onInputChange}
          required
        /><br />

        <label htmlFor="rating">Rating</label><br />
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={onInputChange}
          required
        >
          <option value="" disabled>Select rating</option>
          <option value="1 out of 5">1 out of 5</option>
          <option value="2 out of 5">2 out of 5</option>
          <option value="3 out of 5">3 out of 5</option>
          <option value="4 out of 5">4 out of 5</option>
          <option value="5 out of 5">5 out of 5</option>
        </select><br />

        <label htmlFor="image">Upload Image</label><br />
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
        /><br />

        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default AddPost;


