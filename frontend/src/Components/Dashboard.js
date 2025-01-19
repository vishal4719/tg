import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PDFViewer from './pdf/pdfViewer';

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const student_foreign_id = localStorage.getItem('studentId');

  const getAllDocuments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/dashboard/getdocuments/${student_foreign_id}`);
      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  const handleViewPdf = (filename, documentType) => {
    setSelectedDoc({ filename, documentType });
  };

  const closeModal = () => {
    setSelectedDoc(null);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: isSidebarOpen ? '250px' : '0',
          backgroundColor: '#f4f4f4',
          padding: isSidebarOpen ? '20px' : '0',
          overflow: 'hidden',
          transition: 'width 0.3s ease, padding 0.3s ease',
          boxShadow: isSidebarOpen ? '2px 0 5px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        {isSidebarOpen && (
          <>
            <h2 style={{ marginBottom: '20px' }}>Menu</h2>
            <nav>
              <Link
                to="/upload"
                style={navLinkStyle}
              >
                Documents
              </Link>
              <Link
                to="/activity"
                style={navLinkStyle}
              >
                Activity Points
              </Link>
              <Link
                to="/profile"
                style={navLinkStyle}
              >
                Profile
              </Link>
              <Link
                to="/results"
                style={navLinkStyle}
              >
                Results
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('studentId');
                  window.location.href = '/login'; // or use a redirect to login page
                }}
                style={{
                  ...navLinkStyle,
                  backgroundColor: '#dc3545',
                  color: 'white',
                }}
              >
                Logout
              </button>
            </nav>
          </>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        {/* Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          style={hamburgerButtonStyle}
        >
          {isSidebarOpen ? 'X' : '☰'}
        </button>

        <h1 style={{ marginLeft: isSidebarOpen ? '270px' : '50px' }}>Dashboard</h1>
        <div className="flex gap-2 flex-wrap">
          {documents?.map((doc, index) => (
            <div key={index} className="flex gap-2 flex-wrap">
              {Object.entries(doc).map(([key, value]) => {
                if (key !== 'createdAt' && key !== 'updatedAt' && value && typeof value === 'string' && value.trim() !== '') {
                  return (
                    <div
                      key={key}
                      style={documentCardStyle}
                    >
                      <h3 style={{ marginBottom: '10px' }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                      </h3>
                      <button onClick={() => handleViewPdf(value, key)}>View PDF</button>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedDoc && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '80%',
              maxWidth: '800px',
              position: 'relative',
            }}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
              }}
            >
              X
            </button>
            <PDFViewer filename={selectedDoc.filename} doctype={selectedDoc.documentType} />
          </div>
        </div>
      )}
    </div>
  );
}

// Styles for sidebar links and buttons
const navLinkStyle = {
  display: 'block',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  textAlign: 'center',
  marginBottom: '10px',
};

// Hamburger menu button style
const hamburgerButtonStyle = {
  top: '20px',
  left: '20px',
  zIndex: 1000,
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
  display: 'inline-block',
};

// Document card style
const documentCardStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '200px',
  textAlign: 'center',
};

export default Dashboard;
