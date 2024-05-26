import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/common/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "./hook/useAuthContext";
import { ToastContainer } from "react-toastify";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
