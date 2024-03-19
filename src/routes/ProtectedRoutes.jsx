import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";

const ProtectedRoutes = () => {
  const [user] = useAuthState(auth);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
