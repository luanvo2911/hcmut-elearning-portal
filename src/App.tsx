import {
  AdminRoute,
  LecturerRoute,
  StudentRoute,
  LoginRoute,
  ErrorRoute,
  ProtectedRoute,
} from "./routes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { User } from "@/types/user";

function App() {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginRoute setUser={setUser} />} />
        <Route
          path="/administrator"
          element={
            <ProtectedRoute user={user}>
              <AdminRoute user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute user={user}>
              <StudentRoute user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="/lecturer" element={<LecturerRoute user={user} />} />
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
