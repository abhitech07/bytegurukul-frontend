import React from 'react';

function Internship() {
  const internships = [
    {
      title: 'Android Development',
      category: 'Mobile Development',
      duration: '3 months',
      level: 'Beginner to Advanced',
      skills: ['Java', 'Kotlin', 'Android Studio', 'Firebase'],
      projects: '5 Real Projects',
      stipend: 'Unpaid + Certificate',
      icon: '📱'
    },
    {
      title: 'Cyber Security',
      category: 'Security',
      duration: '4 months',
      level: 'Intermediate',
      skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Penetration Testing'],
      projects: 'Security Audits',
      stipend: 'Unpaid + Certificate',
      icon: '🛡️'
    },
    {
      title: 'Python Development',
      category: 'Backend Development',
      duration: '3 months',
      level: 'Beginner Friendly',
      skills: ['Python', 'Django', 'Flask', 'REST APIs'],
      projects: '4 Backend Projects',
      stipend: 'Unpaid + Certificate',
      icon: '🐍'
    },
    {
      title: 'Web Development',
      category: 'Full Stack',
      duration: '4 months',
      level: 'Beginner to Advanced',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
      projects: '6 Full Stack Projects',
      stipend: 'Unpaid + Certificate',
      icon: '💻'
    },
    {
      title: 'Data Analyst',
      category: 'Data Science',
      duration: '3 months',
      level: 'Intermediate',
      skills: ['Python', 'SQL', 'Excel', 'Data Visualization'],
      projects: 'Real Data Analysis',
      stipend: 'Unpaid + Certificate',
      icon: '📊'
    },
    {
      title: 'UI/UX Design',
      category: 'Design',
      duration: '2 months',
      level: 'Beginner Friendly',
      skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research'],
      projects: '3 Design Projects',
      stipend: 'Unpaid + Certificate',
      icon: '🎨'
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>Internship Programs</h1>
        <p style={styles.subtitle}>
          Gain real-world experience with our industry-focused internship programs
        </p>
      </div>

      {/* Internship Cards Grid */}
      <div style={styles.internshipsGrid}>
        {internships.map((internship, index) => (
          <div key={index} style={styles.card}>
            {/* Card Header */}
            <div style={styles.cardHeader}>
              <div style={styles.icon}>{internship.icon}</div>
              <div>
                <h3 style={styles.cardTitle}>{internship.title}</h3>
                <span style={styles.category}>{internship.category}</span>
              </div>
            </div>

            {/* Card Details */}
            <div style={styles.details}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Duration:</span>
                <span style={styles.detailValue}>{internship.duration}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Level:</span>
                <span style={styles.detailValue}>{internship.level}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Projects:</span>
                <span style={styles.detailValue}>{internship.projects}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Stipend:</span>
                <span style={styles.detailValue}>{internship.stipend}</span>
              </div>
            </div>

            {/* Skills */}
            <div style={styles.skills}>
              <h4 style={styles.skillsTitle}>Skills You'll Learn:</h4>
              <div style={styles.skillsList}>
                {internship.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} style={styles.skillTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button style={styles.applyButton}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px'
  },
  title: {
    color: 'var(--primary)',
    fontSize: '42px',
    marginBottom: '15px',
    fontWeight: 'bold'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '18px',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  internshipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    maxWidth: '1300px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    paddingBottom: '15px',
    borderBottom: '2px solid var(--border)'
  },
  icon: {
    fontSize: '40px'
  },
  cardTitle: {
    color: 'var(--text-primary)',
    fontSize: '22px',
    margin: '0 0 5px 0',
    fontWeight: 'bold'
  },
  category: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    backgroundColor: 'var(--hover-bg)',
    padding: '4px 12px',
    borderRadius: '20px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailLabel: {
    color: 'var(--text-secondary)',
    fontWeight: '500',
    fontSize: '14px'
  },
  detailValue: {
    color: 'var(--text-primary)',
    fontWeight: '600',
    fontSize: '14px'
  },
  skills: {
    marginTop: '10px'
  },
  skillsTitle: {
    color: 'var(--text-primary)',
    fontSize: '16px',
    marginBottom: '12px',
    fontWeight: '600'
  },
  skillsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  skillTag: {
    backgroundColor: 'var(--primary-bg, #dbeafe)',
    color: 'var(--primary)',
    padding: '6px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: '500'
  },
  applyButton: {
    marginTop: 'auto',
    padding: '12px 25px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease'
  }
};

// Add hover effects
const hoverStyle = `
  @media (hover: hover) {
    .internship-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .apply-button:hover {
      background-color: var(--primary-dark);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default Internship;