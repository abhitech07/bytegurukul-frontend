import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.signupBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>Join ByteGurukul</h1>
          <p style={styles.subtitle}>Create your account to get started</p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.nameGroup}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>First Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="First name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Last Name</label>
              <input 
                type="text" 
                placeholder="Last name"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.roleGroup}>
            <label style={styles.label}>I am a</label>
            <div style={styles.roleOptions}>
              <label style={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="role" 
                  value="student" 
                  checked={formData.role === 'student'}
                  onChange={handleChange}
                  style={styles.radio} 
                />
                Student
              </label>
              <label style={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="role" 
                  value="instructor" 
                  checked={formData.role === 'instructor'}
                  onChange={handleChange}
                  style={styles.radio} 
                />
                Instructor
              </label>
            </div>
          </div>

          <div style={styles.terms}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} required />
              I agree to the <a href="/terms" style={styles.termsLink}>Terms & Conditions</a>
            </label>
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.signupButton,
              ...(isLoading ? styles.loadingButton : {})
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={styles.loginLink}>
          Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
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
  signupBox: {
    backgroundColor: 'var(--surface)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-lg)',
    width: '100%',
    maxWidth: '450px',
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
    gap: '20px',
  },
  nameGroup: {
    display: 'flex',
    gap: '15px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
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
  roleGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  roleOptions: {
    display: 'flex',
    gap: '20px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--text-secondary)',
    fontSize: '14px'
  },
  radio: {
    margin: 0
  },
  terms: {
    margin: '10px 0',
    color: 'var(--text-secondary)'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  checkbox: {
    margin: 0
  },
  termsLink: {
    color: 'var(--primary)',
    textDecoration: 'none'
  },
  signupButton: {
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
  loginLink: {
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    marginTop: '20px'
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
    .signup-input:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
    }
    
    .signup-button:hover:not(:disabled) {
      background-color: var(--primary-dark);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = focusStyle;
document.head.appendChild(styleSheet);

export default Signup;