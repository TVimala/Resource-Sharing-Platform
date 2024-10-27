import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UploadBar.css";

const UploadBar = ({ courseName, username, userId, onUploadSuccess }) => {
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [fileName, setFileName] = useState("");
  const [uniqueTags, setUniqueTags] = useState(new Set());
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploadSuccess, setIsUploadSuccess] = useState(false); // New state for success message

  async function handleSubmit(e) {
    e.preventDefault();

    const resource = {
      url: link,
      fileName,
      tags: Array.from(uniqueTags),
      uploaderName: username,
      userId,
    };

    console.log("Resource to be uploaded:", resource);
    console.log(courseName);
    
    try {
      const response = await fetch(`https://file-api-xi.vercel.app/course-api/${courseName}/files`, {
     // const response = await fetch(`https://file-api-huow.onrender.com/course-api/${courseName}/files`, {
    //  const response = await fetch(`http://localhost:4000/course-api/${courseName}/files`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resource),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("File uploaded successfully:", data);
      setUploadStatus("File uploaded successfully!");
      setIsUploadSuccess(true); // Set success to true

      // Call the prop function to inform the parent to fetch uploads
      // onUploadSuccess();

      // Reset form fields
      setLink("");
      setFileName("");
      setTags("");
      setUniqueTags(new Set());

      // Clear success message after 5 seconds
      setTimeout(() => {
        setUploadStatus("");
        setIsUploadSuccess(false); // Reset success state
      }, 5000); // 5000 milliseconds = 5 seconds

    } catch (err) {
      console.error("Error uploading file:", err);
      setUploadStatus(`Error uploading file: ${err.message}`);
      setIsUploadSuccess(false); // Reset success state on error
    }
  }

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
    <div className="upload-bar-container">
      <h2>Upload File</h2>
      <div className="upload-instructions">
        <h5>How to Upload a File:</h5>
        <ol>
          <li>Enter a name for your file.</li>
          <li>Paste the link to the file in the "Drive link" field.</li>
          <li>Ensure the file is set to "Public" or "Anyone with the link can view" to allow access.</li>           <li>Add tags to help categorize your file. Press "Enter" to add each tag.</li>
          <li>Click the "Upload" button to submit your file.</li>
        </ol>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
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
            placeholder="Press Enter to add Tags"
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
        {uploadStatus && (
          <div className={`alert mt-3 ${isUploadSuccess ? 'alert-success' : 'alert-danger'}`}>
            {uploadStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadBar;
