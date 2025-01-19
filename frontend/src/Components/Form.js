import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Form() {
  const [formData, setFormData] = useState({ name: '', rollNo: '' });
  const [loading, setLoading] = useState(false);  // Added loading state
  const [error, setError] = useState(null);  // Added error state
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state before submission
    setError(null);
    setLoading(true);  // Set loading to true

    try {
      const response = await axios.post('http://localhost:8080/formData/submit', formData);
      console.log(response.data.message);
      setFormData({ name: '', rollNo: '' }); // Clear form after submission
      setLoading(false);  // Reset loading state
    } catch (error) {
      setLoading(false);  // Reset loading state
      setError(error.response?.data.message || 'Error submitting form');  // Set error message
      console.error('Error submitting form:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Student Form</h2>
      {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}  {/* Error display */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="rollNo" style={{ display: 'block', marginBottom: '5px' }}>Roll Number</label>
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="button"
            onClick={handleBack}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}  // Disable button while loading
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Submitting...' : 'Submit'}  {/* Change button text while loading */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
