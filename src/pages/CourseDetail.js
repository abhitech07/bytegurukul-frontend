import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCourse } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';

function CourseDetail() {
  const { courseId } = useParams();
  const { enrollInCourse, isEnrolled } = useCourse();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock course data - in real app, this would come from an API
  const course = {
    id: 'ds-101',
    name: 'Data Structures',
    code: 'KCS301',
    semester: 3,
    credits: 4,
    instructor: 'Dr. Sharma',
    icon: '📚',
    domain: 'Programming',
    description: 'Learn fundamental data structures and algorithms. Master arrays, linked lists, trees, and sorting algorithms.',
    detailedDescription: 'This comprehensive course covers all essential data structures and algorithms that every computer science student must know. You will learn to analyze time and space complexity, implement various data structures from scratch, and solve real-world programming problems.',
    duration: '8 weeks',
    level: 'Beginner',
    modules: 6,
    lessons: 24,
    rating: 4.8,
    students: 1250,
    price: 0,
    thumbnail: '🧩',
    learningOutcomes: [
      'Understand time and space complexity analysis',
      'Implement arrays, linked lists, stacks, and queues',
      'Master tree and graph data structures',
      'Learn sorting and searching algorithms',
      'Solve complex algorithmic problems',
      'Prepare for technical interviews'
    ],
    syllabus: [
      {
        module: 1,
        title: 'Introduction to Data Structures',
        lessons: 4,
        topics: ['What are Data Structures?', 'Time Complexity', 'Space Complexity', 'Big O Notation']
      },
      {
        module: 2,
        title: 'Linear Data Structures',
        lessons: 6,
        topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Applications']
      },
      {
        module: 3,
        title: 'Trees and Binary Trees',
        lessons: 5,
        topics: ['Tree Terminology', 'Binary Trees', 'BST', 'Tree Traversals', 'Applications']
      },
      {
        module: 4,
        title: 'Graph Algorithms',
        lessons: 4,
        topics: ['Graph Representation', 'BFS & DFS', 'Shortest Path', 'Minimum Spanning Tree']
      },
      {
        module: 5,
        title: 'Sorting Algorithms',
        lessons: 3,
        topics: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Heap Sort']
      },
      {
        module: 6,
        title: 'Advanced Topics',
        lessons: 2,
        topics: ['Dynamic Programming', 'Greedy Algorithms', 'Problem Solving']
      }
    ],
    instructorInfo: {
      name: 'Dr. Rajesh Sharma',
      qualification: 'PhD in Computer Science, IIT Delhi',
      experience: '15+ years teaching experience',
      specialization: 'Algorithms and Data Structures',
      students: '10,000+ students taught',
      rating: 4.9
    }
  };

  const enrolled = isEnrolled(courseId);

  const handleEnroll = () => {
    if (!user) {
      alert('Please login to enroll in this course');
      navigate('/login');
      return;
    }

    enrollInCourse(course);
    navigate(`/learn/${courseId}`);
  };

  const handleContinueLearning = () => {
    navigate(`/learn/${courseId}`);
  };

  return (
    <div style={styles.container}>
      {/* Course Header */}
      <div style={styles.courseHeader}>
        <div style={styles.headerContent}>
          <div style={styles.thumbnail}>{course.thumbnail}</div>
          <div style={styles.headerInfo}>
            <h1 style={styles.courseTitle}>{course.name}</h1>
            <p style={styles.courseCode}>{course.code} • {course.credits} Credits • Semester {course.semester}</p>
            <p style={styles.courseDescription}>{course.detailedDescription}</p>
            
            <div style={styles.courseStats}>
              <div style={styles.stat}>
                <span style={styles.statValue}>{course.rating}</span>
                <span style={styles.statLabel}>Rating</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statValue}>{course.students}+</span>
                <span style={styles.statLabel}>Students</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statValue}>{course.modules}</span>
                <span style={styles.statLabel}>Modules</span>
              </div>
              <div style={styles.stat}>
                <span style={styles.statValue}>{course.lessons}</span>
                <span style={styles.statLabel}>Lessons</span>
              </div>
            </div>

            <div style={styles.actionButtons}>
              {enrolled ? (
                <button style={styles.continueButton} onClick={handleContinueLearning}>
                  Continue Learning
                </button>
              ) : (
                <button style={styles.enrollButton} onClick={handleEnroll}>
                  Enroll Now - {course.price === 0 ? 'FREE' : `₹${course.price}`}
                </button>
              )}
              <button style={styles.wishlistButton}>
                💖 Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.courseContent}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          {/* Learning Outcomes */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>What You'll Learn</h2>
            <div style={styles.learningOutcomes}>
              {course.learningOutcomes.map((outcome, index) => (
                <div key={index} style={styles.outcomeItem}>
                  <span style={styles.checkIcon}>✓</span>
                  {outcome}
                </div>
              ))}
            </div>
          </section>

          {/* Course Syllabus */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Course Syllabus</h2>
            <div style={styles.syllabus}>
              {course.syllabus.map((module, index) => (
                <div key={index} style={styles.module}>
                  <div style={styles.moduleHeader}>
                    <h3 style={styles.moduleTitle}>Module {module.module}: {module.title}</h3>
                    <span style={styles.lessonCount}>{module.lessons} lessons</span>
                  </div>
                  <div style={styles.topics}>
                    {module.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} style={styles.topic}>
                        • {topic}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          {/* Instructor Info */}
          <div style={styles.instructorCard}>
            <h3 style={styles.instructorTitle}>About the Instructor</h3>
            <div style={styles.instructorInfo}>
              <div style={styles.instructorAvatar}>👨‍🏫</div>
              <div>
                <h4 style={styles.instructorName}>{course.instructorInfo.name}</h4>
                <p style={styles.instructorQualification}>{course.instructorInfo.qualification}</p>
                <p style={styles.instructorExperience}>{course.instructorInfo.experience}</p>
                <p style={styles.instructorSpecialization}>Specialization: {course.instructorInfo.specialization}</p>
                <div style={styles.instructorStats}>
                  <span>⭐ {course.instructorInfo.rating} Rating</span>
                  <span>👥 {course.instructorInfo.students} Students</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Features */}
          <div style={styles.featuresCard}>
            <h3 style={styles.featuresTitle}>This Course Includes</h3>
            <div style={styles.featuresList}>
              <div style={styles.feature}>
                <span>🎥</span> {course.lessons} hours video content
              </div>
              <div style={styles.feature}>
                <span>📚</span> Downloadable resources
              </div>
              <div style={styles.feature}>
                <span>🏆</span> Certificate of completion
              </div>
              <div style={styles.feature}>
                <span>📱</span> Access on mobile and TV
              </div>
              <div style={styles.feature}>
                <span>💬</span> Q&A support
              </div>
              <div style={styles.feature}>
                <span>🔄</span> Lifetime access
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div style={styles.detailsCard}>
            <h3 style={styles.detailsTitle}>Course Details</h3>
            <div style={styles.detailsList}>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Duration:</span>
                <span style={styles.detailValue}>{course.duration}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Level:</span>
                <span style={styles.detailValue}>{course.level}</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Language:</span>
                <span style={styles.detailValue}>English</span>
              </div>
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>Certificate:</span>
                <span style={styles.detailValue}>Yes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'var(--background)',
    color: 'var(--text-primary)',
    minHeight: '100vh'
  },
  courseHeader: {
    backgroundColor: 'var(--surface)',
    padding: '40px 20px',
    boxShadow: 'var(--shadow)',
    borderBottom: '1px solid var(--border)'
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start'
  },
  thumbnail: {
    fontSize: '80px',
    flexShrink: 0
  },
  headerInfo: {
    flex: 1
  },
  courseTitle: {
    color: 'var(--text-primary)',
    fontSize: '36px',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  courseCode: {
    color: 'var(--text-secondary)',
    fontSize: '18px',
    marginBottom: '20px'
  },
  courseDescription: {
    color: 'var(--text-secondary)',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '30px'
  },
  courseStats: {
    display: 'flex',
    gap: '30px',
    marginBottom: '30px'
  },
  stat: {
    textAlign: 'center'
  },
  statValue: {
    display: 'block',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'var(--primary)'
  },
  statLabel: {
    display: 'block',
    fontSize: '14px',
    color: 'var(--text-secondary)'
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  },
  enrollButton: {
    padding: '15px 30px',
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  continueButton: {
    padding: '15px 30px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  wishlistButton: {
    padding: '15px 20px',
    border: '2px solid var(--border)',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  courseContent: {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '40px',
    alignItems: 'start'
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    position: 'sticky',
    top: '20px'
  },
  section: {
    backgroundColor: 'var(--surface)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  sectionTitle: {
    color: 'var(--text-primary)',
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: '600'
  },
  learningOutcomes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  outcomeItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    color: 'var(--text-secondary)',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  checkIcon: {
    color: 'var(--success)',
    fontWeight: 'bold',
    flexShrink: 0
  },
  syllabus: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  module: {
    border: '1px solid var(--border)',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'border-color 0.3s ease'
  },
  moduleHeader: {
    backgroundColor: 'var(--hover-bg)',
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid var(--border)'
  },
  moduleTitle: {
    color: 'var(--text-primary)',
    fontSize: '16px',
    margin: 0,
    fontWeight: '600'
  },
  lessonCount: {
    color: 'var(--text-secondary)',
    fontSize: '14px'
  },
  topics: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  topic: {
    color: 'var(--text-secondary)',
    fontSize: '14px'
  },
  instructorCard: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  instructorTitle: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: '600'
  },
  instructorInfo: {
    display: 'flex',
    gap: '15px',
    alignItems: 'flex-start'
  },
  instructorAvatar: {
    fontSize: '40px',
    flexShrink: 0
  },
  instructorName: {
    color: 'var(--text-primary)',
    fontSize: '16px',
    margin: '0 0 5px 0',
    fontWeight: '600'
  },
  instructorQualification: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    margin: '0 0 5px 0'
  },
  instructorExperience: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    margin: '0 0 5px 0'
  },
  instructorSpecialization: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    margin: '0 0 10px 0'
  },
  instructorStats: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  featuresCard: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  featuresTitle: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: '600'
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'var(--text-secondary)',
    fontSize: '14px'
  },
  detailsCard: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border)'
  },
  detailsTitle: {
    color: 'var(--text-primary)',
    fontSize: '18px',
    marginBottom: '15px',
    fontWeight: '600'
  },
  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px'
  },
  detailLabel: {
    color: 'var(--text-secondary)',
    fontWeight: '500'
  },
  detailValue: {
    color: 'var(--text-primary)',
    fontWeight: '600'
  }
};

// Add hover effects
const hoverStyle = `
  @media (hover: hover) {
    .enroll-button:hover {
      background-color: var(--success-dark, #047857);
    }
    
    .continue-button:hover {
      background-color: var(--primary-dark);
    }
    
    .wishlist-button:hover {
      background-color: var(--hover-bg);
      color: var(--text-primary);
    }
    
    .module:hover {
      border-color: var(--primary);
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default CourseDetail;