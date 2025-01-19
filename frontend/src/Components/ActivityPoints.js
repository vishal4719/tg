// component/ActivityPoints.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ActivityPoint() {
    const [formData, setFormData] = useState({
        activity_type: '',
        activity_name: '',
        hours_requested: '',
        certificate_id: '',
        certificate_by: '',
        certificate_file: null
    });
    const [activities, setActivities] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const student_id = localStorage.getItem('studentId'); // Dynamically fetch student ID from localStorage

    useEffect(() => {
        if (student_id) {
            fetchActivities(student_id); // Pass the student_id dynamically to the fetch function
        }
    }, [student_id]);

    const fetchActivities = async (student_id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/activities/${student_id}`); // Use student_id dynamically
            setActivities(response.data.data.activities);
            setTotalHours(response.data.data.totalApprovedHours);
        } catch (error) {
            setError('Error fetching activities');
            console.error('Error:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            certificate_file: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
        formDataToSend.append('student_id', student_id);

        try {
            await axios.post('http://localhost:8080/api/activities/submit', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Clear form after submission
            setFormData({
                activity_type: '',
                activity_name: '',
                hours_requested: '',
                certificate_id: '',
                certificate_by: '',
                certificate_file: null
            });

            // Refetch activities
            fetchActivities(student_id);
        } catch (error) {
            setError('Error submitting activity');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h2>Activity Points Submission</h2>
            <div style={{ marginBottom: '20px' }}>
                <h3>Total Approved Hours: {totalHours}</h3>
            </div>

            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Activity Type:</label>
                    <select
                        name="activity_type"
                        value={formData.activity_type}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="">Select Type</option>
                        <option value="technical">Technical</option>
                        <option value="sports">Sports</option>
                        <option value="cultural">Cultural</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Activity Name:</label>
                    <input
                        type="text"
                        name="activity_name"
                        value={formData.activity_name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Hours:</label>
                    <input
                        type="number"
                        name="hours_requested"
                        value={formData.hours_requested}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Certificate ID:</label>
                    <input
                        type="text"
                        name="certificate_id"
                        value={formData.certificate_id}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Certificate By:</label>
                    <input
                        type="text"
                        name="certificate_by"
                        value={formData.certificate_by}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>Upload Certificate:</label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit Activity'}
                </button>
            </form>

            <h3>Your Activities</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>Activity</th>
                            <th style={tableHeaderStyle}>Type</th>
                            <th style={tableHeaderStyle}>Requested Hours</th>
                            <th style={tableHeaderStyle}>Approved Hours</th>
                            <th style={tableHeaderStyle}>Status</th>
                            <th style={tableHeaderStyle}>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map(activity => (
                            <tr key={activity.id}>
                                <td style={tableCellStyle}>{activity.activity_name}</td>
                                <td style={tableCellStyle}>{activity.activity_type}</td>
                                <td style={tableCellStyle}>{activity.hours_requested}</td>
                                <td style={tableCellStyle}>{activity.hours_approved || '-'}</td>
                                <td style={tableCellStyle}>
                                    <span style={getStatusStyle(activity.status)}>
                                        {activity.status}
                                    </span>
                                </td>
                                <td style={tableCellStyle}>{activity.admin_comments || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const tableHeaderStyle = {
    backgroundColor: '#f4f4f4',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd'
};

const tableCellStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd'
};

const getStatusStyle = (status) => {
    const baseStyle = {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '0.9em'
    };

    switch (status) {
        case 'approved':
            return {
                ...baseStyle,
                backgroundColor: '#d4edda',
                color: '#155724'
            };
        case 'rejected':
            return {
                ...baseStyle,
                backgroundColor: '#f8d7da',
                color: '#721c24'
            };
        default:
            return {
                ...baseStyle,
                backgroundColor: '#fff3cd',
                color: '#856404'
            };
    }
};

export default ActivityPoint;
