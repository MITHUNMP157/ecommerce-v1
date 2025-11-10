import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchHandle = (e) => {
    e.preventDefault();
    navigate("/search?keyword=" + keyword);
  };

  return (
    <div>
      <div className="search-input">
        <input
          type="search"
          placeholder="Search-products"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onBlur={searchHandle}
        />
        <button onClick={searchHandle} type="submit">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
