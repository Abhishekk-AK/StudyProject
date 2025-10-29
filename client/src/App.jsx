import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/") // ✅ thanks to Vite proxy
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="p-6 text-lg">
      {data ? (
        <p>✅ {data.message}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
