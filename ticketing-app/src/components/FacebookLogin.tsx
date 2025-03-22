import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaFacebook } from "react-icons/fa";

const FacebookLogin = () => {
  const { login } = useAuth();

  const handleLogin = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded yet.");
      return;
    }

    window.FB.getLoginStatus((response: any) => {
      if (response.status === "connected") {
        fetchUserInfo();
      } else {
        window.FB.login(
          (loginResponse: any) => {
            if (loginResponse.authResponse) {
              fetchUserInfo();
            } else {
              console.error("User cancelled login or did not fully authorize.");
            }
          },
          { scope: "public_profile,email" }
        );
      }
    });
  };

  const fetchUserInfo = () => {
    window.FB.api("/me", { fields: "name,email,picture" }, (userInfo: any) => {
      login({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture.data.url,
      });
      window.location.href = "/";
    });
  };

  useEffect(() => {
    if (!window.FB) {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: "3764527563693845",
          cookie: true,
          xfbml: true,
          version: "v19.0",
        });
      };
    }
  }, []);

  return (
    <button onClick={handleLogin} className="facebook-btn auth-button">
      <FaFacebook className="text-2xl" />
      <span>Login with Facebook</span>
    </button>
  );
};

export default FacebookLogin;
