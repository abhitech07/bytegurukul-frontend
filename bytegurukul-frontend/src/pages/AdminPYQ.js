import React, { useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/admin/AdminNavbar';

const AdminPYQ = () => {
  const [formData, setFormData] = useState({
    subject: '',
    subjectCode: '',
    year: '2023-24',
    semester: '3rd',
    type: 'Regular'
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
      setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
        setMessage({ type: 'error', text: 'Please select a PDF file.' });
        return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('pdfFile', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/pyq', data, {
        headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
          setMessage({ type: 'success', text: 'Paper Uploaded Successfully!' });
          // Reset form partially
          setFormData(prev => ({ ...prev, subject: '', subjectCode: '' }));
          setFile(null);
          // Clear file input visually
          document.getElementById('fileInput').value = null; 
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage({ type: 'error', text: 'Upload failed: ' + (error.response?.data?.message || error.message) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <AdminNavbar />
      <div style={styles.container}>
        <div style={styles.card}>
            <h1 style={styles.title}>Upload Question Paper</h1>
            <p style={styles.subtitle}>Add previous year question papers to the student database.</p>

            {message.text && (
                <div style={{
                    ...styles.alert,
                    backgroundColor: message.type === 'error' ? '#fee2e2' : '#dcfce7',
                    color: message.type === 'error' ? '#dc2626' : '#166534',
                    border: `1px solid ${message.type === 'error' ? '#ef4444' : '#22c55e'}`
                }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                  <label style={styles.label}>Subject Name</label>
                  <input 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    placeholder="e.g. Data Structures" 
                    required 
                    style={styles.input} 
                  />
              </div>

              <div style={styles.formGroup}>
                  <label style={styles.label}>Subject Code</label>
                  <input 
                    name="subjectCode" 
                    value={formData.subjectCode} 
                    onChange={handleChange} 
                    placeholder="e.g. KCS-301" 
                    required 
                    style={styles.input} 
                  />
              </div>
              
              <div style={styles.row}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Academic Year</label>
                    <select name="year" value={formData.year} onChange={handleChange} style={styles.select}>
                        <option value="2023-24">2023-24</option>
                        <option value="2022-23">2022-23</option>
                        <option value="2021-22">2021-22</option>
                        <option value="2020-21">2020-21</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Semester</label>
                    <select name="semester" value={formData.semester} onChange={handleChange} style={styles.select}>
                        <option value="1st">1st Sem</option>
                        <option value="2nd">2nd Sem</option>
                        <option value="3rd">3rd Sem</option>
                        <option value="4th">4th Sem</option>
                        <option value="5th">5th Sem</option>
                        <option value="6th">6th Sem</option>
                        <option value="7th">7th Sem</option>
                        <option value="8th">8th Sem</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Paper Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} style={styles.select}>
                        <option value="Regular">Regular</option>
                        <option value="Carry Over">Carry Over</option>
                    </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                  <label style={styles.label}>PDF File</label>
                  <div style={styles.fileUploadWrapper}>
                    <input 
                        id="fileInput"
                        type="file" 
                        accept="application/pdf" 
                        onChange={handleFileChange} 
                        required 
                        style={{ padding: '10px' }}
                    />
                  </div>
                  <small style={{ color: '#64748b', marginTop: '5px', display: 'block' }}>Max size: 10MB. Only PDF files allowed.</small>
              </div>
              
              <button type="submit" disabled={loading} style={styles.button}>
                {loading ? 'Uploading...' : 'Upload Paper'}
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 20px', maxWidth: '800px', margin: '0 auto' },
  card: { backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  title: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '5px' },
  subtitle: { color: '#64748b', marginBottom: '30px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formGroup: { display: 'flex', flexDirection: 'column', flex: 1 },
  row: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  label: { fontSize: '14px', fontWeight: '600', color: '#334155', marginBottom: '8px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px' },
  select: { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '15px', backgroundColor: 'white' },
  fileUploadWrapper: { border: '2px dashed #cbd5e1', borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer' },
  button: { padding: '14px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px', transition: 'background-color 0.2s' },
  alert: { padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '15px' }
};

export default AdminPYQ;