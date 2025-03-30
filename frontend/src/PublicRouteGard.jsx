import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"

const PublicRouteGard = () =>{
    const {authUser} = useAuthStore();
    return !authUser ? <Outlet/> : <Navigate to="/home" replace/>;
}

export default PublicRouteGard;