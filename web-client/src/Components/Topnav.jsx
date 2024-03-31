import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topnav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Redirect to the search page with the search query
      navigate(`/bookmark/search/${searchQuery}`);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="top-nav">
      <div className="inner-top-nav">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Bookmark Here"
            value={searchQuery}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
