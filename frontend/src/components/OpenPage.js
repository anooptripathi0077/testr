import React, { useState } from 'react';
import './OpenPage.css';
import { useNavigate } from 'react-router-dom';

const OpenPage = () => {
    const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { email, password };
    
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard'); // Will create this route
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Something went wrong!');
  }
};

  return (
    <div className="open-page">
      <div className="left-section">
        <img src="/logo4.png" alt="Testr Logo" className="logo" />
        {/* <h1 className="brand-name">TESTR</h1> */}
        {/* <p className="tagline">Your Ultimate Testing Platform</p> */}
      </div>
      
      <div className="right-section">
        <div className={`form-container ${isLogin ? 'login-active' : 'register-active'}`}>
          <div className="form-box">
            <h2>{isLogin ? 'Welcome Back' : 'Join Testr'}</h2>
            <p>{isLogin ? 'Sign in to your account' : 'Create your Testr account'}</p>
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required 
                    className="input-field"
                  />
                </div>
              )}
              
              <div className="input-group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="input-field"
                />
              </div>
              
              <div className="input-group">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="input-field"
                />
              </div>
              
              <button type="submit" className="submit-btn">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            
            <div className="toggle-link">
              <span>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={toggleForm} className="toggle-btn">
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenPage;
