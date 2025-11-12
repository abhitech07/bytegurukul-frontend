import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaLaptopCode, FaFileAlt } from 'react-icons/fa';

function Home() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>
            Welcome to <span style={{ color: '#e0e7ff' }}>ByteGurukul</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Your complete learning platform for <strong>AKTU B.Tech</strong> & <strong>M.Tech</strong> Computer Science.
            Access courses, projects, internships, and previous year questions — all in one place.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/courses" style={styles.primaryButton}>Explore Courses</Link>
            <Link to="/signup" style={styles.secondaryButton}>Sign Up Free</Link>
          </div>
        </div>

        {/* Hero Image */}
        <div style={styles.heroRight}>
          <img
            src="/hero-learning.png"
            alt="Learning Illustration"
            style={styles.heroImage}
          />
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Why Choose ByteGurukul?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <FaBookOpen style={{ fontSize: '60px', color: '#2563eb', marginBottom: '20px' }} />
            <h3 style={styles.featureTitle}>Study Resources</h3>
            <p style={styles.featureDesc}>
              Download notes, books, and presentations for all CS courses.
            </p>
          </div>

          <div style={styles.featureCard}>
            <FaLaptopCode style={{ fontSize: '60px', color: '#9333ea', marginBottom: '20px' }} />
            <h3 style={styles.featureTitle}>Domain Projects</h3>
            <p style={styles.featureDesc}>
              Purchase ready-to-use projects categorized by domains.
            </p>
          </div>

          <div style={styles.featureCard}>
            <FaFileAlt style={{ fontSize: '60px', color: '#2563eb', marginBottom: '20px' }} />
            <h3 style={styles.featureTitle}>PYQ Papers</h3>
            <p style={styles.featureDesc}>
              Access previous year question papers with solutions.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.about}>
        <h2 style={styles.aboutTitle}>About the Creator</h2>
        <div style={styles.aboutContainer}>
          <img src="/abhijeet.jpg" alt="Abhijeet Kumar Pandey" style={styles.aboutImage} />
          <div style={styles.aboutContent}>
            <h3 style={styles.aboutName}>Abhijeet Kumar Pandey</h3>
            <p style={styles.aboutRole}>Cyber Security Analyst | M.Tech (CSE)</p>
            <p style={styles.aboutBio}>
              I’m passionate about technology, cybersecurity, and education. ByteGurukul is my initiative to make learning accessible for
              AKTU B.Tech & M.Tech students — providing quality study materials, projects, and guidance for everyone who dreams big.
            </p>
            <div style={styles.socialLinks}>
              <a href="mailto:abhijeet.kr.pandey.07@gmail.com" style={styles.socialButton}>📧 Email</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={styles.socialButton}>🔗 LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.socialButton}>💻 GitHub</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif",
  },

  // ---------- HERO SECTION ----------
  hero: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '100px 40px',
    background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
    color: 'white',
    boxShadow: 'inset 0 -80px 80px rgba(0,0,0,0.1)',
    animation: 'fadeInUp 1.2s ease',
  },
  heroLeft: {
    flex: 1,
    minWidth: '300px',
    paddingRight: '40px',
  },
  heroRight: {
    flex: 1,
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    maxWidth: '500px',
    borderRadius: '16px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
  },
  heroTitle: {
    fontSize: '50px',
    marginBottom: '20px',
    fontWeight: '800',
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '40px',
    opacity: '0.95',
    lineHeight: 1.6,
    color: '#f8fafc',
  },
  heroButtons: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  primaryButton: {
    padding: '14px 30px',
    background: 'linear-gradient(90deg, #ffffff 0%, #e0e7ff 100%)',
    color: '#2563eb',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: '700',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
  },
  secondaryButton: {
    padding: '14px 30px',
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: '700',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },

  // ---------- FEATURES SECTION ----------
  features: {
    padding: '100px 20px',
    background: 'linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '38px',
    marginBottom: '60px',
    color: '#1e293b',
    fontWeight: '700',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  featureCard: {
    background: 'linear-gradient(145deg, #ffffff 0%, #eef2ff 100%)',
    padding: '45px 35px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.15)',
    textAlign: 'center',
    border: 'none',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  featureTitle: {
    fontSize: '26px',
    marginBottom: '15px',
    color: '#1e293b',
    fontWeight: '600',
  },
  featureDesc: {
    fontSize: '16px',
    color: '#475569',
    lineHeight: '1.7',
  },

  // ---------- ABOUT SECTION ----------
  about: {
    padding: '100px 20px',
    background: 'linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%)',
    textAlign: 'center',
  },
  aboutTitle: {
    fontSize: '38px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '60px',
  },
  aboutContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '50px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  aboutImage: {
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    border: '5px solid #fff',
  },
  aboutContent: {
    maxWidth: '550px',
    textAlign: 'left',
  },
  aboutName: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: '10px',
  },
  aboutRole: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#9333ea',
    marginBottom: '20px',
  },
  aboutBio: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#475569',
    marginBottom: '25px',
  },
  socialLinks: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  socialButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
};

// ---------- Hover & Animation Styles ----------
const hoverAndKeyframes = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (hover: hover) {
    a:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
    }

    .featureCard:hover {
      transform: translateY(-10px);
      box-shadow: 0 14px 28px rgba(37, 99, 235, 0.25);
      background: linear-gradient(145deg, #ffffff 0%, #e0f2fe 100%);
      transition: all 0.3s ease;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverAndKeyframes;
document.head.appendChild(styleSheet);

export default Home;