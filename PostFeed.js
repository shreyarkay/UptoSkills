import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';




const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        author: 'janedoe',
      });
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-2">Create a Post</h2>
      <input
        className="w-full p-2 border rounded mb-2"
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows={3}
        placeholder="Write your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleCreatePost}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Post
      </button>

      <div className="mt-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default PostFeed;

