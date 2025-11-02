import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";


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
        <Route
          path="signup"
          element={
            <Signup/>
            // <OpenRoute>
            //   <Signup/>
            // </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <Login/>
          }
        />
        <Route
          path="forgot-password"
          element={
            <ForgotPassword/>
          }
        />
        <Route
          path="verify-email"
          element={
            <VerifyEmail/>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <UpdatePassword/>
          }
        />
        <Route
          path="about"
          element={
            <About/>
          }
        />
        <Route
          path="contact"
          element={
            <ContactUs/>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
