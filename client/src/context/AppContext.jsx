import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [credit, setCredit] = useState(false); // ✅ use number instead of false

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const loadCreditsData = async (passedToken = token) => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
      headers: {
        Authorization: `Bearer ${passedToken}`,
      },
    });

    console.log("Data from loadCreditsData:", data);
    if (data.success) {
      setCredit(data.credits);
      setUser(data.user);
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error.message);
  }
};


  const generateImage = async (prompt) => {
    try {
         console.log("Sending prompt:", prompt); 
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        await loadCreditsData(); // ✅ make sure it finishes before continuing
        return data.resultImage;
      } else {
        toast.error(data.message);
        await loadCreditsData();
        if (data.creditBalance === 0) {
          navigate('/buy');
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setCredit(0); // ✅ reset credits on logout
  };

  useEffect(() => {
    if (token) {
      console.log("Token exists, calling loadCreditsData");
      loadCreditsData();
    }
  }, [token]);

  const value = {
    token, setToken,
    user, setUser,
    showLogin, setShowLogin,
    credit, setCredit,
    loadCreditsData,
    backendUrl,
    generateImage,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
