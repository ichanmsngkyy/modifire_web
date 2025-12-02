import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import RegisterForm from "./components/Register";
import LoginForm from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminRoute from "./components/AdminRoute";
import HomePage from "./components/HomePage";
import GunList from "./components/GunList";
import GunCustomizer from "./components/GunCustomizer";
import MyBuilds from "./components/MyBuilds";
import AdminDashboard from "./components/AdminDashboard";
import AllBuilds from "./components/admin/AllBuilds";
import AllUsers from "./components/admin/AllUsers";
import UploadGun from "./components/admin/UploadGun";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <DndProvider backend={HTML5Backend} options={{ enableStrictMode: true }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/modifire_web/" replace />}
            />
            <Route path="/modifire_web/" element={<HomePage />} />
            <Route path="/modifire_web/register" element={<RegisterForm />} />
            <Route path="/modifire_web/login" element={<LoginForm />} />
            <Route path="/modifire_web/GunList" element={<GunList />} />
            <Route
              path="/modifire_web/customizer"
              element={<GunCustomizer gun={null} />}
            />
            <Route
              path="/modifire_web/mybuilds"
              element={
                <ProtectedRoute>
                  <MyBuilds />
                </ProtectedRoute>
              }
            />
            <Route
              path="/modifire_web/mybuilds"
              element={
                <ProtectedRoute>
                  <MyBuilds />
                </ProtectedRoute>
              }
            />
            <Route
              path="/modifire_web/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/modifire_web/admin/builds"
              element={
                <AdminRoute>
                  <AllBuilds />
                </AdminRoute>
              }
            />
            <Route
              path="/modifire_web/admin/users"
              element={
                <AdminRoute>
                  <AllUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/modifire_web/admin/upload-gun"
              element={
                <AdminRoute>
                  <UploadGun />
                </AdminRoute>
              }
            />
          </Routes>
        </Router>
      </DndProvider>
    </AuthProvider>
  );
}

export default App;
