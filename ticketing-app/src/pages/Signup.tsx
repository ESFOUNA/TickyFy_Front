import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);
    
  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center pt-24 pb-12 px-4"
      style={{ backgroundImage: "url('/stadium.jpg')" }}
    >
      <div className="bg-white bg-opacity-15 backdrop-blur-lg shadow-2xl rounded-xl p-8 w-full max-w-[480px] mx-auto">
        {/* ✅ Logo */}
        <div className="flex justify-center items-center mb-4">
          <img
            src="/mlogo.png"
            alt="Logo"
            className="h-16 w-auto object-contain self-center"
          />
        </div>

        {/* ✅ Title */}
        <h2 className="text-center text-3xl font-bold text-white mb-6">Sign up</h2>

        {/* Name fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="First name" className="input-field" />
          <input type="text" placeholder="Last name" className="input-field" />
        </div>

        {/* Email */}
        <input type="email" placeholder="Email address" className="input-field mb-4" />

        {/* Phone Input explicitly styled */}
        <PhoneInput
          country={"us"}
          inputStyle={{
            width: "100%",
            height: "48px",
            borderRadius: "25px",
            backgroundColor: "rgba(255,255,255,0.3)",
            color: "white",
            paddingLeft: "50px",
            border: "none",
            backdropFilter: "blur(8px)",
          }}
          buttonStyle={{
            borderRadius: "20px 0 0 20px",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
          containerStyle={{
            borderRadius: "20px",
          }}
        />

        {/* Password */}
        <div className="relative mt-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input-field"
          />
          <button
            type="button"
            className="absolute right-4 top-3 text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Checkboxes */}
        <div className="text-xs text-white space-y-2 mt-4">
          <label className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" />
            By creating an account, I consent to receive SMS, emails, updates, events, and marketing promotions.
          </label>

          <label className="flex items-start gap-2 text-xs">
            <input type="checkbox" className="mt-1" />
            By creating an account, I agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
          </label>
        </div>

        {/* Signup Button */}
        <button className="mt-4 w-full bg-white py-2.5 rounded-full shadow-xl text-lg font-bold">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Signup;