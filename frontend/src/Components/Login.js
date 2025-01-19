import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendOtpDisabled, setIsSendOtpDisabled] = useState(false);
  const [isOtpInputDisabled, setIsOtpInputDisabled] = useState(false);

  const sendOTP = async () => {
    if (!email) {
      toast.error('Email is required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error sending OTP!');
      }

      toast.success('OTP sent successfully to your email!');
      setIsOtpSent(true);
      setIsSendOtpDisabled(true); // Disable the "Send OTP" button
      setIsOtpInputDisabled(false); // Enable OTP input

      // Enable OTP input for 5 minutes, then disable it
      setTimeout(() => {
        setIsOtpInputDisabled(true);
        setIsOtpSent(false);
      }, 300000); // 5 minutes = 300,000 milliseconds

      // Re-enable "Send OTP" button after 5 minutes
      setTimeout(() => {
        setIsSendOtpDisabled(false);
      }, 300000);
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
    }
  };

  const verifyOTP = async () => {
    if (!otp) {
      toast.error('OTP is required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      // console.log(response.json().then((data) => console.log(data.userId)));
      const userId = await response.json().then((data) => data.userId);
      console.log(userId)
      localStorage.setItem('studentId', userId);
      if (!response.ok) {
        throw new Error('Invalid OTP!');
      }

      toast.success('OTP verified successfully!');
      window.location.href = '/dashboard';
      // Perform further actions, such as redirecting or logging in the user
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={sendOTP}
          disabled={isSendOtpDisabled}
          className={`w-full py-2 rounded-lg transition duration-300 ${
            isSendOtpDisabled
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSendOtpDisabled ? 'Please wait 5 mins' : 'Send OTP'}
        </button>
        {isOtpSent && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={isOtpInputDisabled}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 ${
                isOtpInputDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            />
            <button
              onClick={verifyOTP}
              disabled={isOtpInputDisabled}
              className={`w-full py-2 rounded-lg transition duration-300 ${
                isOtpInputDisabled
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              Verify OTP
            </button>
          </div>
        )}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
