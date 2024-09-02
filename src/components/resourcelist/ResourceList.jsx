import React, { useState } from "react";
import FileDisplay from "../filedisplay/FileDisplay";
const ResourceList = ({ resources }) => {
  const [searchTag, setSearchTag] = useState("");

  const filteredResources = resources.filter(resource =>
    resource.tags.some(tag => tag.toLowerCase().includes(searchTag.toLowerCase()))
  );

  return (
    <div>
      <h2 className="text-center">Resources</h2>
      <FileDisplay></FileDisplay>
      <ul>
        {filteredResources.map((resource, index) => (
          <li key={index}>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.link}
            </a>
            <p>Tags: {resource.tags.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
