import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

const AuthGuard = () => {
  const {authUser} = useAuthStore();
  console.log(authUser)
  return !!authUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;
