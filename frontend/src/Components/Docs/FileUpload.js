import React, { useState } from "react";
import "./FileUpload.css"; // Make sure the path to the CSS file is correct
import axios from "axios";

const FileUpload = ({ documentType }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const studentForeginId = localStorage.getItem("studentId");
  console.log(studentForeginId);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file ) {
      setSelectedFile(file);
      setError("");
    } else {
      setSelectedFile(null);
      setError("Please upload a PDF file.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    // Handle the file upload logic (e.g., API call)
    const formData = new FormData();
    console.log(selectedFile);
    formData.append("documentType", documentType);
    formData.append("studentForeginId", studentForeginId);
    formData.append("file", selectedFile);
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    const response= await axios.post(`http://localhost:8080/dashboard/upload/${documentType}`, formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    // Example API call to upload the file (replace this with your actual logic)
    // fetch('/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log('File uploaded successfully:', data);
    // })
    // .catch((error) => {
    //   console.error('Error uploading file:', error);
    // });

    alert(`File for ${documentType} uploaded successfully!`);
  };

  return (
    <div className="file-upload">
      <h3>Upload {documentType}</h3>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
