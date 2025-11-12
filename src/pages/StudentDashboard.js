// StudentDashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCourse } from '../contexts/CourseContext';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  const { user, logout } = useAuth();
  const { enrolledCourses, getOverallProgress, completedCourses } = useCourse();
  const { orders, getCartItemsCount } = useCart();

  const overallProgress = getOverallProgress();
  const recentOrders = orders.slice(0, 3);
  const enrolledCount = enrolledCourses.length;
  const completedCount = completedCourses.length;

  // Calculate learning statistics
  const totalLessons = enrolledCourses.reduce((total, course) => total + (course.lessons || 24), 0);
  const completedLessons = enrolledCourses.reduce((total, course) => {
    const progress = course.progress || 0;
    const courseLessons = course.lessons || 24;
    return total + Math.round((progress / 100) * courseLessons);
  }, 0);

  return (
    <div style={styles.container}>
      {/* Welcome Section */}
      <div style={styles.welcomeSection}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>🎓</div>
          <div>
            <h1 style={styles.welcomeTitle}>Welcome back, {user.name}!</h1>
            <p style={styles.userRole}>
              Student • {user.email}
            </p>
            <div style={styles.learningStats}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{enrolledCount}</span>
                <span style={styles.statLabel}>Enrolled Courses</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{completedCount}</span>
                <span style={styles.statLabel}>Completed</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{completedLessons}</span>
                <span style={styles.statLabel}>Lessons Done</span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Overall Progress */}
      <div style={styles.progressSection}>
        <h2 style={styles.sectionTitle}>Your Learning Journey</h2>
        <div style={styles.progressCard}>
          <div style={styles.progressInfo}>
            <h3 style={styles.progressTitle}>Overall Progress</h3>
            <p style={styles.progressText}>
              You've completed {overallProgress}% of your enrolled courses
            </p>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${overallProgress}%`
                }}
              />
            </div>
            <span style={styles.progressPercent}>{overallProgress}%</span>
          </div>
          <div style={styles.progressVisual}>
            <div style={styles.progressCircle}>
              <span style={styles.circleText}>{overallProgress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📚</div>
          <div style={styles.statInfo}>
            <h3>Enrolled Courses</h3>
            <p style={styles.statNumber}>{enrolledCount}</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💼</div>
          <div style={styles.statInfo}>
            <h3>Internships</h3>
            <p style={styles.statNumber}>2</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>🛒</div>
          <div style={styles.statInfo}>
            <h3>Projects Purchased</h3>
            <p style={styles.statNumber}>{orders.length}</p>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📈</div>
          <div style={styles.statInfo}>
            <h3>Learning Progress</h3>
            <p style={styles.statNumber}>{overallProgress}%</p>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div style={styles.coursesSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>My Courses</h2>
          <Link to="/courses" style={styles.viewAllLink}>
            View All Courses →
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div style={styles.emptyCourses}>
            <div style={styles.emptyIcon}>📚</div>
            <h3>No courses enrolled yet</h3>
            <p>Start your learning journey by enrolling in courses</p>
            <Link to="/courses">
              <button style={styles.browseButton}>Browse Courses</button>
            </Link>
          </div>
        ) : (
          <div style={styles.coursesGrid}>
            {enrolledCourses.slice(0, 4).map((course) => (
              <div key={course.id} style={styles.courseCard}>
                <div style={styles.courseHeader}>
                  <div style={styles.courseThumbnail}>{course.thumbnail || '📖'}</div>
                  <div style={styles.courseInfo}>
                    <h3 style={styles.courseName}>{course.name}</h3>
                    <p style={styles.courseCode}>{course.code}</p>
                    <div style={styles.courseMeta}>
                      <span style={styles.instructor}>By {course.instructor}</span>
                      <span style={styles.duration}>{course.duration}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.courseProgress}>
                  <div style={styles.progressStats}>
                    <span>Progress</span>
                    <span>{course.progress || 0}%</span>
                  </div>
                  <div style={styles.courseProgressBar}>
                    <div 
                      style={{
                        ...styles.courseProgressFill,
                        width: `${course.progress || 0}%`
                      }}
                    />
                  </div>
                </div>

                <div style={styles.courseActions}>
                  <Link to={`/learn/${course.id}`}>
                    <button style={styles.continueButton}>
                      {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                    </button>
                  </Link>
                  <Link to={`/courses/${course.id}`}>
                    <button style={styles.detailsButton}>
                      View Details
                    </button>
                  </Link>
                </div>

                {course.progress === 100 && (
                  <div style={styles.completedBadge}>
                    🏆 Course Completed
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div style={styles.actionsSection}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionsGrid}>
          <Link to="/courses" style={styles.actionCard}>
            <div style={styles.actionIcon}>🎓</div>
            <h3>Browse Courses</h3>
            <p>Explore all available courses</p>
          </Link>
          
          <Link to="/internship" style={styles.actionCard}>
            <div style={styles.actionIcon}>💼</div>
            <h3>Find Internships</h3>
            <p>Apply for internship programs</p>
          </Link>
          
          <Link to="/projects" style={styles.actionCard}>
            <div style={styles.actionIcon}>🛒</div>
            <h3>Buy Projects</h3>
            <p>Purchase ready-made projects</p>
            {getCartItemsCount() > 0 && (
              <div style={styles.cartBadge}>{getCartItemsCount()}</div>
            )}
          </Link>
          
          <Link to="/progress" style={styles.actionCard}>
            <div style={styles.actionIcon}>📝</div>
            <h3>My Progress</h3>
            <p>Track your learning journey</p>
          </Link>
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
  progressSection: {
    marginBottom: '30px'
  },
  sectionTitle: {
    color: 'var(--text-primary)',
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: '600'
  },
  progressCard: {
    backgroundColor: 'var(--surface)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progressInfo: {
    flex: 1
  },
  progressTitle: {
    color: 'var(--text-primary)',
    fontSize: '20px',
    marginBottom: '10px'
  },
  progressText: {
    color: 'var(--text-secondary)',
    marginBottom: '15px'
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'var(--border)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--success)',
    borderRadius: '4px',
    transition: 'width 0.3s ease'
  },
  progressPercent: {
    color: 'var(--success)',
    fontWeight: '600'
  },
  progressVisual: {
    marginLeft: '30px'
  },
  progressCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'var(--success)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px'
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
  coursesSection: {
    marginBottom: '30px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  viewAllLink: {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontWeight: '500'
  },
  emptyCourses: {
    backgroundColor: 'var(--surface)',
    padding: '60px 20px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    textAlign: 'center',
    color: 'var(--text-primary)'
  },
  emptyIcon: {
    fontSize: '60px',
    marginBottom: '20px'
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
    marginTop: '15px'
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
    border: '1px solid var(--border)',
    position: 'relative'
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
  courseMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'var(--text-secondary)'
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
    borderRadius: '3px',
    transition: 'width 0.3s ease'
  },
  courseActions: {
    display: 'flex',
    gap: '10px'
  },
  continueButton: {
    flex: 2,
    padding: '10px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px'
  },
  detailsButton: {
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
  completedBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: 'var(--success)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  actionsSection: {
    marginBottom: '30px'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  actionCard: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    textDecoration: 'none',
    color: 'var(--text-primary)',
    transition: 'transform 0.3s ease',
    textAlign: 'center',
    position: 'relative'
  },
  actionIcon: {
    fontSize: '40px',
    marginBottom: '15px'
  },
  cartBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: 'var(--error)',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default StudentDashboard;