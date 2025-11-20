import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaCalendarCheck, FaClock, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import InternshipNavbar from "../../components/internship/InternshipNavbar"; // <-- CORRECTED IMPORT

// Mock statuses: Adding more realistic statuses and updating the mock data for better demonstration
const mockApplications = [
  { id: "APP-2025-001", role: "Frontend Intern (React)", date: "2025-10-06", status: "Rejected", progress: 100, canSchedule: false },
  { id: "APP-2025-002", role: "Backend Intern (Node.js)", date: "2025-09-28", status: "Interview Scheduled", progress: 75, canSchedule: true, interviewDate: "Oct 25, 2025, 10:00 AM" },
  { id: "APP-2025-003", role: "Data Science Intern", date: "2025-10-20", status: "Under Review", progress: 30, canSchedule: false },
  { id: "APP-2025-004", role: "UI/UX Designer", date: "2025-11-15", status: "Application Received", progress: 10, canSchedule: false },
  { id: "APP-2025-005", role: "Cloud Engineer", date: "2025-11-01", status: "Hired", progress: 100, canSchedule: false },
];

export default function InternshipStatus() {
  const [apps] = useState(mockApplications);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Hired":
        return { backgroundColor: 'var(--success)', icon: FaCheckCircle };
      case "Rejected":
        return { backgroundColor: 'var(--error)', icon: FaTimesCircle };
      case "Interview Scheduled":
      case "Interview":
        return { backgroundColor: 'var(--warning)', icon: FaCalendarCheck };
      case "Under Review":
      default:
        return { backgroundColor: 'var(--primary)', icon: FaClock };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hired": return 'var(--success)';
      case "Rejected": return 'var(--error)';
      case "Interview Scheduled":
      case "Interview": return 'var(--warning)';
      default: return 'var(--text-primary)';
    }
  };

  return (
    <div style={styles.page}>
      <InternshipNavbar />
      <div style={styles.mainContent}>
        <div style={styles.container}>
          {/* Header Section */}
          <div style={styles.header}>
            <h2 style={styles.title}>My Internship Applications</h2>
            <Link to="/internship" style={styles.browseLink} className="browseLink">
              <FaArrowLeft style={{ marginRight: '8px' }} />
              Browse More Roles
            </Link>
          </div>

          <div style={styles.applicationsGrid}>
            {apps.length === 0 ? (
              <div style={styles.noApplications}>
                <FaGraduationCap style={{ fontSize: '48px', color: 'var(--text-secondary)' }} />
                <h3>You haven't submitted any applications yet.</h3>
                <Link to="/internship" style={styles.browseButton}>
                  Start Applying Now
                </Link>
              </div>
            ) : (
              apps.map((a) => {
                const statusInfo = getStatusStyle(a.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <div key={a.id} style={styles.appCard} className="appCard">
                    {/* Role & ID */}
                    <div style={styles.infoSection}>
                      <div style={styles.roleTitle}>{a.role}</div>
                      <div style={styles.appMeta}>{a.id} • Applied {a.date}</div>
                      
                      {/* Progress Bar */}
                      <div style={styles.progressContainer}>
                        <div style={styles.progressBar}>
                          <div 
                            style={{
                              ...styles.progressFill,
                              width: `${a.progress}%`,
                              backgroundColor: a.progress === 100 ? 'var(--success)' : 'var(--primary)'
                            }} 
                          />
                        </div>
                        <span style={styles.progressText}>{a.progress}% Complete</span>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div style={styles.statusSection}>
                        <div style={{ ...styles.statusBadge, backgroundColor: statusInfo.backgroundColor, color: statusInfo.status === "Rejected" ? 'white' : 'var(--text-primary)' }}>
                            <StatusIcon style={{ marginRight: '6px' }} />
                            {a.status}
                        </div>
                        
                        {a.status === "Interview Scheduled" && (
                            <div style={styles.interviewInfo}>
                                <FaCalendarCheck style={{ marginRight: '6px' }} />
                                {a.interviewDate}
                            </div>
                        )}

                        {a.canSchedule && (
                            <Link to="/internship/scheduler" style={styles.actionButton} className="actionButton">
                                Schedule / View Interview
                            </Link>
                        )}
                        
                        {a.status === "Hired" && (
                            <Link to="/dashboard" style={{ ...styles.actionButton, backgroundColor: 'var(--success)' }} className="actionButton">
                                View Offer Details
                            </Link>
                        )}
                        
                        {a.status === "Rejected" && (
                            <button style={{ ...styles.actionButton, backgroundColor: 'var(--error)', cursor: 'default' }} className="actionButton" disabled>
                                Feedback Received
                            </button>
                        )}

                        {!a.canSchedule && a.status !== "Hired" && a.status !== "Rejected" && (
                            <div style={styles.pendingAction}>
                                <FaClock style={{ marginRight: '6px' }} />
                                Awaiting response
                            </div>
                        )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  // Global/Layout Styles (from InternshipApply.js, for consistency)
  page: { 
    fontFamily: "'Poppins', sans-serif", 
    minHeight: "100vh", 
    backgroundColor: "var(--background)",
    color: "var(--text-primary)",
  },
  mainContent: {
    padding: "40px 20px", 
    maxWidth: '1200px', 
    margin: '0 auto'
  },
  container: { 
    width: '100%' 
  },
  
  // Header and Navigation
  header: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 30,
    paddingBottom: '10px',
    borderBottom: '1px solid var(--border)'
  },
  title: { 
    margin: 0, 
    fontSize: '28px', 
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  browseLink: { 
    color: "var(--primary)", 
    textDecoration: "none",
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: 'var(--hover-bg)',
    transition: 'background-color 0.3s ease'
  },

  // Applications List
  applicationsGrid: { 
    display: "flex", 
    flexDirection: 'column', 
    gap: 20 
  },
  appCard: { 
    backgroundColor: "var(--surface)", 
    padding: '25px', 
    borderRadius: 16, 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    boxShadow: "var(--shadow)",
    border: '1px solid var(--border)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  },
  infoSection: {
    flex: 1,
    paddingRight: '20px',
  },
  roleTitle: { 
    fontWeight: 700, 
    fontSize: '18px', 
    color: 'var(--text-primary)' 
  },
  appMeta: { 
    color: "var(--text-secondary)", 
    marginTop: 6,
    fontSize: '14px' 
  },

  // Progress Bar
  progressContainer: { 
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  progressBar: { 
    height: 8, 
    backgroundColor: "var(--hover-bg)", 
    borderRadius: 8, 
    overflow: "hidden", 
    width: 200,
  },
  progressFill: { 
    height: "100%", 
    transition: 'width 0.5s ease',
    borderRadius: 8,
  },
  progressText: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--text-secondary)'
  },

  // Status and Actions
  statusSection: { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px',
    minWidth: '220px'
  },
  statusBadge: { 
    fontWeight: 700, 
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '120px',
    textAlign: 'center'
  },
  interviewInfo: {
      fontSize: '14px',
      color: 'var(--warning)',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
  },
  actionButton: { 
    padding: "10px 16px", 
    backgroundColor: "var(--primary)", 
    color: "white", 
    borderRadius: 8, 
    textDecoration: "none",
    fontWeight: 600,
    fontSize: '14px',
    transition: 'background-color 0.3s ease'
  },
  pendingAction: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
  },

  // Empty State
  noApplications: {
    textAlign: 'center',
    padding: '60px',
    backgroundColor: 'var(--surface)',
    borderRadius: '16px',
    border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)',
    color: 'var(--text-secondary)',
  },
  browseButton: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '20px',
    display: 'inline-block',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease'
  }
};

// Inject custom hover and responsive styles
const customStyles = `
  @media (hover: hover) {
    .appCard:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .browseLink:hover {
        background-color: var(--primary);
        color: white;
    }

    .actionButton:hover {
      background-color: var(--primary-dark, #1d4ed8);
    }
    
    .noApplications a:hover {
        background-color: var(--primary-dark, #1d4ed8);
    }
    
    a.actionButton[style*="background-color: var(--success)"]:hover {
        background-color: #047857 !important; /* Darker success */
    }
    
    button.actionButton[disabled][style*="background-color: var(--error)"] {
        opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    .appCard {
      flex-direction: column;
      align-items: flex-start !important;
      gap: 15px;
    }
    
    .statusSection {
        align-items: flex-start !important;
        min-width: 100%;
    }
    
    .progressContainer {
        width: 100%;
    }
    
    .progressBar {
        width: 100% !important;
    }
    
    .actionButton {
        width: 100%;
        text-align: center;
    }
    
    .pendingAction {
        width: 100%;
        justify-content: center;
        padding: 8px 16px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background-color: var(--hover-bg);
    }
  }
`;

// Append CSS to head to enable dynamic styling and animations
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
}