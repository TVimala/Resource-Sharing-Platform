import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';
import { IoIosSearch } from "react-icons/io";
import FileDisplay from '../filedisplay/FileDisplay';

function SearchBar({ files = [] }) {  
  const [input, setInput] = useState('');

  // Ensure files is always an array and check for the presence of tags
  const filteredFiles = Array.isArray(files) 
    ? files.filter(file => 
        Array.isArray(file.tags) &&
        file.tags.some(tag => tag.toLowerCase().includes(input.toLowerCase()))
      )
    : [];

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="search-bar-container">
      <Form className="search-bar-form" onSubmit={handleSubmit}>
        <InputGroup className="search-bar-input-group">
          <InputGroup.Text className="search-icon">
            <IoIosSearch />
          </InputGroup.Text>
          <Form.Control
            className="search-input"
            placeholder="Search by tags"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </InputGroup>
      </Form>
      <div className="file-display-container mt-3">
        {filteredFiles.length > 0 ? (
          <div className="file-card-container">
            {filteredFiles.map((file, index) => (
              <FileDisplay
                key={index}
                url={file.url}
                fileName={file.fileName}
                tags={file.tags}
                uploaderName={file.uploaderName}
              />
            ))}
          </div>
        ) : (
          <p>No files match your search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar; 
