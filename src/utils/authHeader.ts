// src/utils/authHeader.ts
const authHeader = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  };
  
  export { authHeader };
  