// InstructorDashboard.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function InstructorDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for instructor courses and analytics
  const instructorCourses = [
    {
      id: 1,
      name: 'Advanced JavaScript',
      code: 'JS201',
      students: 145,
      rating: 4.8,
      revenue: '$2,450',
      progress: 85
    },
    {
      id: 2,
      name: 'React Masterclass',
      code: 'REACT301',
      students: 89,
      rating: 4.9,
      revenue: '$1,780',
      progress: 92
    },
    {
      id: 3,
      name: 'Node.js Fundamentals',
      code: 'NODE101',
      students: 203,
      rating: 4.7,
      revenue: '$3,120',
      progress: 78
    }
  ];

  const analytics = {
    totalStudents: 437,
    totalRevenue: '$7,350',
    averageRating: 4.8,
    totalCourses: 3
  };

  const recentStudents = [
    { name: 'Alice Johnson', course: 'React Masterclass', progress: 45, joinDate: '2024-01-15' },
    { name: 'Bob Smith', course: 'Advanced JavaScript', progress: 78, joinDate: '2024-01-10' },
    { name: 'Carol Davis', course: 'Node.js Fundamentals', progress: 32, joinDate: '2024-01-12' }
  ];

  return (
    <div style={styles.container}>
      {/* Welcome Section */}
      <div style={styles.welcomeSection}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>👨‍🏫</div>
          <div>
            <h1 style={styles.welcomeTitle}>Welcome, Instructor {user.name}!</h1>
            <p style={styles.userRole}>
              Instructor • {user.email}
            </p>
            <div style={styles.learningStats}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{analytics.totalCourses}</span>
                <span style={styles.statLabel}>Courses</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{analytics.totalStudents}</span>
                <span style={styles.statLabel}>Students</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{analytics.averageRating}</span>
                <span style={styles.statLabel}>Rating</span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div style={styles.statInfo}>
            <h3>Total Students</h3>
            <p style={styles.statNumber}>{analytics.totalStudents}</p>
            <span style={styles.statTrend}>↑ 12% this month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div style={styles.statInfo}>
            <h3>Total Revenue</h3>
            <p style={styles.statNumber}>{analytics.totalRevenue}</p>
            <span style={styles.statTrend}>↑ 8% this month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>⭐</div>
          <div style={styles.statInfo}>
            <h3>Average Rating</h3>
            <p style={styles.statNumber}>{analytics.averageRating}/5.0</p>
            <span style={styles.statTrend}>92% positive</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📊</div>
          <div style={styles.statInfo}>
            <h3>Completion Rate</h3>
            <p style={styles.statNumber}>78%</p>
            <span style={styles.statTrend}>↑ 5% this month</span>
          </div>
        </div>
      </div>

      {/* Courses Management */}
      <div style={styles.coursesSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>My Courses</h2>
          <Link to="/instructor/courses/create">
            <button style={styles.createButton}>
              + Create New Course
            </button>
          </Link>
        </div>

        <div style={styles.coursesGrid}>
          {instructorCourses.map((course) => (
            <div key={course.id} style={styles.courseCard}>
              <div style={styles.courseHeader}>
                <div style={styles.courseThumbnail}>📚</div>
                <div style={styles.courseInfo}>
                  <h3 style={styles.courseName}>{course.name}</h3>
                  <p style={styles.courseCode}>{course.code}</p>
                </div>
              </div>

              <div style={styles.courseStats}>
                <div style={styles.statRow}>
                  <span>Students:</span>
                  <span style={styles.statValue}>{course.students}</span>
                </div>
                <div style={styles.statRow}>
                  <span>Rating:</span>
                  <span style={styles.statValue}>{course.rating}/5.0</span>
                </div>
                <div style={styles.statRow}>
                  <span>Revenue:</span>
                  <span style={styles.statValue}>{course.revenue}</span>
                </div>
              </div>

              <div style={styles.courseProgress}>
                <div style={styles.progressStats}>
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div style={styles.courseProgressBar}>
                  <div 
                    style={{
                      ...styles.courseProgressFill,
                      width: `${course.progress}%`
                    }}
                  />
                </div>
              </div>

              <div style={styles.courseActions}>
                <Link to={`/instructor/courses/${course.id}`}>
                  <button style={styles.manageButton}>
                    Manage Course
                  </button>
                </Link>
                <Link to={`/instructor/analytics/${course.id}`}>
                  <button style={styles.analyticsButton}>
                    View Analytics
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Students & Quick Actions */}
      <div style={styles.bottomSection}>
        <div style={styles.recentStudents}>
          <h3 style={styles.sectionTitle}>Recent Students</h3>
          <div style={styles.studentsList}>
            {recentStudents.map((student, index) => (
              <div key={index} style={styles.studentItem}>
                <div style={styles.studentAvatar}>👤</div>
                <div style={styles.studentInfo}>
                  <h4>{student.name}</h4>
                  <p>{student.course} • {student.progress}% complete</p>
                </div>
                <span style={styles.joinDate}>
                  Joined {new Date(student.joinDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.quickActions}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionsGrid}>
            <Link to="/instructor/courses/create" style={styles.actionCard}>
              <div style={styles.actionIcon}>➕</div>
              <h4>Create Course</h4>
              <p>Design a new course</p>
            </Link>
            
            <Link to="/instructor/analytics" style={styles.actionCard}>
              <div style={styles.actionIcon}>📈</div>
              <h4>View Analytics</h4>
              <p>Course performance</p>
            </Link>
            
            <Link to="/instructor/students" style={styles.actionCard}>
              <div style={styles.actionIcon}>👥</div>
              <h4>Manage Students</h4>
              <p>Student management</p>
            </Link>
            
            <Link to="/instructor/earnings" style={styles.actionCard}>
              <div style={styles.actionIcon}>💰</div>
              <h4>Earnings</h4>
              <p>Revenue reports</p>
            </Link>
          </div>
        </div>
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
  welcomeSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'var(--surface)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    marginBottom: '30px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px'
  },
  avatar: {
    fontSize: '50px'
  },
  welcomeTitle: {
    color: 'var(--text-primary)',
    fontSize: '28px',
    margin: '0 0 5px 0'
  },
  userRole: {
    color: 'var(--text-secondary)',
    margin: '0 0 20px 0'
  },
  learningStats: {
    display: 'flex',
    gap: '30px'
  },
  stat: {
    textAlign: 'center'
  },
  statNumber: {
    display: 'block',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--primary)'
  },
  statLabel: {
    display: 'block',
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  logoutButton: {
    padding: '10px 20px',
    border: '2px solid var(--error)',
    backgroundColor: 'transparent',
    color: 'var(--error)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  statCard: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  statIcon: {
    fontSize: '40px'
  },
  statInfo: {
    flex: 1
  },
  statTrend: {
    fontSize: '12px',
    color: 'var(--success)',
    fontWeight: '500'
  },
  coursesSection: {
    marginBottom: '30px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  sectionTitle: {
    color: 'var(--text-primary)',
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: '600'
  },
  createButton: {
    padding: '12px 24px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '20px'
  },
  courseCard: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  courseHeader: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px'
  },
  courseThumbnail: {
    fontSize: '40px',
    flexShrink: 0
  },
  courseInfo: {
    flex: 1
  },
  courseName: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    margin: '0 0 5px 0',
    fontWeight: '600'
  },
  courseCode: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    marginBottom: '8px'
  },
  courseStats: {
    marginBottom: '20px'
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  statValue: {
    fontWeight: '600',
    color: 'var(--text-primary)'
  },
  courseProgress: {
    marginBottom: '20px'
  },
  progressStats: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '8px'
  },
  courseProgressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: 'var(--border)',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  courseProgressFill: {
    height: '100%',
    backgroundColor: 'var(--primary)',
    borderRadius: '3px'
  },
  courseActions: {
    display: 'flex',
    gap: '10px'
  },
  manageButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },
  analyticsButton: {
    flex: 1,
    padding: '10px',
    border: '2px solid var(--border)',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px'
  },
  bottomSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px'
  },
  recentStudents: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  studentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  studentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: 'var(--background)',
    borderRadius: '8px',
    border: '1px solid var(--border)'
  },
  studentAvatar: {
    fontSize: '24px'
  },
  studentInfo: {
    flex: 1
  },
  joinDate: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  quickActions: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  actionCard: {
    backgroundColor: 'var(--background)',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    textDecoration: 'none',
    color: 'var(--text-primary)',
    textAlign: 'center',
    transition: 'transform 0.3s ease'
  },
  actionIcon: {
    fontSize: '30px',
    marginBottom: '10px'
  }
};

export default InstructorDashboard;