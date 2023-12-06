import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginForm = async (e) => {
    e.preventDefault();

    try {
      await loginAPICall(email, password);
      const token = "Basic " + window.btoa(email + ":" + password);
      storeToken(token);
      /* Diplay the Links as Per User Auth in the Header */
      saveLoggedInUser(email);
      navigate("/tasks");
      /* Diplay the Links as Per User Auth in the Header */
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLoginForm,
  };
};

export default useLogin;