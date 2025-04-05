import { useEffect, useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getProfile } from "../api/user";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api/api";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Define the allowed language values
type Language = "English" | "French" | "Arabic";

// Define the structure of the translation object
interface Translation {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  language: string;
  email: string;
}

// Define the structure of the translations object
interface Translations {
  English: Translation;
  French: Translation;
  Arabic: Translation;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<Language>("English"); // Use the Language type
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({ unit: "%", x: 25, y: 25, width: 50, height: 50 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getProfile()
        .then((data) => {
          setProfile(data);
          setFName(data.f_name);
          setLName(data.l_name);
          setPhone(data.phone);
          setPassword("••••••••"); // Placeholder for password
        })
        .catch(() => navigate("/login"));
    }
  }, [user, navigate]);

  const handleEditToggle = async () => {
    if (isEditing) {
      // Save changes
      try {
        const res = await axios.put(
          `${API_BASE_URL}/api/users/profile`,
          { f_name, l_name, phone },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setProfile({ ...profile, f_name, l_name, phone });
        setIsEditing(false);
      } catch (err: any) {
        console.error("Update profile error", err.response?.data || err.message);
        alert("Failed to update profile.");
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop);
  };

  const handleImageUpload = async () => {
    if (!completedCrop || !imgRef.current) return;

    const canvas = document.createElement("canvas");
    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg");
      try {
        await axios.post(
          `${API_BASE_URL}/api/users/profile/picture`,
          { image: base64Image },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setProfile({ ...profile, profile_picture: base64Image });
        setSelectedImage(null);
      } catch (err: any) {
        console.error("Image upload error", err.response?.data || err.message);
        alert("Failed to upload image.");
      }
    }
  };

  const translations: Translations = {
    English: {
      firstName: "First name*",
      lastName: "Last name*",
      password: "Password*",
      phone: "Phone number*",
      language: "Language",
      email: profile?.email || "",
    },
    French: {
      firstName: "Prénom*",
      lastName: "Nom de famille*",
      password: "Mot de passe*",
      phone: "Numéro de téléphone*",
      language: "Langue",
      email: profile?.email || "",
    },
    Arabic: {
      firstName: "الاسم الأول*",
      lastName: "اسم العائلة*",
      password: "كلمة المرور*",
      phone: "رقم الهاتف*",
      language: "اللغة",
      email: profile?.email || "",
    },
  };

  const isRTL = language === "Arabic";

  return (
    <div
      className={`w-full min-h-screen pt-24 px-6 md:px-12 text-white relative ${isRTL ? "text-right" : "text-left"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {profile && (
        <>
          {/* ✅ Profile image and name */}
          <div className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"} items-center gap-4 mb-6`}>
            <div className="relative">
              <img
                src={profile.profile_picture ? `/images/${profile.profile_picture}` : user?.picture}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover cursor-pointer"
                onClick={handleImageClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className={isRTL ? "text-right" : "text-left"}>
              <h2 className="text-lg font-semibold">{`${profile.f_name} ${profile.l_name}`}</h2>
              <p className="text-sm">{profile.email}</p>
            </div>
            <button
              onClick={handleEditToggle}
              className={`ml-auto px-4 py-1 rounded-md bg-[#1d1d1d] ${isRTL ? "mr-auto ml-0" : ""}`}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          {/* ✅ Input Fields */}
          <div className="space-y-4 max-w-[700px]">
            <div className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"} gap-4`}>
              <input
                type="text"
                value={isEditing ? f_name : profile.f_name}
                onChange={(e) => setFName(e.target.value)}
                className="input-field flex-1"
                placeholder={translations[language].firstName}
                disabled={!isEditing}
              />
              <div className="relative flex-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={isEditing ? password : "••••••••"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder={translations[language].password}
                  disabled={!isEditing}
                />
                <button
                  type="button"
                  className={`absolute ${isRTL ? "left-3" : "right-3"} top-2.5 text-sm`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <input
              type="text"
              value={isEditing ? l_name : profile.l_name}
              onChange={(e) => setLName(e.target.value)}
              className="input-field"
              placeholder={translations[language].lastName}
              disabled={!isEditing}
            />
            <PhoneInput
              country={"us"}
              value={isEditing ? phone : profile.phone}
              onChange={(phone) => setPhone(phone)}
              disabled={!isEditing}
              inputStyle={{
                width: "100%",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.2)",
                color: "white",
                paddingLeft: isRTL ? "15px" : "45px",
                paddingRight: isRTL ? "45px" : "15px",
                border: "none",
                backdropFilter: "blur(6px)",
                textAlign: isRTL ? "right" : "left",
              }}
              buttonStyle={{
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: isRTL ? "0 12px 12px 0" : "12px 0 0 12px",
              }}
              containerStyle={{ borderRadius: "12px", width: "100%", direction: isRTL ? "rtl" : "ltr" }}
            />

            {/* ✅ Language Selection */}
            <div className="mt-6">
              <h3 className="mb-2 font-medium">{translations[language].language}</h3>
              <div className={`flex ${isRTL ? "flex-row-reverse" : "flex-row"} gap-4`}>
                <button
                  onClick={() => handleLanguageChange("English")}
                  className={`bg-white/15 px-4 py-2 rounded-xl ${
                    language === "English" ? "text-green-400" : "text-white"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("French")}
                  className={`bg-white/15 px-4 py-2 rounded-xl ${
                    language === "French" ? "text-lime-300" : "text-white"
                  }`}
                >
                  French
                </button>
                <button
                  onClick={() => handleLanguageChange("Arabic")}
                  className={`bg-white/15 px-4 py-2 rounded-xl ${
                    language === "Arabic" ? "text-white" : "text-white"
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* ✅ Email Footer */}
            <div className={`mt-12 flex ${isRTL ? "flex-row-reverse" : "flex-row"} items-center gap-3`}>
              <img src="/mail.png" className="w-5 h-5" alt="Mail Icon" />
              <span className="text-black bg-white px-3 py-1 rounded-full font-medium">
                {translations[language].email}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Image Crop Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={handleCropComplete}
              aspect={1}
            >
              <img ref={imgRef} src={selectedImage} alt="Crop" />
            </ReactCrop>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleImageUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;