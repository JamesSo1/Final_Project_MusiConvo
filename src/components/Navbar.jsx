import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const searchQuery = () => {
    if (query.length == 0) {
      alert("Please enter a query to search");
      return;
    }
    window.location = `/search/${query}`;
  };
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          MusiConvo
        </Link>
      </div>
      <div className="navbar-middle">
        <input
          type="text"
          placeholder="Search..."
          id="query"
          name="query"
          value={query}
          onChange={handleQueryChange}
        />
        <button className="search-button" onClick={searchQuery}>
          Search
        </button>
      </div>
      <div className="navbar-right">
        <Link to="/addpost" className="navbar-link">
          Create a Post
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
