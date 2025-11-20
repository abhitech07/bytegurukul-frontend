import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom"; // FIXED: Added useNavigate import
import {
  FaBookOpen,
  FaLaptopCode,
  FaFileAlt,
  FaUsers,
  FaLock,
  FaDatabase,
  FaUserGraduate,
  FaBook,
  FaTrophy,
  FaArrowUp,
  FaSearch, // ADDED: Icon for the new search bar
  FaCertificate, // ADDED: Icon for Certification section
  FaBriefcase, // ADDED: Icon for Internship section
  FaChalkboardTeacher, // ADDED
  FaMoneyBillWave, // ADDED
  FaGraduationCap, // ADDED
  FaEnvelope // ADDED for Newsletter
} from "react-icons/fa";
import { ReactTyped } from "react-typed";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- CUSTOM HOOK: Number Counter Animation ---
export const useCounter = (end, duration = 2000) => { // EXPLICITLY EXPORTED
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // extract number from string if needed (e.g. "1,200+" -> 1200)
    const endValue = parseInt(String(end).replace(/,/g, "").replace(/\+/g, ""), 10) || 0;
    if (endValue === 0) return;

    const increment = Math.ceil(endValue / (duration / 16)); // 60fps approx
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

// --- COMPONENT: Animated Stat Card ---
const AnimatedStatCard = ({ icon: Icon, number, text }) => {
  // We only want to animate the number part
  const animatedNumber = useCounter(number);
  
  return (
    <div style={styles.statCard}>
      <Icon style={styles.statIcon} />
      <h3 style={styles.statNumber}>
        {animatedNumber}{number.includes("+") ? "+" : ""}
      </h3>
      <p style={styles.statText}>{text}</p>
    </div>
  );
};

// --- ADVANCED FEATURE 1: Instant Search Component ---
const DynamicSearchBar = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Mock course data for instant search results
  const MOCK_SEARCH_COURSES = [
    { id: "ds-101", name: "DSA Masterclass", category: "Data Structures" },
    { id: "react-201", name: "React Fullstack", category: "Web Development" },
    { id: "cyber-301", name: "Ethical Hacking 101", category: "Cyber Security" },
    { id: "os-401", name: "Operating Systems", category: "Core CS" },
    { id: "db-301", name: "Database Management", category: "Data Science" },
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      const results = MOCK_SEARCH_COURSES
        .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 4); 
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleResultClick = (courseId) => {
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/courses/${courseId}`);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.length > 0) {
      navigate(`/courses?search=${searchQuery}`); // Redirect to full course page with query
    }
  }

  return (
    <form onSubmit={handleSearchSubmit} style={styles.searchContainer}>
        <FaSearch style={styles.searchIcon} />
        <input
            type="text"
            placeholder="Search 100+ courses, notes & projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
        />
        {searchResults.length > 0 && (
            <div style={styles.searchResultsDropdown}>
                {searchResults.map(course => (
                    <div 
                        key={course.id} 
                        style={styles.searchResultItem}
                        onClick={() => handleResultClick(course.id)}
                    >
                        📚 <strong>{course.name}</strong> - <span style={{fontSize: '12px', color: '#6d28d9'}}>{course.category}</span>
                    </div>
                ))}
                <Link to={`/courses?search=${searchQuery}`} style={styles.searchAllLink}>
                    View all results for "{searchQuery}"
                </Link>
            </div>
        )}
    </form>
  );
};

// --- ADVANCED FEATURE 2: Filterable Course Carousel ---
const FeaturedCourses = () => {
  const [filter, setFilter] = useState("All");

  const courses = [
    { id: 1, title: "Full Stack Web Dev", category: "Web Dev", image: "💻" },
    { id: 2, title: "Data Science with Python", category: "Data Science", image: "📊" },
    { id: 3, title: "Cyber Security Zero to Hero", category: "Security", image: "🛡️" },
    { id: 4, title: "Machine Learning A-Z", category: "Data Science", image: "🤖" },
    { id: 5, title: "React Native Mobile Apps", category: "Web Dev", image: "📱" },
  ];

  const categories = ["All", "Web Dev", "Data Science", "Security"];

  const filteredCourses = useMemo(() => {
    if (filter === "All") return courses;
    return courses.filter(c => c.category === filter);
  }, [filter]);

  const sliderSettings = {
    dots: true,
    infinite: filteredCourses.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, filteredCourses.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section style={styles.categorySection} data-aos="fade-up">
      <h2 style={styles.sectionTitle}>Featured Courses</h2>
      
      {/* Filter Tabs */}
      <div style={styles.filterTabs}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              ...styles.filterTab,
              backgroundColor: filter === cat ? "#2563eb" : "transparent",
              color: filter === cat ? "white" : "#4b5563",
              borderColor: filter === cat ? "#2563eb" : "#e5e7eb"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div style={{ padding: "0 20px" }}>
        {filteredCourses.length > 0 ? (
          <Slider {...sliderSettings}>
            {filteredCourses.map((course) => (
              <div key={course.id} style={{ padding: "10px" }}>
                <div style={styles.courseCard}>
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>{course.image}</div>
                  <h3 style={{ fontSize: "18px", marginBottom: "5px" }}>{course.title}</h3>
                  <span style={styles.categoryBadge}>{course.category}</span>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p style={{ textAlign: "center", color: "#6b7280" }}>No courses found in this category.</p>
        )}
      </div>
    </section>
  );
};


function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [email, setEmail] = useState(""); // For newsletter
  const navigate = useNavigate(); 

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}! (This is a demo)`);
    setEmail("");
  };

  return (
    <div style={styles.container}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle} data-aos="fade-right" data-aos-delay="100">
            Welcome to <span style={{ color: "#f1f5ff" }}>ByteGurukul</span>
          </h1>
          <h3 style={styles.heroTagline} data-aos="fade-right" data-aos-delay="300">
            <ReactTyped
              strings={[
                "Learn. Build. Excel.",
                "Empowering AKTU Students.",
                "Learn Smart — Learn Secure.",
              ]}
              typeSpeed={60}
              backSpeed={40}
              loop
            />
          </h3>
          <p style={styles.heroSubtitle} data-aos="fade-right" data-aos-delay="500">
            Your complete learning platform for <strong>AKTU B.Tech</strong> &{" "}
            <strong>M.Tech</strong> Computer Science. Access courses, projects,
            internships, and previous year questions — all in one place.
          </p>
          
          {/* Dynamic Search Bar */}
          <DynamicSearchBar navigate={navigate} />

          <div style={styles.heroButtons} data-aos="fade-up" data-aos-delay="700">
            <Link to="/courses" style={styles.primaryButton}>
              Explore Courses
            </Link>
            <Link to="/signup" style={styles.secondaryButton}>
              Sign Up Free
            </Link>
          </div>
        </div>

        <div style={styles.heroRight} data-aos="fade-left">
          <img
            src="/hero-learning.png"
            alt="Learning Illustration"
            style={styles.heroImage}
          />
        </div>
      </section>

      {/* QUICK STATS - Using Animated Component */}
      <section style={styles.statsSection} data-aos="fade-up">
        <AnimatedStatCard icon={FaUsers} number="1,200+" text="Active Students" />
        <AnimatedStatCard icon={FaBookOpen} number="50+" text="Courses & Notes" />
        <AnimatedStatCard icon={FaLaptopCode} number="80+" text="Live Projects" />
        <AnimatedStatCard icon={FaChalkboardTeacher} number="25+" text="Expert Mentors" />
      </section>

      {/* HIGHLIGHTS/TRUST SECTION */}
      <section style={styles.trustSection} data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <h2 style={styles.sectionTitle}>Built for AKTU Students, By Experts</h2>
        <div style={styles.trustGrid}>
          <div style={styles.trustCard}>
            <FaCertificate style={styles.trustIcon} />
            <h3>Verified Certification</h3>
            <p>Earn industry-recognized certificates upon course completion.</p>
          </div>
          <div style={styles.trustCard}>
            <FaBriefcase style={styles.trustIcon} />
            <h3>Internship Opportunities</h3>
            <p>Direct access to hands-on, real-world virtual internships.</p>
          </div>
          <div style={styles.trustCard}>
            <FaUsers style={styles.trustIcon} />
            <h3>Community Support</h3>
            <p>24/7 forum access and mentorship from experienced peers and faculty.</p>
          </div>
        </div>
      </section>
      
      {/* FEATURED COURSES (Advanced Carousel) */}
      <FeaturedCourses />

      {/* COURSE CATEGORIES (Keeping Original Grid for variety) */}
      <section style={styles.categorySection} data-aos="fade-up">
        <h2 style={styles.sectionTitle}>Explore Categories</h2>
        <div style={styles.categoryGrid}>
          <div style={styles.categoryCard}>
            <FaLaptopCode style={styles.categoryIcon} />
            <h3>Web Development</h3>
            <p>Learn HTML, CSS, JS, and frameworks like React.</p>
          </div>
          <div style={styles.categoryCard}>
            <FaLock style={styles.categoryIcon} />
            <h3>Cyber Security</h3>
            <p>Understand attacks, defenses, and ethical hacking.</p>
          </div>
          <div style={styles.categoryCard}>
            <FaDatabase style={styles.categoryIcon} />
            <h3>Data Science</h3>
            <p>Master Python, Machine Learning, and AI projects.</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE BYTEGURUKUL */}
      <section style={styles.features} data-aos="fade-up">
        <h2 style={styles.sectionTitle}>Why Choose ByteGurukul?</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <FaBookOpen style={{ fontSize: "60px", color: "#2563eb" }} />
            <h3 style={styles.featureTitle}>Study Resources</h3>
            <p style={styles.featureDesc}>
              Download notes, books, and presentations for all CS courses.
            </p>
          </div>
          <div style={styles.featureCard}>
            <FaLaptopCode style={{ fontSize: "60px", color: "#7c3aed" }} />
            <h3 style={styles.featureTitle}>Domain Projects</h3>
            <p style={styles.featureDesc}>
              Purchase ready-to-use projects categorized by domains.
            </p>
          </div>
          <div style={styles.featureCard}>
            <FaFileAlt style={{ fontSize: "60px", color: "#2563eb" }} />
            <h3 style={styles.featureTitle}>PYQ Papers</h3>
            <p style={styles.featureDesc}>
              Access previous year question papers with solutions.
            </p>
          </div>
        </div>
      </section>

      {/* NEW: NEWSLETTER SECTION */}
      <section style={styles.newsletterSection} data-aos="fade-up">
        <div style={styles.newsletterContent}>
          <h2><FaEnvelope style={{marginRight: '10px'}}/> Stay Ahead of the Curve</h2>
          <p>Get the latest course updates, internship alerts, and tech news delivered to your inbox.</p>
          <form onSubmit={handleSubscribe} style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.newsletterInput}
              required
            />
            <button type="submit" style={styles.newsletterButton}>Subscribe</button>
          </form>
        </div>
      </section>
      
      {/* ABOUT SECTION */}
      <section style={styles.about} data-aos="fade-up">
        <h2 style={styles.sectionTitle}>About the Creator</h2>
        <div style={styles.aboutContainer}>
          <img
            src="/abhijeet.jpg"
            alt="Abhijeet Kumar Pandey"
            style={styles.aboutImage}
          />
          <div style={styles.aboutContent}>
            <h3 style={styles.aboutName}>Abhijeet Kumar Pandey</h3>
            <p style={styles.aboutRole}>Cyber Security Analyst | M.Tech (CSE)</p>
            <p style={styles.aboutBio}>
              I’m passionate about technology, cybersecurity, and education.
              ByteGurukul is my initiative to make learning accessible for AKTU
              B.Tech & M.Tech students — providing quality study materials,
              projects, and guidance for everyone who dreams big.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Join ByteGurukul Today!</h2>
        <p style={styles.ctaText}>
          Learn, collaborate, and grow with thousands of AKTU students.
        </p>
        <Link to="/signup" style={styles.ctaButton}>
          Get Started Now
        </Link>
      </section>

      {/* SCROLL TO TOP */}
      {showScroll && (
        <button onClick={scrollToTop} style={styles.scrollButton}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}

/* ---------------------------- STYLES ---------------------------- */
const styles = {
  container: {
    backgroundColor: "#f3f4f6",
    color: "#1e293b",
    fontFamily: "'Poppins', sans-serif",
    transition: "all 0.3s ease",
  },

  // --- ADVANCED SEARCH STYLES ---
  searchContainer: {
    position: 'relative',
    maxWidth: '550px',
    margin: '30px 0 0',
    width: '100%',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    borderRadius: '12px',
    backgroundColor: 'white',
    zIndex: 20,
  },
  searchInput: {
    width: '100%',
    padding: '14px 20px 14px 50px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
    color: '#1e293b',
    backgroundColor: '#ffffff'
  },
  searchIcon: {
    position: 'absolute',
    left: '18px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#64748b',
    fontSize: '18px',
  },
  searchResultsDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderTop: 'none',
    borderRadius: '0 0 12px 12px',
    maxHeight: '300px',
    overflowY: 'auto',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    zIndex: 20,
  },
  searchResultItem: {
    padding: '12px 20px',
    textAlign: 'left',
    cursor: 'pointer',
    borderBottom: '1px solid #e2e8f0',
    transition: 'background-color 0.2s',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#1e293b',
  },
  searchAllLink: {
    display: 'block',
    padding: '12px 20px',
    textAlign: 'center',
    backgroundColor: '#f1f5f9',
    color: '#2563eb',
    fontWeight: '600',
    textDecoration: 'none',
    fontSize: '14px',
    borderRadius: '0 0 12px 12px',
  },
  
  // --- NEW TRUST SECTION STYLES ---
  trustSection: {
    padding: "60px 20px",
    background: "#ffffff",
    textAlign: "center",
    borderBottom: '1px solid #e2e8f0',
  },
  trustGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  trustCard: {
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid #e0e7ff",
    boxShadow: "0 4px 15px rgba(37,99,235,0.1)",
    backgroundColor: "#f0f4ff",
    transition: "transform 0.3s ease"
  },
  trustIcon: { 
    fontSize: "40px", 
    color: "#2563eb",
    marginBottom: "10px"
  },

  // --- HERO STYLES ---
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: "100px 40px",
    background: "linear-gradient(135deg, #1e3a8a, #6d28d9)",
    color: "white",
  },
  heroLeft: { flex: 1, paddingRight: "40px" },
  heroRight: { flex: 1, display: "flex", justifyContent: "center" },
  heroImage: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "16px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
    transition: 'transform 0.5s ease',
  },
  heroTitle: { fontSize: "52px", marginBottom: "10px", fontWeight: "800" },
  heroTagline: { fontSize: "22px", fontWeight: "600", color: "#fde047" },
  heroSubtitle: {
    fontSize: "18px",
    marginBottom: "40px",
    opacity: "0.95",
    lineHeight: 1.6,
  },
  heroButtons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "25px",
  },
  primaryButton: {
    padding: "14px 38px",
    background: "linear-gradient(90deg, #ffffff 0%, #e0e7ff 100%)",
    color: "#1e3a8a",
    borderRadius: "40px",
    fontSize: "18px",
    fontWeight: "700",
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(255,255,255,0.3)",
    transition: "all 0.3s ease",
  },
  secondaryButton: {
    padding: "14px 38px",
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "2px solid #ffffff",
    borderRadius: "40px",
    fontSize: "18px",
    fontWeight: "700",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },

  // --- STATS SECTION ---
  statsSection: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "40px",
    padding: "60px 20px",
  },
  statCard: {
    textAlign: "center",
    width: "200px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: "20px",
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  statIcon: { fontSize: "40px", color: "#2563eb" },
  statNumber: { fontSize: "28px", fontWeight: "700", color: "#1e3a8a" },
  statText: { color: "#475569" },

  // --- FILTERABLE CAROUSEL STYLES ---
  filterTabs: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  filterTab: {
    padding: "8px 20px",
    borderRadius: "20px",
    border: "2px solid",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease"
  },
  courseCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    margin: "0 10px", // Spacing for slider items
    minHeight: "180px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  categoryBadge: {
    fontSize: "12px",
    background: "#e0e7ff",
    color: "#3730a3",
    padding: "4px 10px",
    borderRadius: "12px",
    fontWeight: "600"
  },

  // --- CATEGORY & FEATURE STYLES ---
  categorySection: {
    padding: "80px 20px",
    background: "#f8fafc",
    textAlign: "center",
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: "38px",
    marginBottom: "50px",
    color: "#1e293b",
    fontWeight: "700",
  },
  categoryGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
  categoryCard: {
    background: "#ffffff",
    width: "300px",
    borderRadius: "14px",
    padding: "30px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    color: "#1e293b",
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  categoryIcon: { fontSize: "45px", color: "#7c3aed" },

  features: {
    padding: "100px 20px",
    background: "linear-gradient(180deg, #f9fafb 0%, #e0e7ff 100%)",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featureCard: {
    background: "#fff",
    padding: "45px 35px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(37,99,235,0.15)",
    textAlign: "center",
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  featureTitle: { fontSize: "22px", margin: "15px 0" },
  featureDesc: { color: "#6b7280" },

  // --- NEWSLETTER STYLES ---
  newsletterSection: {
    padding: "60px 20px",
    background: "#1e293b",
    color: "white",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  newsletterContent: {
    maxWidth: "600px",
    width: "100%",
  },
  newsletterForm: {
    display: "flex",
    marginTop: "20px",
    gap: "10px",
  },
  newsletterInput: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  newsletterButton: {
    padding: "12px 24px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  // --- ABOUT & TESTIMONIALS ---
  testimonials: {
    padding: "100px 20px",
    backgroundColor: "#f8fafc",
    textAlign: "center",
  },
  testimonialCard: {
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    margin: "0 auto",
    color: "#1e293b",
  },
  about: {
    padding: "100px 20px",
    background: "linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%)",
    textAlign: "center",
  },
  aboutContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: "40px",
    maxWidth: "1000px",
    margin: "0 auto"
  },
  aboutImage: {
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  aboutContent: { maxWidth: "550px", textAlign: "left" },
  aboutName: { fontSize: "28px", color: "#1e3a8a" },
  aboutRole: { fontSize: "18px", color: "#9333ea", marginBottom: "20px" },
  aboutBio: { fontSize: "16px", color: "#334155", lineHeight: 1.6 },

  journey: {
    padding: "100px 20px",
    background: "#f9fafb",
    textAlign: "center",
  },
  journeySteps: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "40px",
  },
  journeyIcon: { fontSize: "50px", color: "#2563eb", marginBottom: "15px" },

  // --- CTA & SCROLL ---
  ctaSection: {
    padding: "80px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #1e40af, #7c3aed)",
    color: "white",
  },
  ctaTitle: { fontSize: "38px", marginBottom: "20px" },
  ctaText: { fontSize: "18px", marginBottom: "30px" },
  ctaButton: {
    backgroundColor: "white",
    color: "#1e3a8a",
    padding: "12px 28px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "700",
  },
  scrollButton: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "50%",
    padding: "12px",
    cursor: "pointer",
    fontSize: "20px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
    zIndex: 1000
  },
};

/* Hover animations */
const hoverStyles = `
  a:hover {
    transform: translateY(-2px);
  }
  .searchResultItem:hover {
    background-color: #eef2ff !important;
  }
  .trustCard:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(37,99,235,0.2);
  }
  .categoryCard:hover, .featureCard:hover, .statCard:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = hoverStyles;
document.head.appendChild(styleSheet);

export default Home;