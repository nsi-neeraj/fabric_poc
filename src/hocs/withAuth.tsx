import React from "react";
import Login from "../pages/login";
import useAuthStore from "../store/authStore";

const withAuth = (Component: React.ComponentType) => {
  return function AuthComponent(props: any) {
    const {
      auth: { isAuthenticated },
    } = useAuthStore();

    if (!isAuthenticated) return <Login />;
    return <Component {...props} />;
  };
};

export default withAuth;
