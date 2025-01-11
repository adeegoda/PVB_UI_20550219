import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../Resources/registerPage.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:4000/auth/register', { username, password });
      history.push('/login');
    } catch (error) {
      setError('Error registering user');
    }
  };

  return (
    <div className="registerContainer">
      <h2 className='registerPage'>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label className='registerPage_label'>Username</label>
          <input className='registerPage_input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label className='registerPage_label'>Password</label>
          <input className='registerPage_input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label className='registerPage_label'>Confirm Password</label>
          <input className='registerPage_input' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {error && <p>{error}</p>}
        <button className='registerPage_button' type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;