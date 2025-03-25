import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api/api";

const Signup = () => {
  // State for form inputs
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  // Handle form submission for signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert birthdate to a valid ISO string that Java can parse
      const isoBirthdate = new Date(birthdate + "T00:00:00Z"); // Ensures no timezone issue

      const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
        f_name,
        l_name,
        email,
        password,
        phone,
        birthdate: isoBirthdate, // 🟢 Send as Date object, Axios will stringify it properly
      });

      const { jwt } = res.data;

      localStorage.setItem("token", jwt);
      login({ name: `${f_name} ${l_name}`, email });
      navigate("/");
    } catch (err: any) {
      console.error("Signup error", err.response?.data || err.message);
      alert("Signup failed.");
    }
  };

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

        {/* ✅ Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="First name"
              className="input-field"
              value={f_name}
              onChange={(e) => setFName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last name"
              className="input-field"
              value={l_name}
              onChange={(e) => setLName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            className="input-field mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Birthdate */}
          <input
            type="date"
            placeholder="Birthdate"
            className="input-field mb-4"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />

          {/* Phone Input */}
          <PhoneInput
            country={"us"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
              <input type="checkbox" className="mt-1" required />
              By creating an account, I consent to receive SMS, emails, updates, events, and marketing promotions.
            </label>

            <label className="flex items-start gap-2 text-xs">
              <input type="checkbox" className="mt-1" required />
              By creating an account, I agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
            </label>
          </div>

          {/* Signup Button */}
          <button type="submit" className="mt-4 w-full bg-white py-2.5 rounded-full shadow-xl text-lg font-bold">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;