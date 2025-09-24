import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    loginIdentifier: '',
    loginPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Map frontend fields to backend expected fields
    const payload = {
      username: form.loginIdentifier,
      password: form.loginPassword
    };
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        toast.success('Login successful! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        const data = await response.json();
        setError(data.error || data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  }

  return (
    <div className="container" id="authContainer">
      <div className="logo">
        <img src="logo.png" alt="logo" />
        <span className="brand">
          <span className="green">C</span>
          <span className="blue">o</span>
          <span className="green">n</span>
          <span className="blue">v</span>
          <span className="green">e</span>
          <span className="blue">r</span>
          <span className="green">g</span>
          <span className="blue">e</span>
        </span>
      </div>
      <p className="subtitle">The all-in-one remote work collaboration platform</p>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="form-title">Login to your account</div>
        <label>Email or Username</label>
        <input
          type="text"
          id="loginIdentifier"
          placeholder="naitik@example.com or Naitik"
          value={form.loginIdentifier}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          id="loginPassword"
          value={form.loginPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '1rem' }}>{success}</div>}
      </form>
      <button
        type="button"
        className="tab"
        style={{ marginTop: '1rem' }}
        onClick={() => navigate('/register')}
      >
        If you don't have an account, Register
      </button>
      
    </div>
  );
}