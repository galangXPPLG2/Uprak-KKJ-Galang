import { useState, useEffect } from "react";
import { useAppContext } from "./Context/UserContext";
import Navbar from "./Components/Navbar";
import UserCard from "./Components/UserCard";
import Footer from "./Components/Footer";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error ("Error") 
        return res.json()
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const q = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <Navbar onSearch={setSearchQuery} />

      <main className="main">
        <h2>Daftar Pengguna ({filteredUsers.length})</h2>

        {loading && <p className="loading">Memuat data...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && filteredUsers.length === 0 && (
          <p className="empty">Pengguna tidak ditemukan.</p>
        )}

        <div className="user-grid">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
