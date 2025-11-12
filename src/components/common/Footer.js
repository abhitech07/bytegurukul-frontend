import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h3 style={styles.heading}>ByteGurukul</h3>
          <p style={styles.text}>Empowering AKTU students with quality education resources and projects.</p>
        </div>
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <a href="/courses" style={styles.link}>Courses</a>
          <a href="/resources" style={styles.link}>Resources</a>
          <a href="/projects" style={styles.link}>Projects</a>
        </div>
        <div style={styles.section}>
          <h4 style={styles.heading}>Support</h4>
          <a href="/help" style={styles.link}>Help Center</a>
          <a href="/contact" style={styles.link}>Contact Us</a>
        </div>
      </div>
      <div style={styles.copyright}>
        <p>&copy; 2025 ByteGurukul. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--footer-bg)',
    color: 'var(--text-primary)',
    padding: '40px 0 20px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '30px',
    padding: '0 20px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  heading: {
    fontSize: '18px',
    marginBottom: '10px',
    color: 'var(--text-primary)'
  },
  text: {
    color: 'var(--text-secondary)'
  },
  link: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  copyright: {
    textAlign: 'center',
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border)',
    color: 'var(--text-secondary)'
  }
};

// Add hover effects
const hoverStyle = `
  @media (hover: hover) {
    .footer-link:hover {
      color: var(--primary);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default Footer;