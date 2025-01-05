import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
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
    <div className="login_container">
      <h2>PVB Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="login_form-group">
          <label className="login_label">Username</label>
          <input className="login_input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="login_form-group">
          <label className="login_label">Password</label>
          <input className="login_input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <button className="login_button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;