import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from 'axios'; 
import InternshipNavbar from "../../components/internship/InternshipNavbar"; 
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaFileAlt, FaArrowLeft, FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function InternshipApply() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    resumeText: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  
  // Custom validation
  const validate = () => {
    if (!form.name || !form.email || !form.phone) {
      setErrorMessage("Please fill in your Full Name, Email, and Phone number.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setSubmitting(true);
    setErrorMessage("");

    try {
      // Prepare payload matching backend model
      const payload = {
        ...form,
        roleId: id 
      };

      // Send Data to Backend
      const response = await axios.post('http://localhost:5000/api/internship/apply', payload);

      if (response.data.success) {
        // On success, navigate to success page with the real DB ID
        navigate("/internship/application-success", { 
            state: { 
                appId: `APP-${response.data.data.id}`, 
                openingId: id 
            }
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setErrorMessage(
          error.response?.data?.message || "Failed to connect to server. Is the backend running?"
      );
    } finally {
      setSubmitting(false);
    }
  };
  
  const getRoleTitle = (id) => {
    switch (id) {
        case 'android': return 'Android Development Internship';
        case 'web': return 'Full Stack Web Development Internship';
        case 'cyber': return 'Cyber Security Analyst Internship';
        default: return 'Open Internship Role';
    }
  };
  
  const roleTitle = getRoleTitle(id);

  return (
    <div style={styles.page}>
      <InternshipNavbar />
      <div style={styles.mainContent}>
        <div style={styles.applicationCard}>
            
          <div style={styles.header}>
            <div style={styles.roleInfo}>
              <h1 style={styles.title}>Apply for: {roleTitle}</h1>
              <p style={styles.subtitle}>Fill out the form below to submit your application for the role (ID: {id}).</p>
            </div>
            <Link to="/internship" style={styles.backButton}>
              <FaArrowLeft style={{ marginRight: '8px' }} />
              Back to Open Roles
            </Link>
          </div>
          
          {errorMessage && (
            <div style={styles.errorBox}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            
            <h3 style={styles.formSectionTitle}>Personal Information</h3>
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                  <FaUser style={styles.inputIcon} />
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Full Name" 
                    style={styles.input} 
                    required 
                    className="form-input"
                  />
              </div>
              <div style={styles.inputGroup}>
                  <FaEnvelope style={styles.inputIcon} />
                  <input 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="Email Address" 
                    type="email"
                    style={styles.input} 
                    required 
                    className="form-input"
                  />
              </div>
              <div style={styles.inputGroup}>
                  <FaPhone style={styles.inputIcon} />
                  <input 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange} 
                    placeholder="Phone Number (Required)" 
                    type="tel"
                    style={styles.input} 
                    required 
                    className="form-input"
                  />
              </div>
              <div style={styles.inputGroup}>
                  <FaUniversity style={styles.inputIcon} />
                  <input 
                    name="university" 
                    value={form.university} 
                    onChange={handleChange} 
                    placeholder="University / College" 
                    style={styles.input} 
                    className="form-input"
                  />
              </div>
            </div>

            <h3 style={styles.formSectionTitle}>Resume / Summary</h3>
            <div style={styles.inputGroup}>
                <FaFileAlt style={{ ...styles.inputIcon, top: '20px' }} />
                <textarea 
                    name="resumeText" 
                    value={form.resumeText} 
                    onChange={handleChange} 
                    placeholder="Paste your resume content or a brief summary of your skills here..." 
                    style={styles.textarea} 
                    className="form-textarea"
                />
            </div>

            <div style={styles.actions}>
              <button 
                type="submit" 
                disabled={submitting} 
                style={{
                    ...styles.primaryBtn,
                    ...(submitting ? styles.loadingBtn : {})
                }}
                className="primaryBtn"
              >
                {submitting ? (
                    <>
                        <FaSpinner className="spinner" style={styles.spinner} />
                        Submitting...
                    </>
                ) : (
                    <>
                        <FaCheckCircle style={{ marginRight: '8px' }} />
                        Submit Application
                    </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { 
    fontFamily: "'Poppins', sans-serif", 
    minHeight: "100vh", 
    backgroundColor: "#f8fafc",
    color: "#1e293b",
  },
  mainContent: { 
    padding: "40px 20px", 
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 'calc(100vh - 80px)', 
  },
  applicationCard: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '30px',
    background: "white", 
    borderRadius: 16, 
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)", 
    border: '1px solid #e6eef8'
  },
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "flex-start", 
    marginBottom: 25,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '20px'
  },
  roleInfo: { maxWidth: '70%' },
  title: { 
    margin: 0, 
    fontSize: '24px', 
    fontWeight: '700',
    color: '#2563eb',
  },
  subtitle: { 
    margin: "6px 0 0", 
    color: "#64748b",
    fontSize: '15px'
  },
  backButton: { 
    color: "#2563eb", 
    textDecoration: "none", 
    fontWeight: '600',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formSectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#334155',
    marginTop: '10px',
    marginBottom: '5px'
  },
  grid: { 
    display: "grid", 
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 20, 
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    color: '#64748b',
    fontSize: '16px',
    zIndex: 1
  },
  input: { 
    flex: 1, 
    padding: "12px 12px 12px 40px", 
    borderRadius: 10, 
    border: "2px solid #e2e8f0",
    fontSize: '16px',
    outline: 'none',
  },
  textarea: { 
    width: "100%", 
    padding: "12px 12px 12px 40px", 
    minHeight: 140, 
    borderRadius: 10, 
    border: "2px solid #e2e8f0",
    fontSize: '16px',
    outline: 'none',
    resize: 'vertical',
  },
  actions: { 
    display: "flex", 
    gap: 15, 
    marginTop: 15,
  },
  primaryBtn: { 
    backgroundColor: "#2563eb", 
    color: "white", 
    padding: "14px 24px", 
    borderRadius: 10, 
    border: "none", 
    cursor: "pointer", 
    fontWeight: 600,
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  loadingBtn: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    marginRight: '8px'
  },
  errorBox: {
    backgroundColor: '#fee2e2', 
    color: '#dc2626',
    padding: '12px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid #dc2626',
    fontWeight: '500'
  }
};

const customStyles = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @media (hover: hover) {
    .primaryBtn:hover:not(:disabled) {
      background-color: #1d4ed8;
    }
    .form-input:focus, .form-textarea:focus {
      border-color: #2563eb !important;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
}