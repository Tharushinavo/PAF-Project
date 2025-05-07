import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Display.css';

function Display() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/posts"); 
      setPosts(result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const UpdateNavigate = (postId) => {
    navigate(`/update/${postId}`);
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/posts/${postId}`);
      alert(`Post ID ${postId} deleted successfully.`);
      loadPosts(); // Refresh the table
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  return (
    <div className="display-container">
      <h1>Post Details</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Image</th>
            <th>Tags</th>
            <th>Location</th>
            <th>Rating</th>
            <th>Restaurant Description</th>
            <th>Food Quality</th>
            <th>Service</th>
            <th>Atmosphere</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={index}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                {post.imageUrl ? (
                  <img
                    src={`http://localhost:8080/api/posts/uploads/${post.imageUrl}`}
                    alt={post.title}
                    width="50"
                    height="50"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{post.tags}</td>
              <td>{post.location}</td>
              <td>{post.rating}</td>
              <td>{post.restaurantDescription}</td>
              <td>{post.foodQuality}</td>
              <td>{post.service}</td>
              <td>{post.atmosphere}</td>
              <td>
                <button className="edit-btn" onClick={() => UpdateNavigate(post.id)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Display;






