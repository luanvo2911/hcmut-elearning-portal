import { Navigate } from "react-router-dom";
import {User} from "@/types/user";
import { ReactNode } from "react";

const ProtectedRoute = ({user, children}: {user: User | undefined, children: ReactNode}) => {
  if(!user){
    return <Navigate to="/" replace />
  }
  return children
}

export default ProtectedRoute;