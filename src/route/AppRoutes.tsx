
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../module/auth/Login";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
