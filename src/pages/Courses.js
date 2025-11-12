import React, { useState } from 'react';
import { useCourse } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const { enrollInCourse, isEnrolled } = useCourse();
  const { user } = useAuth();
  const navigate = useNavigate();

  const courses = [
    {
      id: 'ds-101',
      name: 'Data Structures',
      code: 'KCS301',
      semester: 3,
      credits: 4,
      instructor: 'Dr. Sharma',
      icon: '📚',
      description: 'Learn fundamental data structures and algorithms. Master arrays, linked lists, trees, and sorting algorithms.',
      level: 'Beginner',
      modules: 6,
      lessons: 24,
      price: 0,
      thumbnail: '🧩',
      learningOutcomes: [
        'Understand time and space complexity',
        'Implement various data structures',
        'Solve algorithmic problems',
        'Prepare for technical interviews'
      ]
    },
    {
      id: 'db-301',
      name: 'Database Management',
      code: 'KCS503',
      semester: 5,
      credits: 3,
      instructor: 'Dr. Gupta',
      icon: '🗄️',
      description: 'Complete database design and management. SQL, normalization, transactions, and NoSQL databases.',
      level: 'Beginner',
      modules: 5,
      lessons: 20,
      price: 0,
      thumbnail: '💾',
      learningOutcomes: [
        'Design relational databases',
        'Write complex SQL queries',
        'Understand database normalization',
        'Work with NoSQL databases'
      ]
    },
    {
      id: 'os-401',
      name: 'Operating Systems',
      code: 'KCS401',
      semester: 4,
      credits: 4,
      instructor: 'Prof. Singh',
      icon: '💻',
      description: 'Deep dive into operating system concepts. Process management, memory management, and file systems.',
      level: 'Intermediate',
      modules: 7,
      lessons: 28,
      price: 0,
      thumbnail: '🖥️',
      learningOutcomes: [
        'Understand OS architecture',
        'Learn process scheduling',
        'Master memory management',
        'Study file system design'
      ]
    },
    {
      id: 'cn-501',
      name: 'Computer Networks',
      code: 'KCS603',
      semester: 6,
      credits: 3,
      instructor: 'Dr. Kumar',
      icon: '🌐',
      description: 'Comprehensive networking course covering protocols, network security, and internet technologies.',
      level: 'Intermediate',
      modules: 6,
      lessons: 24,
      price: 0,
      thumbnail: '📡',
      learningOutcomes: [
        'Understand network protocols',
        'Configure network devices',
        'Learn network security',
        'Master internet technologies'
      ]
    },
    {
      id: 'se-601',
      name: 'Software Engineering',
      code: 'KCS601',
      semester: 6,
      credits: 3,
      instructor: 'Prof. Joshi',
      icon: '🔧',
      description: 'Software development lifecycle, agile methodologies, testing, and project management.',
      level: 'Beginner',
      modules: 6,
      lessons: 26,
      price: 0,
      thumbnail: '🏗️',
      learningOutcomes: [
        'Master software development lifecycle',
        'Learn agile methodologies',
        'Understand software testing',
        'Manage software projects'
      ]
    }
  ];

  // Filter courses based on search and semester
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === 'all' || course.semester === parseInt(selectedSemester);
    return matchesSearch && matchesSemester;
  });

  const handleEnroll = (course) => {
    if (!user) {
      alert('Please login to enroll in courses');
      navigate('/login');
      return;
    }

    enrollInCourse(course);
  };

  const handleContinueLearning = (courseId) => {
    navigate(`/learn/${courseId}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>AKTU B.Tech CS Courses</h1>
        <p style={styles.subtitle}>Comprehensive curriculum with hands-on learning</p>
      </div>

      {/* Search and Filter Section */}
      <div style={styles.searchSection}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search courses by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>
        
        <select 
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">All Semesters</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
          <option value="7">Semester 7</option>
          <option value="8">Semester 8</option>
        </select>
      </div>

      {/* Results Count */}
      <div style={styles.resultsInfo}>
        <p>Showing {filteredCourses.length} of {courses.length} courses</p>
      </div>

      {/* Courses Grid */}
      <div style={styles.coursesGrid}>
        {filteredCourses.map((course) => {
          const enrolled = isEnrolled(course.id);
          
          return (
            <div key={course.id} style={styles.courseCard}>
              <div style={styles.cardHeader}>
                <div style={styles.thumbnail}>{course.thumbnail}</div>
                <div style={styles.courseInfo}>
                  <h3 style={styles.courseName}>{course.name}</h3>
                  <div style={styles.courseMeta}>
                    <span style={styles.courseCode}>{course.code}</span>
                  </div>
                </div>
              </div>
              
              <p style={styles.description}>{course.description}</p>

              <div style={styles.courseStats}>
                <div style={styles.stat}>
                  <span style={styles.statIcon}>📚</span>
                  <span>{course.modules} Modules</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statIcon}>🎥</span>
                  <span>{course.lessons} Lessons</span>
                </div>
                
              </div>

              <div style={styles.instructor}>
                <strong>Instructor:</strong> {course.instructor}
              </div>

              <div style={styles.actions}>
                <Link to={`/courses/${course.id}`} style={styles.detailLink}>
                  <button style={styles.detailButton}>
                    View Details
                  </button>
                </Link>
                
                {enrolled ? (
                  <button 
                    style={styles.continueButton}
                    onClick={() => handleContinueLearning(course.id)}
                  >
                    Continue Learning
                  </button>
                ) : (
                  <button 
                    style={styles.enrollButton}
                    onClick={() => handleEnroll(course)}
                  >
                    Enroll Now
                  </button>
                )}
              </div>

              {enrolled && (
                <div style={styles.enrolledBadge}>
                  ✅ Enrolled
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* No Results Message */}
      {filteredCourses.length === 0 && (
        <div style={styles.noResults}>
          <h3>No courses found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
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
    marginBottom: '40px'
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
    maxWidth: '500px',
    margin: '0 auto'
  },
  searchSection: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  searchBox: {
    position: 'relative',
    width: '400px',
    maxWidth: '100%'
  },
  searchInput: {
    width: '100%',
    padding: '12px 45px 12px 15px',
    border: '2px solid var(--border)',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    backgroundColor: 'var(--surface)',
    color: 'var(--text-primary)'
  },
  searchIcon: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: 'var(--text-secondary)'
  },
  filterSelect: {
    padding: '12px 15px',
    border: '2px solid var(--border)',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    backgroundColor: 'var(--surface)',
    color: 'var(--text-primary)',
    minWidth: '150px'
  },
  resultsInfo: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'var(--text-secondary)'
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '25px',
    maxWidth: '1300px',
    margin: '0 auto'
  },
  courseCard: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px'
  },
  thumbnail: {
    fontSize: '40px',
    marginTop: '5px'
  },
  courseInfo: {
    flex: 1
  },
  courseName: {
    color: 'var(--text-primary)',
    fontSize: '20px',
    margin: '0 0 10px 0',
    fontWeight: 'bold'
  },
  courseMeta: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  courseCode: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    backgroundColor: 'var(--hover-bg)',
    padding: '4px 10px',
    borderRadius: '15px'
  },
  domainTag: {
    color: 'var(--text-secondary)',
    fontSize: '12px',
    backgroundColor: 'var(--border)',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  freeTag: {
    color: 'var(--success)',
    fontSize: '12px',
    backgroundColor: 'var(--success-bg, #d1fae5)',
    padding: '4px 8px',
    borderRadius: '12px',
    fontWeight: '600'
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0
  },
  courseStats: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  statIcon: {
    fontSize: '14px'
  },
  rating: {
    display: 'flex',
    gap: '10px',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  stars: {
    color: '#f59e0b',
    fontWeight: '600'
  },
  instructor: {
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  actions: {
    display: 'flex',
    gap: '10px'
  },
  detailLink: {
    flex: 1,
    textDecoration: 'none'
  },
  detailButton: {
    width: '100%',
    padding: '10px',
    border: '2px solid var(--primary)',
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  },
  enrollButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  },
  continueButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  },
  enrolledBadge: {
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
  noResults: {
    textAlign: 'center',
    padding: '40px',
    color: 'var(--text-secondary)'
  }
};

// Add hover effects
const hoverStyle = `
  @media (hover: hover) {
    .course-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .detail-button:hover {
      background-color: var(--primary);
      color: white;
    }
    
    .enroll-button:hover {
      background-color: var(--success-dark, #047857);
    }
    
    .continue-button:hover {
      background-color: var(--primary-dark);
    }
    
    .search-input:focus {
      border-color: var(--primary);
    }
    
    .filter-select:focus {
      border-color: var(--primary);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default Courses;