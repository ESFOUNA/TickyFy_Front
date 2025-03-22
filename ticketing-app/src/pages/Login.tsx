import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import FacebookLogin from "../components/FacebookLogin";
import { FcGoogle } from "react-icons/fc"; // Google logo
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { login } = useAuth();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);
  
  return (
    <div className="auth-container">
      {/* ✅ Logo above title */}
      <div className="flex justify-center mb-2">
        <img
          src="/mlogo.png" // Replace with your image path in the public folder
          alt="Logo"
          className="h-16 w-auto object-contain" // Increased height to 64px, width adjusts automatically
        />
      </div>

      {/* ✅ Title */}
      <h2 className="text-center text-2xl font-bold text-white">Log in</h2>
      <p className="text-center text-white">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-400 font-semibold">Sign up</a>
      </p>

      {/* ✅ Social Login Buttons */}
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
              window.location.href = "/";
            }}
            onError={() => console.error("Google Login Failed")}
            containerProps={{
              style: {
                position: 'absolute',
                opacity: 0,
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                zIndex: 1
              }
            }}
          />
        </div>
      </div>

      <div className="text-center my-2 text-white">OR</div>

      {/* ✅ Input Fields */}
      <form className="space-y-3 w-full">
        <input type="email" placeholder="Your email" className="input-field" />
        <input type="password" placeholder="Your password" className="input-field" />

        {/* ✅ Login Button */}
        <button type="submit" className="auth-button bg-white text-black shadow-xl">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;