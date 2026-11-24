import { useState, useEffect } from "react";

function App() {
  // 1. ARRAY DESTRUCTURING (useState): Menyimpan data, status loading, dan kata kunci search
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

//   const[count, setCount] = useState(0) // count = 0 , function setcount 
//   const [Name, setName] = useState("") // Name = "" , function setName
//   const [friendList, setFriendList] = useState([]) // friendList = [] function setFriendList
  
//   // JavaScript Biasa (4 baris):
// let skor = 0;
// function setSkor(nilaiBaru) {
//   skor = nilaiBaru;
// }
  // 2. ASYNC / AWAIT + FETCH: Mengambil data saat halaman pertama kali dibuka
  useEffect(() => {
    async function ambilDataPosts() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();

        // Simpan 15 post pertama ke dalam state 'posts'
        setPosts(data.slice(0, 15));
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    ambilDataPosts();
  }, []);

  // 3. HOF (.filter) + DESTRUCTURING: Menyaring data secara otomatis setiap 'keyword' diketik
  const postsTersaring = posts.filter(({ title }) =>
    title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif", maxWidth: "900px" }}>
      <h1>Daftar Artikel (React + HOF)</h1>
      <button
        onClick = {() => setKeyword("")}
        style = {{padding: "8px 16px", marginBottom: "20px", cursor:"pointer"}}
        > Reset Pencarian
      </button>

      {/* Input Search Bar: Mengubah state 'keyword' setiap user mengetik */}
      <input
        type="text"
        placeholder="Cari judul artikel..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />

      {/* 4. TERNARY OPERATOR: Cek apakah masih loading atau sudah siap tampil */}
      {isLoading ? (
        <p>Sedang memuat data dari server...</p>
      ) : (
        <div>
          <p>Menampilkan {postsTersaring.length} artikel:</p>

          {/* 5. HOF (.map) + DESTRUCTURING: Merender setiap item menjadi elemen HTML */}
          {postsTersaring.map(({ id, title, body,userId }) => (
            <div
              key={id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px"
              }}
            >
              <h3>#{id} - {title}</h3>
              <p style={{ color: "#555" }}>{body}</p>
              <small>Ditulis oleh User #{userId}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;