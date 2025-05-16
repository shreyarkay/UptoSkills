import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const user = 'Me'; // hardcoded for now

  // useCallback to prevent re-creation and warning in useEffect
  const fetchComments = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  }, [postId]);

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      await axios.post(`http://localhost:5000/api/comments/${postId}`, {
        text: comment,
        user,
      });
      setComment('');
      fetchComments();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="mt-4">
      <input
        type="text"
        className="border p-2 rounded w-full mb-2"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleComment}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Comment
      </button>

      <div className="mt-4 space-y-2">
        {comments.map((c, idx) => (
          <div key={idx} className="text-sm bg-gray-100 p-2 rounded">
            <strong>{c.user}</strong>: {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
