import React, { useEffect, useState } from 'react';
import './CommentSection.css';

import {
  addComment,
  updateComment,
  deleteComment,
  fetchComments,
} from '../services/api';

const CommentSection = ({ postId, currentUser, onActivity }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const response = await fetchComments(postId);
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await addComment(postId, {
        username: currentUser,
        content: newComment,
      });
      setNewComment('');
      await loadComments();
      if (onActivity) onActivity(); // ✅ trigger notification reload
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleUpdateComment = async () => {
    try {
      await updateComment(editingCommentId, {
        content: editingContent,
      });
      setEditingCommentId(null);
      setEditingContent('');
      await loadComments();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      await loadComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>

      {comments.length === 0 && <p>No comments yet.</p>}

      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <div>
            <strong>{comment.username}</strong>: {comment.content}
          </div>
          {comment.username === currentUser && (
            <div className="comment-actions">
              <button
                onClick={() => {
                  setEditingCommentId(comment.id);
                  setEditingContent(comment.content);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}

      {editingCommentId ? (
        <div className="comment">
          <input
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
            placeholder="Edit your comment"
          />
          <div className="comment-actions">
            <button onClick={handleUpdateComment}>Update</button>
          </div>
        </div>
      ) : (
        <div className="comment">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <div className="comment-actions">
            <button onClick={handleAddComment}>Post Comment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
