import './App.css';
import Navbar from './components/molecules/Navbar/Navbar';
import { Routes, Route , Navigate} from 'react-router-dom';
import Login from "./components/Pages/Login/Login";
import Signup from "./components/Pages/Signup/Signup";
import Profile from "./components/Pages/Profile/Profile";
import Settings from "./components/Pages/Settings/Settings";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Loader from './components/atoms/Loader/Loader';
import AuthGuard from "./AuthGard";
import PublicRouteGard from "./PublicRouteGard"
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  }, [checkAuth])

  if(!authUser && isCheckingAuth){
    return <Loader/>;
  }

  return (
    <div>
 <Navbar />
      <Routes>
        <Route element={<PublicRouteGard/>}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to={authUser ? "/home" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App
