import React from "react";
import "./styles/style.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import { Navbar } from "./Components/UI/Navbar/Navbar";
import {AuthContext} from "./context/context";
import {useEffect} from "react";

function App() {
  const [isAuth, setIsAuth] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(()=>{
    if(localStorage.getItem('auth'))
      setIsAuth(true)
      setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading
      }}
    >
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
