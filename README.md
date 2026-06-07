Nama : GALANG ABINERRY XI PPLG 2

# PENJELASAN FEATCH API
Fetch API adalah fitur bawaan JavaScript yang digunakan untuk mengambil (fetch) atau mengirim data ke server melalui HTTP, Biasanya digunakan untuk mengambil data dari API.

Fetch berfungsi untuk mengambil data dari API atau server secara asynchronous.
```jsx
useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) =>{
        if (!res.ok)
        throw new Error ("Error")
        return res.json()
      })
      .then((data) => { 
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
  })}, []);
;
```

# PENJELASAN COMPONENT DAN FUNGSI NYA

# 1. NAVBAR
Navbar berfungsi sebagai bagian atas (header) pada website, Komponen ini digunakan untuk menampilkan identitas aplikasi serta menyediakan fitur pencarian pengguna.
Fungsinya adalah membantu pengguna mencari dan menyaring data pengguna berdasarkan kata kunci yang dimasukkan pada kolom pencarian, sehingga data yang dicari dapat ditemukan dengan lebih mudah dan cepat.

```jsx
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
```

# 2. UserCard

UserCard komponen yang berfungsi untuk menampilkan informasi setiap pengguna dalam bentuk kartu (card), Informasi yang ditampilkan meliputi nama, username, email, dan kota pengguna. Selain itu juga, komponen ini juga menyediakan tombol Like dan Follow. Fungsinya adalah menampilkan data pengguna yang diperoleh dari API serta memungkinkan pengguna

```jsx

const UserCard = ({ user }) => {
  const { likedUsers, followedUsers, toggleLike, toggleFollow } = useAppContext();
  const isLiked = likedUsers.has(user.id);
  const isFollowed = followedUsers.has(user.id);

  return (
    <div className="user-card">
      <h2> {user.name}</h2>
      <p>@{user.username}</p>
      <p>✉️{user.email}</p>
      <p>📍{user.address.city}</p> //Menampilkan informasi pengguna:Nama, Username, Email, Kota

      <div className="card-actions">
        <button
          className={`btn-like ${isLiked ? "active" : ""}`}
          onClick={() => toggleLike(user.id)} //Ubah status like
        >
          {isLiked ? "❤️ Liked" : "🤍 Like"}
        </button>
        <button
          className={`btn-follow ${isFollowed ? "active" : ""}`}
          onClick={() => toggleFollow(user.id)} //ubah status follow
        >
          {isFollowed ? "✔ Following" : "+ Follow"}
        </button>
      </div>
    </div>
  );
};

 ```

 # 3. FOOTER
Komponen yang berfungsi sebagai bagian bawah (footer) pada website, yang menampilkan informasi tambahan, seperti nama aplikasi dan sumber data yang digunakan. Fungsinya adalah memberikan informasi kepada pengguna mengenai aplikasi yang dibuat serta sumber data yang digunakan, yaitu API JSONPlaceholder.

```jsx
 const Footer = () => { //Membuat komponen footer
  return ( //Menampilkan elemen
    <footer className="footer">//styling css
      <p>SocialConnect © 2025 — Data dari JSONPlaceholder API</p>//Text bawah web
    </footer>
  );
};
```

# IMPLEMENTASI REACT HOOK (useState, useEffect, useContext, useRef)

# 1. UseState

useState adalah Hook di React yang berfungsi untuk menyimpan dan mengelola data (state) di dalam komponen fungsional, sehingga ketika nilainya berubah, tampilan komponen akan otomatis di-render ulang agar sesuai dengan data terbaru.
Secara sederhana, useState dipakai untuk membuat “variabel yang bisa berubah dan mempengaruhi UI”.

```jsx
const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  }
```

 `users` digunakan untuk menyimpan data pengguna yang diperoleh dari API, dengan nilai awal berupa array kosong.
 `loading` digunakan untuk menyimpan status proses pemuatan data, dengan nilai awal `true` karena data masih dalam proses pengambilan.
 `error` digunakan untuk menyimpan informasi kesalahan ketika proses pengambilan data gagal, dengan nilai awal `null` karena belum terjadi error.
 `searchQuery` digunakan untuk menyimpan kata kunci pencarian yang dimasukkan pengguna, dengan nilai awal berupa string kosong.


# 2. useEffect

useEffect adalah Hook di React yang digunakan untuk menjalankan efek samping (side effect) pada komponen, seperti mengambil data dari API, mengubah DOM, atau menjalankan proses tertentu setelah komponen dirender.

```jsx
useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) =>{
        if (!res.ok)
        throw new Error ("Error")
        return res.json()
      })
      .then((data) => { 
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
  })}, []);
;
```

useEffect(() => { ... }, []) → kode di dalamnya hanya dijalankan sekali saat komponen pertama kali muncul (mounting) karena dependency array kosong [].
fetch(...) → mengambil data user dari API JSONPlaceholder.
if (!res.ok) → mengecek apakah respon dari server berhasil atau tidak.
res.json() → mengubah data dari format JSON menjadi JavaScript object.
.then((data) => setUsers(data)) → menyimpan data ke state users.
setLoading(false) → menandakan proses loading sudah selesai.
.catch((err) => setError(err.message)) → menangkap error jika fetch gagal.


# 3. UseContext

Fungsi ini adalah custom hook di React yang digunakan untuk mengambil data dari Context dengan cara yang lebih aman dan mudah.

```jsx 
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
```

useAppContext adalah cara praktis untuk mengakses data global dari Context, sekaligus memastikan bahwa hook hanya digunakan di dalam AppProvider.


# 4. UseRef
useRef adalah Hook di React yang digunakan untuk membuat referensi yang bisa menyimpan nilai atau mengakses elemen DOM secara langsung tanpa menyebabkan re-render saat nilainya berubah.

```jsx 
const Navbar = ({ onSearch }) => {
  const searchRef = useRef(null);

  const handleChange = (e) => {
    onSearch(e.target.value);
  };
```

inputRef → wadah untuk menyimpan referensi
useRef(null) → nilai awalnya null
onSearch(e.target.value);
Mengirimkan nilai yang diketik pengguna