import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css';
import { IoIosSearch } from "react-icons/io";

function SearchBar() {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="search-bar-container">
      <Form className="search-bar">
        <InputGroup className="m-2">
         
          <InputGroup.Text>
            <IoIosSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by tags"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>
        <div className="tags-container">
          {tags.map((tag, index) => (
            <div key={index} className="tag">
              {tag}
              <span className="tag-close" onClick={() => removeTag(tag)}>x</span>
            </div>
          ))}
        </div>
      </Form>
    </div>
  );
}

export default SearchBar;
