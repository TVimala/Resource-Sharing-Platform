// import React from 'react';
// import './FileDisplay.css'
// import { FaFileAlt } from 'react-icons/fa';

// function FileDisplay({driveLink, fileName, tags }) {
//   return (
//     <div className="d-flex flex-column my-2">
//       <div className="d-flex align-items-center">
//         <a href={driveLink} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center text-decoration-none text-dark">
//           <FaFileAlt className="me-2" style={{ fontSize: '24px' }} />
//           <span className="fs-5">{fileName || 'Click to view the file'}</span>
//         </a>
//       </div>
//       {tags && tags.length > 0 && (
//         <div className="mt-2">
//           {tags.map((tag, index) => (
//             <span key={index} className="badge bg-secondary me-2">
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default FileDisplay;
import React from 'react';
import './FileDisplay.css';
import { FaFileAlt } from 'react-icons/fa';

function FileDisplay({ driveLink, fileName, tags, uploaderName }) {
  return (
    <div className="file-card">
      <div className="file-card-content">
        <FaFileAlt className="file-icon" />
        <div className="file-details">
          <a href={driveLink} target="_blank" rel="noopener noreferrer" className="file-link">
            <span className="file-name">{fileName || 'Click to view the file'}</span>
          </a>
          {uploaderName && <div className="uploader-name">Uploaded by: {uploaderName}</div>}
          {tags && tags.length > 0 && (
            <div className="file-tags">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileDisplay;

