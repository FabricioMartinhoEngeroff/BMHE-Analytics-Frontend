import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../pages/loginPages/AuthPages";
import { InsightsPage } from "../pages/insightsPages/Pages";
import { JSX } from "react";


const isAuthenticated = () => {
  return !!localStorage.getItem("token"); 
};

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
};

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/insights" element={<PrivateRoute element={<InsightsPage />} />} />
      </Routes>
    </Router>
  );
}
