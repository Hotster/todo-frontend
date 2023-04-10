import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import LoginPage from "./pages/LoginPage/LoginPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Layout from "./components/Layout/Layout";
import Goals from "./components/Goals/Goals";
import GoalPage from "./pages/GoalPage/GoalPage";
import FolderPage from "./pages/FolderPage/FolderPage";
import Today from "./pages/Today/Today";

const App = () => {
  return (
    <Routes>

      {/* Protected routes */}
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>

          <Route index element={<Goals />} />
          <Route path="/today" element={<Today />} />
          <Route path="/goals/:id" element={<GoalPage />} />
          <Route path="/folders/:id" element={<FolderPage />} />
          <Route path="/logout" element={<LogoutPage />} />

        </Route>
      </Route>

      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
};

export default App;
