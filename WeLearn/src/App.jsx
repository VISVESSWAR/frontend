//import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./assets/components/header/header";
import Home from "./pages/Home/Home";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Footer from "./assets/components/Footer/Footer";
import About from "./pages/About/About";
import Account from "./pages/Account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./assets/components/Loading/Loading";
import Courses from "./pages/Courses/Courses";
import { CourseDescription } from "./pages/CourseDescription/CourseDescription";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Payment/Checkout";
import SuccessPage from "./pages/Payment/Success";
import FailurePage from "./pages/Payment/Failure";
import Dashboard from "./pages/Dashboard/Dashboard";
import CourseStudy from "./pages/CourseStudy/CourseStudy";
import Lectures from "./pages/Lectures/Lectures";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
function App() {
  const { isAuth, user, loading } = UserData();
  console.log("user:", user, isAuth);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            />
            <Route
              path="/user/cart"
              element={isAuth ? <Cart user={user} /> : <Login />}
            />
            <Route
              path="/user/cart/checkout"
              element={isAuth ? <Checkout user={user} /> : <Login />}
            />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/failure" Component={FailurePage} />
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashboard user={user} /> : <Login />}
            />
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            />
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            />
            
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            />
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lectures user={user} /> : <Login />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
