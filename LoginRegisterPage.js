import React, { useState } from 'react';
import axios from 'axios';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';

    try {
      const response = await axios.post(`http://localhost:5000/api/auth${endpoint}`, {
        email,
        password
      });
      setMessage(response.data.message);
      if (isLogin) {
        // Redirect to dashboard or home
        window.location.href = '/dashboard';
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Something went wrong';
      setMessage(errorMsg);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>{message}</p>
      <button onClick={toggleForm}>
        {isLogin ? 'Need to Register?' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default LoginRegisterPage;
