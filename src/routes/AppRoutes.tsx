import { Routes, Route } from "react-router-dom";
import StorePage from "../pages/StorePage";
import SkuPage from "../pages/SkuPage";
import PlanningPage from "../pages/PlanningPage";
import ChartPage from "../pages/ChartPage";
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Wrap all routes inside a Layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<StorePage />} />
        <Route path="/skus" element={<SkuPage />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/charts" element={<ChartPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
