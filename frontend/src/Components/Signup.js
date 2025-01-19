import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: '',
    surname: '',
    gender: '',
    studentPhone: '',
    studentEmail: '',
    branch: '',
    div: '',
    fathersName: '',
    fathersPhone: '',
    mothersName: '',
    mothersPhone: '',
    admissionYear: '',
    address: '',
    pincode: '',
    roll_no: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const mandatoryFields = [
      'studentName',
      'surname',
      'gender',
      'studentPhone',
      'studentEmail',
      'branch',
      'div',
      'fathersName',
      'fathersPhone',
      'mothersName',
      'mothersPhone',
      'admissionYear',
      'address',
      'pincode',
      'roll_no',
    ];

    for (const field of mandatoryFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          'http://localhost:8080/signup',
          {
            student_name: formData.studentName,
            surname: formData.surname,
            gender: formData.gender,
            stud_phone_no: formData.studentPhone,
            stud_email: formData.studentEmail,
            Branch: formData.branch,
            Division: formData.div,
            father_name: formData.fathersName,
            father_phone_no: formData.fathersPhone,
            mother_name: formData.mothersName,
            mother_phone_no: formData.mothersPhone,
            year_of_admission: formData.admissionYear,
            student_address: formData.address,
            pincode: formData.pincode,
            roll_no: formData.roll_no,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 201) {
          toast.success('Account created successfully!');
          console.log(response);
          const userId = response.data.userId;
          localStorage.setItem('studentId', userId);
          setTimeout(() => {
            navigate('/dashboard'); // Redirect to Dashboard
          }, 1000);
        }
      } catch (error) {
        console.error('Signup Error:', error.response?.data || error.message);
        toast.error(
          error.response?.data?.message ||
            'An error occurred while creating the account.'
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 w-auto">
      <div className="w-full max-w-3xl bg-slate-10 shadow-md rounded-lg p-6 m-2">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <select
            name="gender"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="studentPhone"
            placeholder="Student Phone"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="studentEmail"
            placeholder="Student Email"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="branch"
            placeholder="Branch"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <select
            name="div"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          >
            <option value="">Select Division</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <input
            type="number"
            name="roll_no"
            placeholder="Roll Number"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="fathersName"
            placeholder="Father's Name"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="fathersPhone"
            placeholder="Father's Phone"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="mothersName"
            placeholder="Mother's Name"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="mothersPhone"
            placeholder="Mother's Phone"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="admissionYear"
            placeholder="Year of Admission"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
          <textarea
            name="address"
            placeholder="House Address"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1 md:col-span-2"
            onChange={handleInputChange}
          ></textarea>
          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleInputChange}
          />
        </form>
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;