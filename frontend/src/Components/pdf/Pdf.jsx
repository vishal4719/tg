import React from 'react';
import PDFViewer from './PDFViewer';

const pdf = () => {
    return (
        <div>
            <h1>PDF Viewer</h1>
            <PDFViewer filename="example.pdf" />
        </div>
    );
};

export default pdf;
