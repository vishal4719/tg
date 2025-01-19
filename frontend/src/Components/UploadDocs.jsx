import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
const UploadDocs = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-header">Upload Documents</h1>
        <ul className="dashboard-list">
          <li>
            <Link to="/upload-result" className="dashboard-link">
              Upload Result
            </Link>
          </li>
          <li>
            <Link to="/upload-adharcard" className="dashboard-link">
              Upload Aadhar Card
            </Link>
          </li>
          <li>
            <Link to="/upload-pancard" className="dashboard-link">
              Upload PAN Card
            </Link>
          </li>
          <li>
            <Link to="/upload-mhcetresult" className="dashboard-link">
              Upload MHT-CET Result
            </Link>
          </li>
          <li>
            <Link to="/upload-admissioncard" className="dashboard-link">
              Upload Admission Card
            </Link>
          </li>
          <li>
            <Link to="/upload-capregistration" className="dashboard-link">
              Upload CAP Registration Card
            </Link>
          </li>
          <li>
            <Link to="/upload-feesreceipt" className="dashboard-link">
              Upload Fees Receipt
            </Link>
          </li>
          <li>
            <Link to="/upload-domicile" className="dashboard-link">
              Upload Domicile Certificate
            </Link>
          </li>
          <li>
            <Link to="/upload-birthcertificate" className="dashboard-link">
              Upload Birth Certificate
            </Link>
          </li>
          <li>
            <Link to="/upload-leavingcertificate" className="dashboard-link">
              Upload Leaving Certificate
            </Link>
          </li>
          <li>
            <Link to="/upload-incomecertificate" className="dashboard-link">
              Upload Income Certificate
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UploadDocs;
