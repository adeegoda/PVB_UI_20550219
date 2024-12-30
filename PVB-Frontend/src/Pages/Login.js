// filepath: /Users/anjanadeegoda/Projects/MIT_Final/PaperlessVotingBooth/PVB_UI_20550219/PVB-Frontend/src/Pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../Resources/loginPage.css'; // Import the stylesheet

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      history.push('/backOffice');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <h2>PVB Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;