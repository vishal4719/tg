import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ActivityReview() {
    const [pendingActivities, setPendingActivities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');
    const [hoursApproved, setHoursApproved] = useState('');
    const [adminComments, setAdminComments] = useState('');

    // Fetch pending activities on component mount
    useEffect(() => {
        fetchPendingActivities();
    }, []);

    const fetchPendingActivities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/activities/pending');
            console.log(response.data); // Log the response to inspect the structure
            setPendingActivities(response.data.data); // Ensure this is an array
        } catch (error) {
            setError('Error fetching pending activities');
            console.error('Error:', error);
        }
    };
    

    // Handle the status update and related information
    const handleStatusUpdate = async (id) => {
        if (!status || !hoursApproved || !adminComments) {
            alert('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            await axios.put(`http://localhost:8080/api/activities/${id}`, {
                status,
                hours_approved: hoursApproved,
                admin_comments: adminComments
            });
            fetchPendingActivities(); // Refresh the activity list
        } catch (error) {
            setError('Error updating activity status');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: 'auto', padding: '20px' }}>
            <h1>Pending Activity Review</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {loading && <p>Loading...</p>}

            <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Activity Name</th>
                        <th>Activity Type</th>
                        <th>Hours</th>
                        <th>Status</th>
                        <th>Admin Comments</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingActivities.length === 0 ? (
                        <tr>
                            <td colSpan="6">No pending activities to review.</td>
                        </tr>
                    ) : (
                        pendingActivities.map((activity) => (
                            <tr key={activity.id}>
                                <td>{activity.activityName}</td>
                                <td>{activity.activityType}</td>
                                <td>{activity.hours}</td>
                                <td>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">Select Status</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={adminComments}
                                        onChange={(e) => setAdminComments(e.target.value)}
                                        placeholder="Enter comments"
                                        style={{ width: '200px' }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={hoursApproved}
                                        onChange={(e) => setHoursApproved(e.target.value)}
                                        placeholder="Approved hours"
                                        style={{ width: '100px' }}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleStatusUpdate(activity.id)}
                                        disabled={loading}
                                        style={{
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {loading ? 'Updating...' : 'Update'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ActivityReview;
