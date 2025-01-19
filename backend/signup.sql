-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS testDB;

-- Use the database
USE testDB;

-- Drop existing tables in reverse order of dependencies
DROP TABLE IF EXISTS activity_points;
DROP TABLE IF EXISTS DocumentsDuringAdmissions;
DROP TABLE IF EXISTS dashboard;
DROP TABLE IF EXISTS login;
DROP TABLE IF EXISTS signup;
DROP TABLE IF EXISTS form;  -- Drop the form table if it exists

-- Recreate the signup table
CREATE TABLE IF NOT EXISTS signup (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  stud_phone_no VARCHAR(15) NOT NULL,
  stud_email VARCHAR(100) NOT NULL,
  branch VARCHAR(50) NOT NULL,
  Division VARCHAR(10) NOT NULL,
  father_name VARCHAR(100) NOT NULL,
  father_email VARCHAR(100),         
  father_phone_no VARCHAR(15) NOT NULL, 
  mother_name VARCHAR(100) NOT NULL,
  mother_email VARCHAR(100),         
  mother_phone_no VARCHAR(15) NOT NULL, 
  yearofadmission YEAR NOT NULL,
  student_address TEXT NOT NULL,
  pincode VARCHAR(10) NOT NULL
);

-- Recreate the login table
CREATE TABLE IF NOT EXISTS login (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  otp VARCHAR(255) NOT NULL,
  otp_expiry DATETIME NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Recreate the dashboard table
CREATE TABLE IF NOT EXISTS dashboard (
  dashboard_primary_key INT AUTO_INCREMENT PRIMARY KEY,
  student_foreign_id INT NOT NULL,
  FOREIGN KEY (student_foreign_id) REFERENCES signup(id)
);

-- Recreate the DocumentsDuringAdmissions table
CREATE TABLE IF NOT EXISTS DocumentsDuringAdmissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Dashboard_id INT,
  result_12th VARCHAR(100) NOT NULL,
  aadharCard VARCHAR(100) NOT NULL,
  panCard VARCHAR(100) NOT NULL,
  mhtcetResult VARCHAR(100) NOT NULL,
  admissionCard VARCHAR(100) NOT NULL,
  capCard VARCHAR(100) NOT NULL,
  domicile VARCHAR(100) NOT NULL,
  birthCertificate VARCHAR(100) NOT NULL,
  leavingCertificate VARCHAR(100) NOT NULL,
  filePath VARCHAR(255) NOT NULL,
  fileType VARCHAR(255) NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (Dashboard_id) REFERENCES dashboard(dashboard_primary_key) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE
);

-- Recreate the form table
CREATE TABLE IF NOT EXISTS form (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  roll_no VARCHAR(50) NOT NULL
);

-- Create the activity_points table
CREATE TABLE IF NOT EXISTS activity_points (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  activity_type VARCHAR(255) NOT NULL,
  activity_name VARCHAR(255) NOT NULL,
  hours_requested INT NOT NULL,
  hours_approved INT DEFAULT NULL,
  certificate_id VARCHAR(255) NOT NULL,
  certificate_by VARCHAR(255) NOT NULL,
  certificate_file VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  admin_comments TEXT DEFAULT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES signups(id) ON DELETE CASCADE ON UPDATE CASCADE
);
