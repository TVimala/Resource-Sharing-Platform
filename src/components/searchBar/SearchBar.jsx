import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchBar.css'; 
import { IoIosSearch } from "react-icons/io";
function SearchBar() {
  return (
    <div className="search-bar-container">
      <Form className="search-bar">
        <InputGroup className="my-3">
         <Form.Control placeholder="Search" />
        </InputGroup>
      </Form>
    </div>
  );
}

export default SearchBar;
