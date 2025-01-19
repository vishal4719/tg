import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentSearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    roll_no: '',
    division: '',
    year_of_admission: '',
    branch: ''
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const queryParams = new URLSearchParams(
        Object.entries(searchParams).filter(([_, value]) => value !== '')
      ).toString();

      const response = await axios.get(`http://localhost:8080/api/students/search?${queryParams}`);
      setStudents(response.data.data);
    } catch (error) {
      setError(error.response?.data.message || 'Error searching students');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Search</h2>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Roll Number</label>
              <input
                type="text"
                name="roll_no"
                value={searchParams.roll_no}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Division</label>
              <input
                type="text"
                name="division"
                value={searchParams.division}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Year of Admission</label>
              <input
                type="number"
                name="year_of_admission"
                value={searchParams.year_of_admission}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Branch</label>
              <input
                type="text"
                name="branch"
                value={searchParams.branch}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 text-center mt-4">{error}</div>
        )}
      </div>

      {students.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left">UID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Roll No</th>
                <th className="p-3 text-left">Branch</th>
                <th className="p-3 text-left">Division</th>
                <th className="p-3 text-left">Year</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{student.UID}</td>
                  <td className="p-3">{`${student.student_name} ${student.surname}`}</td>
                  <td className="p-3">{student.roll_no}</td>
                  <td className="p-3">{student.branch}</td>
                  <td className="p-3">{student.division}</td>
                  <td className="p-3">{student.year_of_admission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentSearchForm;