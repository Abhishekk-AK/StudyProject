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
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import OpenRoute from "./components/core/Auth/OpenRoute";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from './components/core/Dashboard/Cart/index'
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";


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
            <OpenRoute>
              <Signup/>
            </OpenRoute>
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
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
         <Route path="dashboard/my-profile" element={<MyProfile/>} /> 
         
         {
          //user?.accountType ===
           ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>} />
              <Route path="dashboard/cart" element={<Cart/>} />
            </>
          )
         }
         {
          //user?.accountType ===
           ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-courses" element={<AddCourse/> } />
            </>
          )
         }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
