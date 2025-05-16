import React, { useState } from 'react';
import CommentSection from './CommentSection';
import axios from 'axios';

const PostCard = ({ post, refresh }) => {
  const [showComments, setShowComments] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);

  const handleLike = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/posts/${post._id}/like`);
      setLikeCount((prev) => prev + 1);
      refresh(); // to reflect new like count in backend
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <p className="text-gray-800 mb-2">{post.content}</p>
      <p className="text-sm text-gray-500 mb-2"><strong> {post.author}  </strong> </p>
      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          className="text-blue-600 hover:underline"
        >
          ❤️ Like ({likeCount})
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-green-600 hover:underline"
        >
          💬 Comments ({post.comments?.length || 0})
        </button>
      </div>

      {showComments && <CommentSection postId={post._id} />}
    </div>
  );
};

export default PostCard;
