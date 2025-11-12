// AdminDashboard.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for admin dashboard
  const platformStats = {
    totalUsers: 12543,
    totalCourses: 287,
    totalRevenue: '$124,850',
    activeInstructors: 56,
    newUsersThisMonth: 324,
    courseEnrollments: 4587
  };

  const recentActivities = [
    { type: 'user_signup', message: 'New user registered: John Doe', time: '2 hours ago' },
    { type: 'course_created', message: 'New course published: "Advanced Python"', time: '5 hours ago' },
    { type: 'payment_received', message: 'Payment received: $49.99', time: '1 day ago' },
    { type: 'instructor_approved', message: 'Instructor application approved: Sarah Wilson', time: '2 days ago' }
  ];

  const pendingApprovals = [
    { id: 1, type: 'instructor', name: 'Mike Johnson', email: 'mike@example.com', submitted: '2024-01-10' },
    { id: 2, type: 'course', name: 'Machine Learning Basics', instructor: 'Dr. Smith', submitted: '2024-01-09' },
    { id: 3, type: 'instructor', name: 'Emily Brown', email: 'emily@example.com', submitted: '2024-01-08' }
  ];

  const topCourses = [
    { name: 'React Masterclass', instructor: 'John Doe', students: 1245, revenue: '$24,900' },
    { name: 'Python for Beginners', instructor: 'Jane Smith', students: 987, revenue: '$19,740' },
    { name: 'Web Development', instructor: 'Mike Johnson', students: 856, revenue: '$17,120' }
  ];

  return (
    <div style={styles.container}>
      {/* Welcome Section */}
      <div style={styles.welcomeSection}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>👑</div>
          <div>
            <h1 style={styles.welcomeTitle}>Admin Dashboard</h1>
            <p style={styles.userRole}>
              Administrator • {user.email}
            </p>
            <div style={styles.learningStats}>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{platformStats.totalUsers.toLocaleString()}</span>
                <span style={styles.statLabel}>Total Users</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{platformStats.totalCourses}</span>
                <span style={styles.statLabel}>Courses</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statNumber}>{platformStats.activeInstructors}</span>
                <span style={styles.statLabel}>Instructors</span>
              </div>
            </div>
          </div>
        </div>
        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Platform Overview Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>👥</div>
          <div style={styles.statInfo}>
            <h3>Total Users</h3>
            <p style={styles.statNumber}>{platformStats.totalUsers.toLocaleString()}</p>
            <span style={styles.statTrend}>↑ {platformStats.newUsersThisMonth} this month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📚</div>
          <div style={styles.statInfo}>
            <h3>Total Courses</h3>
            <p style={styles.statNumber}>{platformStats.totalCourses}</p>
            <span style={styles.statTrend}>↑ 12 this month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div style={styles.statInfo}>
            <h3>Total Revenue</h3>
            <p style={styles.statNumber}>{platformStats.totalRevenue}</p>
            <span style={styles.statTrend}>↑ 15% this month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📈</div>
          <div style={styles.statInfo}>
            <h3>Enrollments</h3>
            <p style={styles.statNumber}>{platformStats.courseEnrollments.toLocaleString()}</p>
            <span style={styles.statTrend}>↑ 8% this month</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Pending Approvals */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Pending Approvals</h3>
            <Link to="/admin/approvals" style={styles.viewAllLink}>
              View All →
            </Link>
          </div>
          <div style={styles.approvalsList}>
            {pendingApprovals.map((item) => (
              <div key={item.id} style={styles.approvalItem}>
                <div style={styles.approvalInfo}>
                  <div style={styles.approvalType}>{item.type.toUpperCase()}</div>
                  <h4>{item.name}</h4>
                  <p>{item.email || `By: ${item.instructor}`}</p>
                  <span style={styles.submittedDate}>
                    Submitted: {new Date(item.submitted).toLocaleDateString()}
                  </span>
                </div>
                <div style={styles.approvalActions}>
                  <button style={styles.approveButton}>Approve</button>
                  <button style={styles.rejectButton}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Recent Activity</h3>
            <Link to="/admin/activity" style={styles.viewAllLink}>
              View All →
            </Link>
          </div>
          <div style={styles.activityList}>
            {recentActivities.map((activity, index) => (
              <div key={index} style={styles.activityItem}>
                <div style={styles.activityIcon}>
                  {activity.type === 'user_signup' && '👤'}
                  {activity.type === 'course_created' && '📚'}
                  {activity.type === 'payment_received' && '💰'}
                  {activity.type === 'instructor_approved' && '👨‍🏫'}
                </div>
                <div style={styles.activityContent}>
                  <p style={styles.activityMessage}>{activity.message}</p>
                  <span style={styles.activityTime}>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Courses */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Top Courses</h3>
            <Link to="/admin/courses" style={styles.viewAllLink}>
              View All →
            </Link>
          </div>
          <div style={styles.coursesList}>
            {topCourses.map((course, index) => (
              <div key={index} style={styles.courseItem}>
                <div style={styles.courseRank}>{index + 1}</div>
                <div style={styles.courseInfo}>
                  <h4>{course.name}</h4>
                  <p>By {course.instructor}</p>
                </div>
                <div style={styles.courseStats}>
                  <span style={styles.studentsCount}>👥 {course.students}</span>
                  <span style={styles.courseRevenue}>{course.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionsGrid}>
            <Link to="/admin/users" style={styles.actionCard}>
              <div style={styles.actionIcon}>👥</div>
              <h4>Manage Users</h4>
              <p>User management and permissions</p>
            </Link>
            
            <Link to="/admin/courses" style={styles.actionCard}>
              <div style={styles.actionIcon}>📚</div>
              <h4>Course Management</h4>
              <p>Approve and manage courses</p>
            </Link>
            
            <Link to="/admin/instructors" style={styles.actionCard}>
              <div style={styles.actionIcon}>👨‍🏫</div>
              <h4>Instructor Management</h4>
              <p>Manage instructors and approvals</p>
            </Link>
            
            <Link to="/admin/analytics" style={styles.actionCard}>
              <div style={styles.actionIcon}>📊</div>
              <h4>Platform Analytics</h4>
              <p>View detailed analytics</p>
            </Link>
            
            <Link to="/admin/settings" style={styles.actionCard}>
              <div style={styles.actionIcon}>⚙️</div>
              <h4>System Settings</h4>
              <p>Platform configuration</p>
            </Link>
            
            <Link to="/admin/reports" style={styles.actionCard}>
              <div style={styles.actionIcon}>📋</div>
              <h4>Reports</h4>
              <p>Generate and view reports</p>
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
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '30px',
    marginBottom: '30px'
  },
  section: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  sectionTitle: {
    color: 'var(--text-primary)',
    fontSize: '20px',
    margin: '0',
    fontWeight: '600'
  },
  viewAllLink: {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500'
  },
  approvalsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  approvalItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: 'var(--background)',
    borderRadius: '8px',
    border: '1px solid var(--border)'
  },
  approvalInfo: {
    flex: 1
  },
  approvalType: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: 'var(--primary)',
    textTransform: 'uppercase',
    marginBottom: '5px'
  },
  submittedDate: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  approvalActions: {
    display: 'flex',
    gap: '10px'
  },
  approveButton: {
    padding: '8px 16px',
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  rejectButton: {
    padding: '8px 16px',
    backgroundColor: 'var(--error)',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600'
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    padding: '15px',
    backgroundColor: 'var(--background)',
    borderRadius: '8px',
    border: '1px solid var(--border)'
  },
  activityIcon: {
    fontSize: '20px',
    flexShrink: 0
  },
  activityContent: {
    flex: 1
  },
  activityMessage: {
    margin: '0 0 5px 0',
    fontSize: '14px'
  },
  activityTime: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  coursesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  courseItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: 'var(--background)',
    borderRadius: '8px',
    border: '1px solid var(--border)'
  },
  courseRank: {
    width: '30px',
    height: '30px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    flexShrink: 0
  },
  courseInfo: {
    flex: 1
  },
  courseStats: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '5px'
  },
  studentsCount: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  courseRevenue: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--success)'
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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

export default AdminDashboard;