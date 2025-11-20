import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';

function InternshipNavbar() {
  return (
    <header style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo/Title */}
        <Link to="/internship" style={styles.logoLink}>
            <FaGraduationCap style={styles.logoIcon} />
            <h1 style={styles.logoText}>Internship Portal</h1>
        </Link>
        
        {/* Navigation Links */}
        <nav style={styles.nav}>
          <Link to="/internship" style={styles.navLink}>Open Roles</Link>
          <Link to="/internship/status" style={styles.navLink}>My Applications</Link>
          {/* Add more links if needed */}
        </nav>
      </div>
    </header>
  );
}

const styles = {
  navbar: {
    backgroundColor: 'var(--header-bg, #ffffff)',
    padding: '8px 20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderBottom: '1px solid var(--border, #e5e7eb)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10px 0',
  },
  logoLink: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
      fontSize: '24px',
      color: 'var(--primary, #2563eb)',
  },
  logoText: {
    color: 'var(--primary, #2563eb)',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    textDecoration: 'none',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    padding: '6px 10px',
    borderRadius: '5px',
    transition: 'all 0.2s ease',
    fontSize: '15px',
  },
  // Add hover styles via CSS injection if necessary
};

export default InternshipNavbar;