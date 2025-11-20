import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import { FaUserPlus, FaBook, FaDollarSign, FaChartLine, FaExclamationCircle, FaCheckCircle, FaUsers, FaGlobe, FaCogs } from "react-icons/fa";
import { useCounter } from "./Home.js"; // Corrected import to use object destructuring

// Helper Component for Animated Stats
const StatCard = ({ icon: Icon, title, value, trend, trendColor, isDark, colors }) => {
    
    // --- FEATURE: ANIMATED COUNT ---
    // Extract number from value (e.g., 12543 from "12,543")
    const numericValue = parseInt(String(value).replace(/[$,]/g, "").split(' ')[0], 10) || 0;
    const animatedValue = useCounter(numericValue);
    const displayValue = (typeof value === 'string' && value.includes('$')) 
        ? `$${animatedValue.toLocaleString()}` 
        : animatedValue.toLocaleString();
        
    const IconComponent = typeof Icon === 'string' ? <span style={{ fontSize: "36px" }}>{Icon}</span> : <Icon style={{ fontSize: "36px", color: trendColor }} />;

    return (
        <div
            key={title}
            style={{
              background: colors.card,
              padding: "25px",
              borderRadius: "14px",
              display: "flex",
              gap: "15px",
              alignItems: "center",
              boxShadow: isDark
                ? "0 6px 15px rgba(0,0,0,0.6)"
                : "0 6px 15px rgba(0,0,0,0.1)",
              borderLeft: `4px solid ${trendColor}`,
              cursor: 'pointer',
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            className="stat-card-animated"
        >
            {IconComponent}
            <div>
                <h3 style={{fontSize: '14px', color: colors.secondary, margin: 0}}>{title}</h3>
                <p style={{ fontSize: "24px", fontWeight: "800", color: colors.text, margin: '5px 0' }}>
                    {displayValue}
                </p>
                <span style={{ color: trendColor, fontSize: "13px" }}>{trend}</span>
            </div>
        </div>
    );
};


function AdminDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme(); 
  const [activeTab, setActiveTab] = useState("overview"); // Tab state removed as per request, keeping variable for future proofing

  // Mock Data
  const platformStats = {
    totalUsers: 12543,
    totalCourses: 287,
    totalRevenue: "124,850", // Changed to number string for animation
    activeInstructors: 56,
    newUsersThisMonth: 324,
    courseEnrollments: 4587,
  };

  const recentActivities = [
    { type: "user_signup", message: "New user registered: John Doe", time: "2 hours ago" },
    { type: "course_created", message: 'New course published: "Advanced Python"', time: "5 hours ago" },
    { type: "payment_received", message: "Payment received: $49.99", time: "1 day ago" },
    { type: "instructor_approved", message: "Instructor approved: Sarah Wilson", time: "2 days ago" },
  ];

  const pendingApprovals = [
    { id: 1, type: "Instructor", name: "Mike Johnson", email: "mike@example.com", submitted: "2025-11-10" },
    { id: 2, type: "Course", name: "Machine Learning Basics", instructor: "Dr. Smith", submitted: "2025-11-09" },
  ];

  const topCourses = [
    { name: "React Masterclass", instructor: "John Doe", students: 1245, revenue: "$24,900" },
    { name: "Python for Beginners", instructor: "Jane Smith", students: 987, revenue: "$19,740" },
  ];

  // 🌗 Dynamic Theme Styles
  const isDark = theme === "dark";
  const colors = {
    bg: isDark ? "#0f172a" : "#f8fafc",
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f8fafc" : "#1e293b",
    secondary: isDark ? "#94a3b8" : "#64748b",
    accent: "#2563eb", // Blue
    success: "#22c55e", // Green
    danger: "#ef4444", // Red
    warning: "#f59e0b", // Amber/Orange
  };

  return (
    <div
      style={{
        background: isDark
          ? "linear-gradient(145deg, #0f172a, #1e293b)"
          : "linear-gradient(145deg, #eef2ff, #f8fafc)",
        minHeight: "100vh",
        color: colors.text,
        transition: "all 0.3s ease",
        padding: "20px",
      }}
    >
      <AdminNavbar />
      <div style={styles.contentWrapper}> {/* Wrapper for max width */}
        {/* WELCOME BANNER */}
        <div style={styles.welcomeBanner}>
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>
                Platform Control Panel <FaGlobe style={{marginLeft: '10px'}}/>
            </h1>
            <p style={{ color: colors.secondary, fontSize: '16px' }}>
                Welcome back, **{user?.name || "Admin"}**. Manage core operations and view system health.
            </p>
        </div>


        {/* STATS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <StatCard 
            icon={FaUsers} 
            title="Total Users" 
            value={platformStats.totalUsers} 
            trend={`↑ ${platformStats.newUsersThisMonth} new this month`}
            trendColor={colors.accent}
            isDark={isDark}
            colors={colors}
          />
          <StatCard 
            icon={FaBook} 
            title="Total Courses" 
            value={platformStats.totalCourses} 
            trend="↑ 12 published this month"
            trendColor={colors.success}
            isDark={isDark}
            colors={colors}
          />
          <StatCard 
            icon={FaDollarSign} 
            title="Total Revenue (YTD)" 
            value={`$${platformStats.totalRevenue}`} 
            trend="↑ 15% revenue growth"
            trendColor={colors.success}
            isDark={isDark}
            colors={colors}
          />
          <StatCard 
            icon={FaChartLine} 
            title="Total Enrollments" 
            value={platformStats.courseEnrollments} 
            trend="↑ 8% this month"
            trendColor={colors.warning}
            isDark={isDark}
            colors={colors}
          />
        </div>

        {/* MAIN CONTENT GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px",
          }}
        >
          {/* Pending Approvals (Priority Section) */}
          <div style={{ ...styles.sectionCard, background: colors.card, color: colors.text, border: `2px solid ${colors.warning}` }}>
            <div style={styles.sectionHeader}>
              <h2 style={{color: colors.warning}}><FaExclamationCircle style={{marginRight: 8}}/> Pending Approvals</h2>
              <Link to="/admin/approvals" style={{ ...styles.viewAll, color: colors.warning }}>
                Review All →
              </Link>
            </div>
            {pendingApprovals.map((item) => (
              <div key={item.id} className="approval-card-animated" style={{ ...styles.approvalCard, background: isDark ? "#334155" : "#fff7ed", border: `1px solid ${colors.warning}` }}>
                <div>
                  <h4 style={{margin: '0 0 5px 0', fontSize: '16px', fontWeight: '700'}}>{item.name}</h4>
                  <p style={{ color: colors.secondary, margin: 0, fontSize: '13px' }}>{item.email || `Type: ${item.type} | By: ${item.instructor}`}</p>
                  <small style={{ color: colors.secondary }}>Submitted: {new Date(item.submitted).toLocaleDateString()}</small>
                </div>
                <div>
                  <button style={{ ...styles.approveButton, background: colors.success }}>✅ Approve</button>
                  <button style={{ ...styles.rejectButton, background: colors.danger }}>❌ Reject</button>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activities */}
          <div style={{ ...styles.sectionCard, background: colors.card }}>
            <div style={styles.sectionHeader}>
              <h2>Recent Activities</h2>
              <Link to="/admin/activity" style={{ ...styles.viewAll, color: colors.accent }}>
                View All →
              </Link>
            </div>
            {recentActivities.map((activity, index) => (
              <div key={index} style={{ ...styles.activityCard, background: isDark ? "#334155" : "#f8fafc" }}>
                <span style={{ fontSize: "22px", flexShrink: 0 }}>
                  {activity.type === "user_signup" && "👤"}
                  {activity.type === "course_created" && "📘"}
                  {activity.type === "payment_received" && "💳"}
                  {activity.type === "instructor_approved" && "👨‍🏫"}
                </span>
                <div style={{flexGrow: 1}}>
                  <p style={{ fontWeight: "600", margin: 0 }}>{activity.message}</p>
                  <small style={{ color: colors.secondary }}>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Top Courses */}
          <div style={{ ...styles.sectionCard, background: colors.card }}>
            <div style={styles.sectionHeader}>
              <h2>Top Performing Courses</h2>
              <Link to="/admin/courses" style={{ ...styles.viewAll, color: colors.accent }}>
                View All →
              </Link>
            </div>
            {topCourses.map((course, index) => (
              <div key={index} style={{ ...styles.topCourseCard, background: isDark ? "#334155" : "#f9fafb" }}>
                <div>
                  <h4 style={{margin: '0 0 5px 0', fontSize: '16px', fontWeight: '700'}}>
                    {index + 1}. {course.name}
                  </h4>
                  <p style={{ color: colors.secondary, margin: 0 }}>By {course.instructor}</p>
                </div>
                <div style={{ textAlign: "right", fontSize: "14px", fontWeight: '600', flexShrink: 0 }}>
                  <span style={{ color: colors.accent }}>👥 {course.students}</span>
                  <strong style={{ color: colors.success, display: "block", marginTop: '3px' }}>{course.revenue}</strong>
                </div>
              </div>
            ))}
          </div>
          
          {/* NEW: QUICK LINKS / SYSTEM TOOLS */}
          <div style={{ ...styles.sectionCard, background: colors.card }}>
            <h2 style={{marginBottom: '20px'}}><FaCogs style={{marginRight: 8}}/> Quick System Tools</h2>
            <div style={styles.quickLinksGrid}>
                <Link to="/admin/users" style={styles.quickLinkButton}>Manage Users</Link>
                <Link to="/admin/instructors" style={styles.quickLinkButton}>Manage Instructors</Link>
                <Link to="/admin/analytics" style={styles.quickLinkButton}>View Analytics</Link>
                <Link to="/admin/reports" style={styles.quickLinkButton}>Generate Reports</Link>
            </div>
            <div style={styles.systemStatus}>
                <p>System Status: <FaCheckCircle style={{color: colors.success, marginRight: '5px'}}/> Operational</p>
                <p>Version: 1.2.0 | Last Update: Nov 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ✅ Reusable Styles */
const styles = {
  contentWrapper: {
      maxWidth: '1300px',
      margin: '0 auto',
      padding: '20px',
  },
  welcomeBanner: {
    paddingBottom: '20px',
    borderBottom: '2px dashed #dbeafe',
    marginBottom: '20px'
  },
  sectionCard: {
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    height: '100%',
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  viewAll: {
    textDecoration: "none",
    fontWeight: "600",
    fontSize: '14px',
  },
  approvalCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    transition: 'transform 0.2s',
  },
  approveButton: {
    border: "none",
    color: "white",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: '600',
    transition: 'opacity 0.2s',
    fontSize: '13px'
  },
  rejectButton: {
    border: "none",
    color: "white",
    borderRadius: "6px",
    padding: "8px 14px",
    cursor: "pointer",
    marginLeft: "5px",
    fontWeight: '600',
    transition: 'opacity 0.2s',
    fontSize: '13px'
  },
  activityCard: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    transition: 'transform 0.2s',
  },
  topCourseCard: {
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    transition: 'transform 0.2s',
  },
  quickLinksGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '30px',
  },
  quickLinkButton: {
      textDecoration: 'none',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '15px 10px',
      borderRadius: '10px',
      fontWeight: '600',
      textAlign: 'center',
      transition: 'background-color 0.2s, transform 0.2s',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  systemStatus: {
      borderTop: '1px solid #dbeafe',
      paddingTop: '20px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#64748b'
  }
};

// Inject hover styles for modern UI feel
const hoverStyle = `
  .stat-card-animated:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(37, 99, 235, 0.2);
  }
  .approval-card-animated:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
  }
  .topCourseCard:hover, .activityCard:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }
  .quickLinkButton:hover {
      background-color: #1e40af !important;
      transform: translateY(-2px);
  }
  ${styles.approveButton}:hover {
      opacity: 0.85;
  }
  ${styles.rejectButton}:hover {
      opacity: 0.85;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default AdminDashboard;