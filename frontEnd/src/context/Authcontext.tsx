import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface AuthContextType {
  adminuserDetails: any | null;
  studentDetails: any | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiry: number | null;

  login: (userData: any, access: string, refresh: string) => void;
  
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminuserDetails, setAdminUserDetails] = useState<any | null>(
    JSON.parse(localStorage.getItem("adminuserDetails") || "null")
  );

  console.log(adminuserDetails)

  const [studentDetails, setstudentDetails] = useState<any | null>(
    JSON.parse(localStorage.getItem("studentuserdetails") || "null")
  );

  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );

  const [expiry, setExpiry] = useState<number | null>(
    Number(localStorage.getItem("expiry")) || null
  );

  const decodeToken = (token: string | null) => {
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const checkTokenExpiry = () => {
    if (!accessToken) return logout();

    const decoded = decodeToken(accessToken);
    if (!decoded || !decoded.exp) return logout();

    const expMS = decoded.exp * 1000;

    if (expMS < Date.now()) {
      logout();
      window.location.href = "/";
    }
  };

  useEffect(() => {
    checkTokenExpiry();
  }, [accessToken]);


  const login = (userData: any, access: string, refresh: string) => {
   
    const decoded = decodeToken(access);
    const user = Array.isArray(userData) ? userData[0] : userData;
    const expMS = decoded?.exp ? decoded.exp * 1000 : null;

    setAccessToken(access);
    setRefreshToken(refresh);
    setExpiry(expMS);

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("expiry", String(expMS));

    if (user.role_id === 1) {
      setAdminUserDetails(user);
      localStorage.setItem("adminuserDetails", JSON.stringify(user));
    }
    if(user.role_id==3){
      setAdminUserDetails(user);
       localStorage.setItem("adminuserDetails", JSON.stringify(user));
    }
    else {
      setstudentDetails(user);
      localStorage.setItem("studentuserdetails", JSON.stringify(user));
    }
  };


  const logout = () => {
    setAdminUserDetails(null);
    setstudentDetails(null)
    setAccessToken(null);
    setRefreshToken(null);
    setExpiry(null);

    localStorage.removeItem("adminuserDetails");
    localStorage.removeItem("studentuserdetails")
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiry");
  };

  return (
    <AuthContext.Provider
      value={{
        adminuserDetails,
        accessToken,
        refreshToken,
        expiry,
        login,
        logout,
        studentDetails
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
