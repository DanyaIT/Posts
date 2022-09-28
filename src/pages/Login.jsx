import React from "react";
import { useContext} from "react";
import MyButton from "../Components/UI/button/MyButton";
import MyInput from "../Components/UI/input/MyInput";
import { AuthContext } from "../context/context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = (e)=>{
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }
  return (
    <div>
      <h1>Авторизация пользователя</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин"></MyInput>
        <MyInput type="password" placeholder="Введите пароль"></MyInput>
        <MyButton>Авторизоваться</MyButton>
      </form>
    </div>
  );
};

export default Login;
