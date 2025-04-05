import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api/api";
import { toast } from "react-toastify";

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
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  // Handle form submission for signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isoBirthdate = new Date(birthdate + "T00:00:00Z");
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
        f_name,
        l_name,
        email,
        password,
        phone,
        birthdate: isoBirthdate,
      });

      const { jwt } = res.data;
      localStorage.setItem("token", jwt);
      login({ name: `${f_name} ${l_name}`, email });
      toast.success("Signed up successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500); // Delay to allow toast to show
    } catch (err: any) {
      console.error("Signup error", err.response?.data || err.message);
      toast.error("Signup failed!");
    }
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-center pt-32 pb-8 px-4"
      style={{ backgroundImage: "url('/stadium.jpg')" }}
    >
      <div className="bg-white bg-opacity-15 backdrop-blur-lg shadow-xl rounded-lg p-6 w-full max-w-[400px] mx-auto">
        {/* Logo */}
        <div className="flex justify-center items-center mb-3">
          <img
            src="/mlogo.png"
            alt="Logo"
            className="h-12 w-auto object-contain self-center"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-white mb-4">
          Sign up
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-3">
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
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Birthdate */}
          <input
            type="date"
            placeholder="Birthdate"
            className="input-field"
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
              height: "40px",
              borderRadius: "20px",
              backgroundColor: "rgba(255,255,255,0.3)",
              color: "white",
              paddingLeft: "45px",
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
          <div className="relative">
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
              className="absolute right-3 top-2.5 text-white text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Checkboxes */}
          <div className="text-[10px] text-white space-y-1">
            <label className="flex items-start gap-1.5">
              <input type="checkbox" className="mt-0.5" required />
              I consent to receive SMS, emails, updates, events, and promotions.
            </label>
            <label className="flex items-start gap-1.5">
              <input type="checkbox" className="mt-0.5" required />
              I agree to the <a href="#" className="underline">Terms</a> and{" "}
              <a href="#" className="underline">Privacy Policy</a>.
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="mt-3 w-full bg-white py-2 rounded-full shadow-lg text-base font-semibold"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;