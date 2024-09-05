import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UploadBar.css"; 
const UploadBar = ({ addResource }) => {
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [uniqueTags, setUniqueTags] = useState(new Set());

  const handleSubmit = (e) => {
    e.preventDefault();
    const resource = { link, tags: Array.from(uniqueTags) };
    addResource(resource);
    setLink("");
    setTags("");
    setUniqueTags(new Set());
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
        {/* <label htmlFor="driveLink" className="form-label">
          Drive Link:
        </label> */}
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
        {/* <label htmlFor="tags" className="form-label">
          Tags:
        </label> */}
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
    </form>
  );
};

export default UploadBar;
