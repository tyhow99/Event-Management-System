import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import WorkerInformation from "./pages/WorkerInformation";
import WorkerSchedule from "./pages/WorkerSchedule";
import VendorInformation from "./pages/VendorInformation";
import EventSchedule from "./pages/EventSchedule";
import Login from "./pages/LoginPage";
import AddWorker from "./pages/AddWorker";
import AddWorkerSchedule from "./pages/AddWorkerSchedule";
import UpdateWorker from "./pages/UpdateWorker";
import UpdateSchedule from "./pages/UpdateSchedule";
import AddVendorInformation from "./pages/AddVendorInformation";
import UpdateVendor from "./pages/UpdateVendor";
import UpdateEvent from "./pages/UpdateEvent";
import AddEvent from "./pages/AddEvent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const workerId = localStorage.getItem("workerId");
    if (workerId) {
      setIsAuthenticated(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EventSchedule"
          element={
            <ProtectedRoute>
              <EventSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/WorkerSchedule"
          element={
            <ProtectedRoute>
              <WorkerSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/WorkerInformation"
          element={
            <ProtectedRoute>
              <WorkerInformation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/VendorInformation"
          element={
            <ProtectedRoute>
              <VendorInformation />
            </ProtectedRoute>
          }
        />
        <Route path="/AddWorker" element={<AddWorker />} />
        <Route path="/AddWorkerSchedule" element={<AddWorkerSchedule />} />
        <Route
          path="/AddVendorInformation"
          element={<AddVendorInformation />}
        />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="/UpdateWorker/:worker_id" element={<UpdateWorker />} />
        <Route path="/UpdateSchedule/:worker_id" element={<UpdateSchedule />} />
        <Route path="/UpdateVendor/:vendor_id" element={<UpdateVendor />} />
        <Route path="/UpdateEvent/:event_id" element={<UpdateEvent />} />
      </Routes>
      {isAuthenticated && <Footer />}
    </BrowserRouter>
  );
}

export default App;
