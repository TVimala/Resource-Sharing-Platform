import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UploadBar.css"; 

const UploadBar = ({ courseName,username, userId }) => {

  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [fileName, setFileName] = useState("");
  const [uniqueTags, setUniqueTags] = useState(new Set());
  const [uploadStatus, setUploadStatus] = useState("");


 async function handleSubmit(e){
    e.preventDefault();

    const resource = { 
      url: link, 
      fileName,
      tags: Array.from(uniqueTags),
      uploaderName: username,
      userId
    };
    console.log('Resource to be uploaded:', resource); 
    console.log(courseName)
  try {
    const response = await fetch(`http://localhost:4000/course-api/${courseName}/files`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(resource),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("File uploaded successfully:", data);

    // Update the UI to show success
    setUploadStatus("File uploaded successfully!");
  
    
    // Reset form fields
    setLink("");
    setFileName("");
    setTags("");
    setUniqueTags(new Set());


  } catch (err) {
    console.error("Error uploading file:", err);
    setUploadStatus(`Error uploading file: ${err.message}`);
  }
};
  const handleTagInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tags.trim();
      if (newTag && !uniqueTags.has(newTag)) {
        setUniqueTags(new Set(uniqueTags).add(newTag));
      }
      setTags("");
    }
  };

  const removeTag = (tag) => {
    setUniqueTags((prevTags) => {
      const newTags = new Set(prevTags);
      newTags.delete(tag);
      return newTags;
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input type="text" 
        className="form-control"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        required
        placeholder="File Name"
        />
      </div>
      <div className="mb-3">
        <input 
          type="text"
          className="form-control"
          id="driveLink"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          placeholder="Drive link"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          onKeyDown={handleTagInput}
          placeholder="Press Enter and add Tags"
        />
        <div className="tags-container mt-2">
          {Array.from(uniqueTags).map((tag) => (
            <span key={tag} className="tag">
              {tag}
              <button
                type="button"
                className="tag-remove-btn"
                onClick={() => removeTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn btn-dark">
          Upload
        </button>
      </div>
      {uploadStatus && <div className="alert mt-3">{uploadStatus}</div>}
    </form>
  );
};

export default UploadBar;
