import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/context";
import { privateRoute, pablicRoute } from "../routers/route";
import { useContext } from "react";
import MyLoader from "./UI/Loader/MyLoader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading){
    return <MyLoader/>
  }

  return isAuth ? (
    <Routes>
      {privateRoute.map((e) => (
        <Route
          element={<e.element />}
          path={e.path}
          exact={e.exact}
          key={e.path}
        />
      ))}
      <Route exact path="*" element={<Navigate to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {pablicRoute.map((e) => (
        <Route
          element={<e.element />}
          path={e.path}
          exact={e.exact}
          key={e.path}
        />
      ))}
      <Route exact path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
