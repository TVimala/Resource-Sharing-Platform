import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
function FileDisplay({ driveLink, fileName, tags }) {
  return (
    <div className="d-flex flex-column my-2">
      <div className="d-flex align-items-center">
        <a href={driveLink} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-decoration-none text-dark">
          <FaFileAlt className="me-2" style={{ fontSize: '24px' }} />
          <span className="fs-5">{fileName || 'Click to view the file'}</span>
        </a>
      </div>
      {tags && tags.length > 0 && (
        <div className="mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="badge bg-secondary me-2">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileDisplay;
