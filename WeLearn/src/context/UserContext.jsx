import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { server } from "../main";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const response = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });
      const data = response.data;
      setUser(data.exists);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.exists));
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      setIsAuth(false);
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const response = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });
      const data = response.data;
      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      navigate("/verify");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }

  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const response = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });
      const data = response.data;
      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setBtnLoading(false);
    }
  }
  async function fetchUserDetails() {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(`${server}/api/user/profile`, {
        headers: { token },
      });
      setUser(data.userData);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(`${server}/api/user/profile`, {
        headers: { token },
      });
      setIsAuth(true);
      setUser(data.userData);
      localStorage.setItem("user", JSON.stringify(data.userData));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuth(true);
      setLoading(false);
      fetchUserDetails(); 
    } else {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        btnLoading,
        loginUser,
        loading,
        registerUser,
        verifyOtp,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
