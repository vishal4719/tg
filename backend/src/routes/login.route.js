const express = require('express');
const loginController = require('../controllers/login.controller');
const { signup, login } = require('../models');
const Router = express.Router();
Router.post('/generate-otp', async(req, res) => {
    const { email } = req.body;

    try{
        console.log(email);
        //I have created this because I dont know what features on the frontend side
        // Check if email is registered
        const isRegistered = await loginController.isEmailRegistered(email);
        console.log("reg",isRegistered);
        if (!isRegistered) {
            return res.status(400).send({ message: 'You need to register' });
        }
        // still it is there for future implementation

        //generating otp and sending mail of it to users
        const otp = await loginController.generateandStoreOTP(email);

        const  sent=  await loginController.sendOTPEmail(email, otp);

        
        return res.status(200).send({ message: 'OTP sent successfully' });
    } catch(error){
        return res.status(200).send({ message: 'Error generating otp',error: error.message });
    }
});

//router of logining in
Router.post('/login', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Verify the OTP
        console.log('Received Email:', email, 'OTP:', otp);
        const isValid = await loginController.verifyOTP(email, otp);

        if (!isValid) {
            // Respond for invalid OTP
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        // Find the user in signup table
        const userId = await signup.findOne({ where: { stud_email: email } });
        if (!userId) {
            return res.status(404).json({ message: 'User not found in signup table' });
        }

        // Find the user in login table
        const user = await login.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found in login table' });
        }

        // Send success response with user details
        console.log('Signup User ID:', userId.id);
        console.log('Login User:', user.id);
        res.status(200).json({
            message: 'OTP verified successfully',
            userId: user.id,
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
});

module.exports = Router;