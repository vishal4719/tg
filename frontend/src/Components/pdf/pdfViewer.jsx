import React from 'react';

const PDFViewer = ({ filename,doctype }) => {
    const pdfUrl = `http://localhost:8080/uploads/${doctype}/${filename}`;
    console.log(pdfUrl);
    return (
        <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            title="PDF Viewer"
            style={{ border: 'none' }}
        ></iframe>
    );
};

export default PDFViewer;
