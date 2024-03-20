import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";

const ProtectedRoutes = () => {
  const user = auth.currentUser;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
