import React from "react";
import { useLocation, Link } from "react-router-dom";
import InternshipNavbar from "../../components/internship/InternshipNavbar";
import { FaCheckCircle, FaClipboardCheck, FaArrowRight, FaEnvelope } from "react-icons/fa"; // Imported icons

export default function InternshipApplicationSuccess() {
  const { state } = useLocation();
  const appId = state?.appId || `APP-${Date.now()}`;

  return (
    <div style={styles.page}>
      <InternshipNavbar />
      <div style={styles.container}>
        <div style={styles.card}>
            
          {/* Success Header */}
          <div style={styles.successHeader}>
            <FaCheckCircle style={styles.successIcon} />
            <h2 style={styles.title}>Application Submitted Successfully!</h2>
            <p style={styles.subtitle}>
              Thank you for applying! We've received your application and will start the review process shortly.
            </p>
          </div>

          {/* Application Details */}
          <div style={styles.detailBox}>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Application ID:</span>
              <strong style={styles.appId}>{appId}</strong>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Date Submitted:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Next Steps Section */}
          <h3 style={styles.stepsTitle}><FaClipboardCheck style={{marginRight: '8px'}} /> What Happens Next?</h3>
          <div style={styles.stepsGrid}>
            <div style={styles.stepItem}>
                <span style={styles.stepNumber}>1</span>
                <p>We review your credentials and fit for the role.</p>
            </div>
            <div style={styles.stepItem}>
                <span style={styles.stepNumber}>2</span>
                <p>Check your email for status updates or interview invitations. <FaEnvelope size={14} style={{color: '#f59e0b'}} /></p>
            </div>
            <div style={styles.stepItem}>
                <span style={styles.stepNumber}>3</span>
                <p>If shortlisted, schedule your interview slot via the portal.</p>
            </div>
          </div>


          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <Link to="/internship/status" style={styles.primaryButton}>
              View My Applications <FaArrowRight style={{marginLeft: 8}}/>
            </Link>
            <Link to="/internship" style={styles.secondaryButton}>
              Browse More Roles
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

/* --- ENHANCED STYLES --- */
const styles = {
  page: { 
    fontFamily: "'Poppins', sans-serif", 
    minHeight: "100vh", 
    background: "linear-gradient(135deg, #f0f4ff, #f6f9fc)",
    paddingTop: '20px' // Added padding for better layout
  },
  container: { 
    padding: 28, 
    maxWidth: 700, 
    margin: '0 auto' 
  },
  card: { 
    background: "white", 
    padding: 30, 
    borderRadius: 16, 
    boxShadow: "0 10px 30px rgba(2,6,23,0.1)",
    borderTop: '5px solid #10b981', // Visual highlight 
  },
  
  successHeader: {
    textAlign: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e0e7ff',
  },
  title: { 
    margin: '10px 0 0', 
    fontSize: 28, 
    fontWeight: 800, 
    color: '#10b981' // Green color for success
  },
  subtitle: { 
    color: "#64748b", 
    fontSize: 16,
    marginTop: 8
  },
  successIcon: {
      fontSize: 60,
      color: '#10b981'
  },

  detailBox: {
    marginBottom: '30px',
    padding: '15px 20px',
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    border: '1px solid #e0e7ff',
  },
  detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '8px',
      fontSize: 15,
  },
  detailLabel: {
      color: '#64748b',
  },
  appId: { 
    color: "#2563eb", 
    fontWeight: 800,
    fontSize: 16
  },
  
  stepsTitle: {
      fontSize: 18,
      fontWeight: 700,
      color: '#1e293b',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
  },
  stepsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      marginBottom: '30px',
  },
  stepItem: {
      display: 'flex',
      gap: '15px',
      alignItems: 'flex-start',
      fontSize: 15,
      color: '#334155',
  },
  stepNumber: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      background: '#2563eb',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      flexShrink: 0,
  },

  actionButtons: { 
    display: "flex", 
    gap: 12, 
    marginTop: 20,
    flexWrap: 'wrap'
  },
  primaryButton: { 
    padding: "12px 20px", 
    background: "linear-gradient(90deg, #10b981, #059669)", 
    color: "white", 
    borderRadius: 10, 
    textDecoration: "none",
    fontWeight: 700,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  secondaryButton: { 
    padding: "12px 20px", 
    border: "2px solid #e0e7ff", 
    color: "#2563eb", 
    background: '#f9fafb',
    borderRadius: 10, 
    textDecoration: "none",
    fontWeight: 600,
    transition: 'all 0.3s ease',
    flexGrow: 1
  }
};

/* --- HOVER EFFECTS --- */
const hoverStyles = `
  a.primaryButton:hover {
    background: linear-gradient(90deg, #059669, #10b981);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(16, 185, 129, 0.6);
  }
  a.secondaryButton:hover {
    border-color: #2563eb;
    background: #e0e7ff;
    transform: translateY(-2px);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);