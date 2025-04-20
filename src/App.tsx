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
          {/* <Route
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
              <ProtectedRoute
                element={<UserRoutines />}
                allowedRoles={["USER"]}
              />
            }
          />
          <Route
            path="/user/routines/:id"
            element={
              <ProtectedRoute
                element={<RoutineDetail />}
                allowedRoles={["USER"]}
              />
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
            path="/user/profile"
            element={
              <ProtectedRoute
                element={<UserProfile />}
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
          /> */}

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
          {/* <Route
            path="/dermatologist/patients"
            element={
              <ProtectedRoute
                element={<PatientList />}
                allowedRoles={["DERMATOLOGISTS"]}
              />
            }
          />
          <Route
            path="/dermatologist/patients/:id"
            element={
              <ProtectedRoute
                element={<PatientDetail />}
                allowedRoles={["DERMATOLOGISTS"]}
              />
            }
          />
          <Route
            path="/dermatologist/create-routine"
            element={
              <ProtectedRoute
                element={<CreateRoutine />}
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
          {/* <Route
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
          /> */}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
