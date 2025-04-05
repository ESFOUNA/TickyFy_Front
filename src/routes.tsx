import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import FaceRecognition from "./pages/FaceRecognition";
import TicketList from "./pages/TicketList";
import Support from "./pages/Support";
import ProtectedRoute from "./components/ProtectedRoute";

const RoutesConfig = () => (
  <Routes>
    {/* Public routes explicitly */}
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/support" element={<Support />} />
    <Route path="/ticketlist" element={<TicketList />} />
    <Route path="/cart" element={<Cart />} />

    {/* Protected routes explicitly */}
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/face-recognition"
      element={
        <ProtectedRoute>
          <FaceRecognition />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default RoutesConfig;
