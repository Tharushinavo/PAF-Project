import axios from 'axios';

const API_BASE_URL = 'http://localhost:8020/api/api/posts';

export const fetchPosts = () => axios.get(API_BASE_URL);

export const createPost = (postData) => axios.post(API_BASE_URL, postData);

export const addComment = (postId, commentData) =>
  axios.post(`${API_BASE_URL}/${postId}/comments`, commentData);

export const updateComment = (commentId, commentData) =>
  axios.put(`${API_BASE_URL}/comments/${commentId}`, commentData);

export const deleteComment = (commentId) =>
  axios.delete(`${API_BASE_URL}/comments/${commentId}`);

export const addLike = (postId, username) =>
  axios.post(`${API_BASE_URL}/${postId}/likes`, null, {
    params: { username },
  });

export const removeLike = (postId, username) =>
  axios.delete(`${API_BASE_URL}/${postId}/likes`, {
    params: { username },
  });

export const fetchNotifications = (username, isRead) =>
  axios.get(`${API_BASE_URL}/notifications/${username}`, {
    params: { isRead },
  });

export const fetchComments = (postId) =>
  axios.get(`${API_BASE_URL}/${postId}/comments`);

