import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your ByteGurukul account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.remember}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} />
              Remember me
            </label>
            <a href="/forgot" style={styles.forgotLink}>Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.loginButton,
              ...(isLoading ? styles.loadingButton : {})
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerText}>or continue with</span>
        </div>

        <div style={styles.socialButtons}>
          <button type="button" style={styles.googleButton}>
            <span style={styles.socialIcon}>🔗</span>
            Google
          </button>
          <button type="button" style={styles.githubButton}>
            <span style={styles.socialIcon}>💻</span>
            GitHub
          </button>
        </div>

        <div style={styles.signupLink}>
          Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'var(--background)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  loginBox: {
    backgroundColor: 'var(--surface)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-lg)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid var(--border)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    color: 'var(--primary)',
    fontSize: '28px',
    marginBottom: '8px',
    fontWeight: 'bold'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '14px'
  },
  errorBox: {
    backgroundColor: 'var(--error-bg, #fef2f2)',
    color: 'var(--error)',
    padding: '12px 15px',
    borderRadius: '8px',
    marginBottom: '20px',
    border: '1px solid var(--error-border, #fecaca)',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontWeight: '500'
  },
  input: {
    padding: '12px 15px',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: 'var(--surface)',
    color: 'var(--text-primary)'
  },
  remember: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  checkbox: {
    margin: 0
  },
  forgotLink: {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontSize: '14px'
  },
  loginButton: {
    padding: '12px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease'
  },
  loadingButton: {
    backgroundColor: 'var(--text-secondary)',
    cursor: 'not-allowed'
  },
  divider: {
    position: 'relative',
    textAlign: 'center',
    margin: '25px 0',
    color: 'var(--text-secondary)'
  },
  dividerText: {
    backgroundColor: 'var(--surface)',
    padding: '0 15px',
    fontSize: '14px'
  },
  socialButtons: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  googleButton: {
    flex: 1,
    padding: '10px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--surface)',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    transition: 'background-color 0.3s ease'
  },
  githubButton: {
    flex: 1,
    padding: '10px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--surface)',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    transition: 'background-color 0.3s ease'
  },
  socialIcon: {
    fontSize: '16px'
  },
  signupLink: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '14px'
  },
  link: {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontWeight: '500'
  }
};

// Add focus styles
const focusStyle = `
  @media (hover: hover) {
    .login-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }
    
    .google-button:hover, .github-button:hover {
      background-color: var(--hover-bg);
    }
    
    .login-button:hover:not(:disabled) {
      background-color: var(--primary-dark);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = focusStyle;
document.head.appendChild(styleSheet);

export default Login;