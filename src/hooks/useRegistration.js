import { useState } from "react";
import { registerAPICall } from "../services/AuthService";

const useRegistration = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    const register = {
      name,
      username,
      email,
      password,
    };
    try {
      await registerAPICall(register);
      console.log("Successfully Registered");
    } catch (err) {
      console.log(err);
    }
  };
  return {
    name,
    setName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleRegistration,
  };
};

export default useRegistration;