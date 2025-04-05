import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import FacebookLogin from "../components/FacebookLogin";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api/api";
import { getProfile } from "../api/user";
import { toast } from "react-toastify";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // State for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  // Handle form submission for email/password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { jwt } = res.data;
      localStorage.setItem("token", jwt);

      // Fetch user profile after saving token
      const userData = await getProfile();
      login(userData);

      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500); // Delay to allow toast to show
    } catch (err: any) {
      console.error("Login error", err.response?.data || err.message);
      toast.error("Login failed!");
    }
  };

  return (
    <div className="auth-container">
      {/* Logo above title */}
      <div className="flex justify-center mb-2">
        <img
          src="/mlogo.png"
          alt="Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Title */}
      <h2 className="text-center text-2xl font-bold text-white">Log in</h2>
      <p className="text-center text-white">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-400 font-semibold">
          Sign up
        </a>
      </p>

      {/* Social Login Buttons */}
      <div className="flex flex-col items-center space-y-3 w-full mt-4">
        <FacebookLogin />

        {/* Google Login Button Wrapper */}
        <div className="google-btn auth-button cursor-pointer flex items-center justify-center space-x-2 w-full relative">
          <FcGoogle className="text-2xl" />
          <span>Login with Google</span>
          {/* Overlay the GoogleLogin component with zero opacity */}
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded: any = jwtDecode(credentialResponse.credential!);
              login({
                name: decoded.name,
                email: decoded.email,
                picture: decoded.picture,
              });
              toast.success("Logged in with Google!");
              setTimeout(() => {
                navigate("/");
              }, 1500); // Delay to allow toast to show
            }}
            onError={() => {
              console.error("Google Login Failed");
              toast.error("Google login failed!");
            }}
            containerProps={{
              style: {
                position: "absolute",
                opacity: 0,
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                zIndex: 1,
              },
            }}
          />
        </div>
      </div>

      <div className="text-center my-2 text-white">OR</div>

      {/* Input Fields */}
      <form className="space-y-3 w-full" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Your password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="auth-button bg-white text-black shadow-xl"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;