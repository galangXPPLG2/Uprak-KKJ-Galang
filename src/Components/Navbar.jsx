import { useRef } from "react";

const Navbar = ({ onSearch }) => {
  const searchRef = useRef(null);

  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <h1>SocialConnect</h1>
      <input
        ref={searchRef}
        type="text"
        placeholder="Cari pengguna..."
        onChange={handleChange}
        className="search-input"
      />
    </nav>
  );
};

export default Navbar;
