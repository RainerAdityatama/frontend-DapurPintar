import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/public_page/Landing"
import Login from "./pages/public_page/Login"
import Register from "./pages/public_page/Register"
import ScrollToTop from "./components/scroll_to_top/ScrollToTop"
import GuestRoute from "./routeLogic/GuestRoute"
import Dashboard from "./pages/auth_page/Dashboard"
import PrivateRoute from "./routeLogic/PrivateRoute"
import { Toaster } from "react-hot-toast"
import CreatePlan from "./pages/auth_page/CreatePlan"
import DailyPlans from "./pages/auth_page/DailyPlans"
import DetailDailyPlans from "./pages/auth_page/DetailDailyPlans"

function App() {
  return (
    <>
      <ScrollToTop />

      <Toaster position="top-right" reverseOrder={false} />

      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-plan" element={<CreatePlan />} />
          <Route path="/daily-plans" element={<DailyPlans />} />
          <Route path="/plan-detail/:id" element={<DetailDailyPlans />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
