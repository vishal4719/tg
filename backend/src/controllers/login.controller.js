const express = require('express');
const cors = require('cors');
const db = require('../models');
const login = db.login;
const signup = db.signup;
// const Op = db.Sequelize.Op;
const nodemailer = require('nodemailer');


//configuring the nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "nj6097114@gmail.com",
      pass: "ojykwedlcfmshjcr",
    },
})

//Code for generating OTP
function generateOTP(){
    return Math.floor(100000+ Math.random() * 900000).toString();
}

// Function to check if email is registered
async function isEmailRegistered(email) {
    const registeredUser = await signup.findOne({ where: { stud_email:email } });
    if (registeredUser) {
        return true;
    }
    return false;
}

async function generateandStoreOTP(email){
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5*60*100);

    await login.upsert({
        email,
        otp,
        otp_expiry: otpExpiry,
    });

    console.log(`OTP for ${email}: ${otp}`);
    return otp;
} 


async function sendOTPEmail(email, otp){
    const mailOptions = {
        from: 'dubeyaayush333@gmail.com ',
        to: email,
        subject: 'YOUR OTP CODE',
        text: `Your OTP code is ${otp}. it will expire in 5 minutes`,
    };
    transporter.sendMail(mailOptions);
} 


async function verifyOTP(email, otp){
    const user = await login.findOne({ where: { email } });
    console.log("user this",user);
    if(!user){
        throw new Error(`User not found`);
    }
    console.log("exp",user.otp_expiry);
    console.log(new Date());
    if(user.otp === otp ){
        return true;
    } else {
        throw new Error('Invalid OTP');
    }
}

module.exports = {
    generateandStoreOTP,
    isEmailRegistered, 
    sendOTPEmail,
    verifyOTP,
};