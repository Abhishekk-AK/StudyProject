import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/") // ✅ thanks to Vite proxy
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">  
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
