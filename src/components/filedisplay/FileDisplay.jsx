import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
function FileDisplay({ driveLink, fileName }) {
  return (
    <div className="d-flex align-items-center my-2">
<iframe 
  src="https://drive.google.com/file/d/1rs0VN3ZIIWwPddtdQiZSRjSY3saDaSov/view?usp=drivesdk" 
  frameBorder="0" 
  scrolling="no" 
></iframe>
      {/* <a href='https://drive.google.com/file/d/1rs0VN3ZIIWwPddtdQiZSRjSY3saDaSov/view?usp=drivesdk' target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-decoration-none text-dark"> */}
        {/* <FaFileAlt className="me-2" style={{ fontSize: '24px' }} />
        <span className="fs-5">{fileName || 'Click to view the file'}</span>
      </a> */}
    </div>
  );
}

export default FileDisplay;
