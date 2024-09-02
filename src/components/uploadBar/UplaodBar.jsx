// import React, { useState } from 'react'
// import { FiUpload } from "react-icons/fi";
// function UplaodBar() {
//   const [file,setfile]=useState();
//   return (
//     <div className='uploadbar'>
//       <input type="file" onChange={(e)=>setfile(e.target.files[0])} />
//       {/* <button><FiUpload />
//       </button> */}
//     </div>
//   )
// }

// export default UplaodBar
import React, { useState } from "react";

const UploadForm = ({ addResource }) => {
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const resource = { link, tags: tags.split(",").map(tag => tag.trim()) };
    addResource(resource);
    setLink("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Drive Link:</label>
        <input
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Tags (comma-separated):</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
