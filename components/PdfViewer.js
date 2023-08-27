import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer({ pdfUrl }) {
  const [numPages, setNumPages] = React.useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const pageStyle = {
    margin: '-100px 0', // Example, adjust as needed
    padding: '0px',
  };


  return (
    <Document
      file={pdfUrl}
      options={{ workerSrc: '/pdf.worker.js' }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <div style={{ display: 'flex', flexDirection: 'column', margin: '0px', padding: '0px' }}>
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <div key={`pageContainer_${index + 1}`} style={{ marginBottom: '0px', margin: '0px', padding: '0px' }}>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={300} // Adjust the width as needed
                renderTextLayer={false} // Do not render text
                renderInteractiveForms={false} // Disable interactive forms rendering
                style={pageStyle} // Apply the custom style to the Page component
              />
            </div>
          ))}
      </div>
    </Document>
  );
}

export default PdfViewer;
