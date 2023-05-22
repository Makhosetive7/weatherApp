import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlinePersonSearch } from "react-icons/md";
import "../Styles/Search.css";

const Search = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSeachedLocation = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/search/${city}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.code === 'Space') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by Location"
        value={city}
        onChange={handleSeachedLocation}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
};

export default Search;
