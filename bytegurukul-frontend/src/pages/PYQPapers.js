import React, { useState } from "react";
import { FaDownload, FaFilter, FaFilePdf, FaSearch, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const PYQPapers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedSem, setSelectedSem] = useState("All");

  // Mock Data for AKTU Papers (You can add real links later)
  const papers = [
    { id: 1, subject: "Data Structures (KCS-301)", year: "2023-24", sem: "3rd", type: "Regular" },
    { id: 2, subject: "Operating Systems (KCS-401)", year: "2022-23", sem: "4th", type: "Carry Over" },
    { id: 3, subject: "Database Management (KCS-501)", year: "2023-24", sem: "5th", type: "Regular" },
    { id: 4, subject: "Cyber Security (KNC-501)", year: "2021-22", sem: "5th", type: "Regular" },
    { id: 5, subject: "Compiler Design (KCS-601)", year: "2022-23", sem: "6th", type: "Regular" },
    { id: 6, subject: "Artificial Intelligence (KCS-701)", year: "2023-24", sem: "7th", type: "Regular" },
    { id: 7, subject: "Web Technology (KCS-602)", year: "2023-24", sem: "6th", type: "Regular" },
    { id: 8, subject: "Computer Networks (KCS-603)", year: "2021-22", sem: "6th", type: "Carry Over" },
  ];

  // Filter Logic
  const filteredPapers = papers.filter((paper) => {
    const matchSearch = paper.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchYear = selectedYear === "All" || paper.year === selectedYear;
    const matchSem = selectedSem === "All" || paper.sem === selectedSem;
    return matchSearch && matchYear && matchSem;
  });

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <Link to="/" style={styles.backLink}>
        <FaArrowLeft /> Back to Home
      </Link>

      <div style={styles.header}>
        <h1 style={styles.title}>Previous Year Question Papers (PYQ)</h1>
        <p style={styles.subtitle}>
          Download AKTU B.Tech Computer Science previous year papers to ace your exams.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div style={styles.controls}>
        <div style={styles.searchBox}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search subject or code (e.g. KCS-301)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.filters}>
          <div style={styles.selectWrapper}>
            <FaFilter style={styles.filterIcon} />
            <select 
              style={styles.select} 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="All">All Years</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
              <option value="2021-22">2021-22</option>
            </select>
          </div>

          <div style={styles.selectWrapper}>
            <select 
              style={styles.select}
              value={selectedSem} 
              onChange={(e) => setSelectedSem(e.target.value)}
            >
              <option value="All">All Semesters</option>
              <option value="3rd">3rd Sem</option>
              <option value="4th">4th Sem</option>
              <option value="5th">5th Sem</option>
              <option value="6th">6th Sem</option>
              <option value="7th">7th Sem</option>
              <option value="8th">8th Sem</option>
            </select>
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      <div style={styles.grid}>
        {filteredPapers.length > 0 ? (
          filteredPapers.map((paper) => (
            <div key={paper.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <FaFilePdf style={styles.pdfIcon} />
                <span style={styles.badge}>{paper.year}</span>
              </div>
              <h3 style={styles.subject}>{paper.subject}</h3>
              <div style={styles.meta}>
                <span>Semester: <strong>{paper.sem}</strong></span>
                <span>Type: <strong>{paper.type}</strong></span>
              </div>
              <button 
                style={styles.downloadBtn}
                onClick={() => alert(`Downloading ${paper.subject}... (Feature pending backend)`)}
              >
                <FaDownload /> Download PDF
              </button>
            </div>
          ))
        ) : (
          <div style={styles.noResults}>
            <h3>No papers found matching your criteria.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

// Styles Object
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh"
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "#64748b",
    textDecoration: "none",
    marginBottom: "20px",
    fontWeight: "600"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "32px",
    color: "#1e293b",
    marginBottom: "10px",
    fontWeight: "800",
  },
  subtitle: {
    color: "#64748b",
    fontSize: "16px",
    maxWidth: "600px",
    margin: "0 auto"
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "30px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  },
  searchBox: {
    position: "relative",
    flex: 1,
    minWidth: "280px",
  },
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 45px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box"
  },
  filters: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  },
  selectWrapper: {
    position: "relative",
    display: 'flex',
    alignItems: 'center'
  },
  filterIcon: {
    position: 'absolute',
    left: '12px',
    color: '#64748b',
    zIndex: 1
  },
  select: {
    padding: "12px 12px 12px 35px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    fontSize: "15px",
    cursor: "pointer",
    outline: 'none',
    minWidth: '140px',
    height: '100%'
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    transition: "transform 0.2s, box-shadow 0.2s",
    border: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  pdfIcon: {
    fontSize: "40px",
    color: "#ef4444",
  },
  badge: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },
  subject: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#1e293b",
    lineHeight: "1.4"
  },
  meta: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "20px",
    background: "#f8fafc",
    padding: "8px",
    borderRadius: "6px"
  },
  downloadBtn: {
    marginTop: "auto",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: "background-color 0.2s",
  },
  noResults: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "50px",
    color: "#94a3b8",
  },
};

export default PYQPapers;