import { View, Text } from "react-native";
import React from "react";
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetch("http://10.0.2.2/api/auth")
      .then((response) => response.json())
      .then((data) => {
        console.log("provider: this is data", data);
        const booleanData = data === "true" ? true : false;
        console.log(typeof booleanData);
        console.log("this is booleanData", booleanData);

        setIsLogged(booleanData);
      });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ isLogged, setIsLogged }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
