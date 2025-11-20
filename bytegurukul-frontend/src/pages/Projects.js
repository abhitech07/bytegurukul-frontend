import React, { useState, useMemo } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaLevelUpAlt, FaTag, FaHeart, FaEye } from 'react-icons/fa'; 

// --- Component: Project Card ---
const ProjectCard = React.memo(({ project, styles, handleAddToCart, isInCart, getDifficultyColor, formatCurrency, handleToggleDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Mock data for Wishlist status (since CartContext only handles Cart)
  const [isWished, setIsWished] = useState(
      localStorage.getItem(`project_wish_${project.id}`) === 'true'
  );

  const handleWishlist = () => {
      const newState = !isWished;
      setIsWished(newState);
      localStorage.setItem(`project_wish_${project.id}`, newState);
      // NOTE: Using console log/custom UI instead of alert for professional apps
      console.log(newState ? `${project.title} added to Wishlist!` : `${project.title} removed from Wishlist.`);
  };

  const difficultyColor = getDifficultyColor(project.difficulty);

  return (
    <div key={project.id} className="project-card" style={styles.projectCard}>
        
        {/* Top Info & Icon */}
        <div style={styles.cardHeader}>
            <div style={styles.iconWrapper}>
                <span style={styles.icon}>{project.icon}</span>
                {/* Price Tag with Gradient based on difficulty */}
                <span style={{
                    ...styles.price, 
                    background: `linear-gradient(135deg, ${difficultyColor}, #f8fafc)`
                }}>
                    {formatCurrency(project.price)}
                </span>
            </div>
            <div style={styles.projectInfo}>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <span style={styles.domain}>{project.domain}</span>
                
                {/* Difficulty and Rating */}
                <div style={styles.metaRow}>
                    <span style={{...styles.difficultyTag, backgroundColor: difficultyColor}}>
                        <FaLevelUpAlt size={10} style={{marginRight: '5px'}}/> {project.difficulty}
                    </span>
                    <span style={styles.ratingTag}>
                        <FaStar size={10} style={{marginRight: '5px'}}/> {project.rating}
                    </span>
                </div>
            </div>
        </div>

        <p style={styles.description}>{project.description}</p>

        {/* Tech Stack */}
        <div style={styles.techStack}>
            <FaTag size={12} style={{color: '#64748b', marginRight: '5px', flexShrink: 0}} />
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px'}}>
                {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} style={styles.techTag}>
                    {tech}
                    </span>
                ))}
            </div>
        </div>
        
        {/* ADVANCED: Collapsible Details */}
        <div style={styles.advancedDetails}>
          <button 
            onClick={() => setShowDetails(!showDetails)} 
            style={styles.detailsToggleButton}
          >
            <FaEye style={{marginRight: '8px'}} /> {showDetails ? 'Hide Details' : 'View Details'}
          </button>

          {showDetails && (
              <div style={styles.detailsContent}>
                  <strong>Includes:</strong>
                  <ul style={styles.featuresList}>
                      {project.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                      ))}
                  </ul>
                  <small style={{marginTop: '10px', display: 'block', color: difficultyColor}}>
                    Suggested Dev Time: {project.difficulty === 'Beginner' ? '20 hours' : project.difficulty === 'Intermediate' ? '40 hours' : '80+ hours'}
                  </small>
              </div>
          )}
        </div>


        {/* Actions */}
        <div style={styles.actions}>
            <button className="demo-button" style={styles.demoButton}>View Demo</button>
            
            {/* Wishlist Button */}
            <button 
                onClick={handleWishlist}
                style={{...styles.wishlistButton, backgroundColor: isWished ? '#ef4444' : '#e5e7eb', color: isWished ? 'white' : '#1e293b'}}
                title={isWished ? "Remove from Wishlist" : "Save to Wishlist"}
            >
                <FaHeart size={14} />
            </button>

            {isInCart(project.id) ? (
            <button className="added-button" style={styles.addedButton} disabled>
                ✓ Added to Cart
            </button>
            ) : (
            <button 
                className="add-to-cart-button"
                style={styles.addToCartButton}
                onClick={() => handleAddToCart(project)}
            >
                Add to Cart
            </button>
            )}
        </div>
    </div>
  );
});


function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all'); // NEW: Tech filter
  const { addToCart, isInCart, getCartItemsCount } = useCart();
  
  // MOCK DATA UPDATED WITH REALISTIC PRICES, RATINGS, and DIFFICULTY
  const projects = useMemo(() => [
    { id: '1', title: 'E-Commerce Website', domain: 'Web Development', price: 49, technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'], description: 'Full-stack e-commerce platform with payment integration, admin panel, and inventory management', icon: '🛒', features: ['Payment Integration', 'Admin Dashboard', 'User Authentication', 'Product Reviews'], rating: 4.8, difficulty: 'Intermediate' },
    { id: '2', title: 'Weather App', domain: 'Mobile Development', price: 49, technologies: ['Android', 'Kotlin', 'API Integration'], description: 'Real-time weather application with location services and 7-day forecast', icon: '🌤️', features: ['Location Services', '7-Day Forecast', 'Weather Alerts'], rating: 4.5, difficulty: 'Beginner' },
    { id: '3', title: 'Student Management System', domain: 'Desktop Application', price: 49, technologies: ['Java', 'MySQL', 'Swing'], description: 'Complete student record management system with attendance and grade tracking', icon: '🎓', features: ['Student Records', 'Attendance System', 'Grade Management'], rating: 4.2, difficulty: 'Intermediate' },
    { id: '4', title: 'Chat Application', domain: 'Web Development', price: 49, technologies: ['React', 'Socket.io', 'Express'], description: 'Real-time chat application with multiple rooms, file sharing, and emoji support', icon: '💬', features: ['Real-time Chat', 'File Sharing', 'Multiple Rooms'], rating: 4.7, difficulty: 'Advanced' },
    { id: '5', title: 'Expense Tracker', domain: 'Mobile Development', price: 49, technologies: ['Flutter', 'Firebase', 'Charts'], description: 'Personal finance management app with analytics and budget planning', icon: '💰', features: ['Expense Analytics', 'Budget Planning', 'Reports'], rating: 4.6, difficulty: 'Beginner' },
    { id: '6', title: 'Library Management', domain: 'Web Development', price: 49, technologies: ['PHP', 'MySQL', 'Bootstrap'], description: 'Digital library system with book tracking, member management, and fine calculation', icon: '📖', features: ['Book Tracking', 'Member Management', 'Fine System'], rating: 4.1, difficulty: 'Intermediate' }
  ], []);

  // Filter projects (combined logic)
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDomain = selectedDomain === 'all' || project.domain === selectedDomain;
      const matchesTech = selectedTech === 'all' || project.technologies.includes(selectedTech);

      return matchesSearch && matchesDomain && matchesTech;
    });
  }, [projects, searchTerm, selectedDomain, selectedTech]);

  const domains = useMemo(() => ['all', ...new Set(projects.map(project => project.domain))], [projects]);
  
  const allTechnologies = useMemo(() => {
    const techs = projects.flatMap(p => p.technologies);
    return ['all', ...new Set(techs)];
  }, [projects]);
  
  const handleAddToCart = (project) => {
    // Ensuring the price/quantity structure is correct for the Cart Context
    addToCart({ ...project, price: project.price, quantity: 1 }); 
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#10b981'; // Green
      case 'Intermediate': return '#f59e0b'; // Yellow
      case 'Advanced': return '#ef4444'; // Red
      default: return '#64748b';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Domain Projects</h1>
        <p style={styles.subtitle}>Ready-to-implement projects with source code and documentation</p>
      </div>

      {/* Cart Indicator (Fixed position for visibility) */}
      <div className="cart-indicator-float" style={styles.cartIndicator}>
        <Link to="/cart" style={styles.cartLink}>
          <FaShoppingCart style={styles.cartIcon} />
          <span style={styles.cartCount}>{getCartItemsCount()}</span>
          <span style={{marginLeft: '8px', fontWeight: 500}}>items</span>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div style={styles.searchSection}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>
        
        <select 
          value={selectedDomain}
          onChange={(e) => { setSelectedDomain(e.target.value); setSelectedTech('all'); }} // Reset tech filter on domain change
          className="filter-select"
          style={styles.filterSelect}
        >
          {domains.map(domain => (
            <option key={domain} value={domain}>
              {domain === 'all' ? 'All Domains' : domain}
            </option>
          ))}
        </select>
      </div>
      
      {/* NEW: Secondary Tech Filter Bar */}
      <div style={styles.techFilterBar}>
        <FaTag size={14} style={{ color: '#2563eb', flexShrink: 0 }} />
        {allTechnologies.map(tech => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            style={{
              ...styles.techFilterButton,
              backgroundColor: selectedTech === tech ? '#2563eb' : '#f1f5f9',
              color: selectedTech === tech ? 'white' : '#1e293b'
            }}
          >
            {tech === 'all' ? 'All Tech' : tech}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div style={styles.resultsInfo}>
        <p>Showing <strong>{filteredProjects.length}</strong> project{filteredProjects.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Projects Grid */}
      <div style={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            styles={styles}
            handleAddToCart={handleAddToCart}
            isInCart={isInCart}
            getDifficultyColor={getDifficultyColor}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <div style={styles.noResults}>
          <h3>No projects found</h3>
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
    minHeight: '100vh',
    fontFamily: "'Poppins', sans-serif"
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
    maxWidth: '600px',
    margin: '0 auto'
  },
  cartIndicator: {
    position: 'fixed',
    top: '15px',
    right: '25px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '25px',
    boxShadow: '0 6px 15px rgba(37,99,235,0.3)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.3s ease'
  },
  cartLink: {
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600'
  },
  cartIcon: { fontSize: '18px' },
  cartCount: {
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
  },
  searchSection: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  searchBox: {
    position: 'relative',
    width: '400px',
    maxWidth: '100%'
  },
  searchInput: {
    width: '100%',
    padding: '12px 15px',
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
  techFilterBar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
      marginBottom: '30px',
      maxWidth: '1300px',
      margin: '20px auto 30px',
      padding: '0 20px'
  },
  techFilterButton: {
      padding: '6px 12px',
      borderRadius: '20px',
      border: '1px solid #dbeafe',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      flexShrink: 0
  },
  resultsInfo: {
    textAlign: 'center',
    marginBottom: '20px',
    color: 'var(--text-secondary)'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '25px',
    maxWidth: '1300px',
    margin: '0 auto'
  },
  projectCard: {
    backgroundColor: 'var(--surface)',
    padding: '25px',
    borderRadius: '16px',
    background: 'linear-gradient(145deg, var(--surface), #f0f4ff)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    border: 'none', 
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '10px'
  },
  iconWrapper: {
    flexShrink: 0,
    width: '60px',
    height: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    backgroundColor: '#fff',
    border: '2px solid #e0e7ff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  icon: {
    fontSize: '28px',
  },
  projectInfo: {
    flex: 1
  },
  projectTitle: {
    color: 'var(--text-primary)',
    fontSize: '22px',
    margin: '0 0 5px 0',
    fontWeight: '800'
  },
  domain: {
    color: '#6d28d9',
    fontSize: '14px',
    backgroundColor: '#f3e8ff',
    padding: '3px 10px',
    borderRadius: '12px',
    fontWeight: '600'
  },
  price: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#1e293b',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 15px',
    borderRadius: '0 16px 0 16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  metaRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  difficultyTag: {
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    color: 'white',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  },
  ratingTag: {
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '12px',
    color: '#1e293b',
    backgroundColor: '#fde047',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    alignItems: 'center',
    paddingBottom: '10px',
    borderBottom: '1px solid var(--border)'
  },
  techTag: {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease'
  },
  advancedDetails: {
      marginTop: '-5px',
      border: '1px solid #e0e7ff',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: '#f9fafb'
  },
  detailsToggleButton: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: 'var(--primary)',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '5px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsContent: {
      padding: '10px 0 0',
      textAlign: 'left',
      fontSize: '14px',
      color: 'var(--text-primary)'
  },
  featuresList: {
    margin: '8px 0 0 0',
    paddingLeft: '0',
    color: 'var(--text-secondary)',
    listStyle: 'none',
    marginTop: '10px',
    fontSize: '13px',
    '& li': {
        marginBottom: '4px',
    }
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto', // Pushes buttons to the bottom
    paddingTop: '10px',
  },
  demoButton: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(90deg, #60a5fa, #7c3aed)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'all 0.3s ease',
  },
  addToCartButton: {
    flex: 2,
    padding: '12px',
    backgroundColor: 'var(--success)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'all 0.3s ease',
  },
  addedButton: {
    flex: 2,
    padding: '12px',
    backgroundColor: 'var(--text-secondary)', // Neutral color when added
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed',
    fontWeight: '700'
  },
  wishlistButton: {
    flex: 0.5,
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
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
    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 15px 40px rgba(37,99,235,0.25);
    }
    
    .demo-button:hover {
      opacity: 0.9;
    }
    
    .add-to-cart-button:hover {
      background-color: var(--success-dark, #047857);
    }
    
    .cart-indicator-float:hover {
      background-color: #1e3a8a !important;
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(37,99,235,0.5);
    }
    
    .search-input:focus {
      border-color: var(--primary);
    }
    
    .filter-select:focus {
      border-color: var(--primary);
    }
    .techFilterButton:hover:not([style*="background-color: rgb(37, 99, 235)"]) {
        background-color: #dbeafe !important;
    }
    .techFilterButton[style*="background-color: rgb(37, 99, 235)"] {
        box-shadow: 0 2px 10px rgba(37,99,235,0.4);
    }
    
    /* Wishlist button hover */
    .project-card button:hover[style*="background-color: rgb(229, 231, 235)"] {
        background-color: #cbd5e1 !important;
    }
    .project-card button:hover[style*="background-color: rgb(239, 68, 68)"] {
        background-color: #b91c1c !important;
    }
  }
`;

const styleSheet = document.createElement('style');
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);

export default Projects;