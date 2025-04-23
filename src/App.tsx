import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import UserDashboard from "./pages/user/Dashboard";
import DermatologistsDashboard from "./pages/dermatologist/Dashboard";
import { Toaster } from "sonner";
import SkinCare101 from "./pages/SkinCare101";
import AboutUs from "./pages/AboutUs";
import ProtectedRoute from "./middleware/ProtectedRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductExplorer from "./pages/user/ProductExplorer";
import ProgressTracker from "./pages/user/ProgressTracker";
import Routines from "./pages/user/Routines";
import SkinAssessment from "./pages/user/SkinAssessment";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageUsers from "./pages/admin/ManageUsers";
import Chat from "./pages/dermatologist/Chat";
import UserChat from "./pages/user/Chat";
// import Appointments from "./pages/dermatologist/Appointments";
import AIRecommendations from "./pages/user/AIRecommendations";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Toaster richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/skincare-101" element={<SkinCare101 />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* User Routes */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute
                element={<UserDashboard />}
                allowedRoles={["USER"]}
              />
            }
          />
          <Route
            path="/user/skin-assessment"
            element={
              <ProtectedRoute
                element={<SkinAssessment />}
                allowedRoles={["USER"]}
              />
            }
          />
          <Route
            path="/user/routines"
            element={
              <ProtectedRoute element={<Routines />} allowedRoles={["USER"]} />
            }
          />
          <Route
            path="/user/progress"
            element={
              <ProtectedRoute
                element={<ProgressTracker />}
                allowedRoles={["USER"]}
              />
            }
          />
          <Route
            path="/user/products"
            element={
              <ProtectedRoute
                element={<ProductExplorer />}
                allowedRoles={["USER"]}
              />
            }
          />
          <Route
            path="/user/chat"
            element={
              <ProtectedRoute element={<UserChat />} allowedRoles={["USER"]} />
            }
          />
          <Route
            path="/user/ai-recommendations"
            element={
              <ProtectedRoute
                element={<AIRecommendations />}
                allowedRoles={["USER"]}
              />
            }
          />

          {/* Dermatologist Routes */}
          <Route
            path="/dermatologist/dashboard"
            element={
              <ProtectedRoute
                element={<DermatologistsDashboard />}
                allowedRoles={["DERMATOLOGISTS"]}
              />
            }
          />
          <Route
            path="/dermatologist/chat"
            element={
              <ProtectedRoute
                element={<Chat />}
                allowedRoles={["DERMATOLOGISTS"]}
              />
            }
          />
          {/* <Route
            path="/dermatologist/appointments"
            element={
              <ProtectedRoute
                element={<Appointments />}
                allowedRoles={["DERMATOLOGISTS"]}
              />
            }
          /> */}

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                element={<AdminDashboard />}
                allowedRoles={["ADMIN"]}
              />
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute
                element={<ManageProducts />}
                allowedRoles={["ADMIN"]}
              />
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute
                element={<ManageUsers />}
                allowedRoles={["ADMIN"]}
              />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
