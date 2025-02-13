import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Footer from './components/Footer'
import Homepage from './pages/Homepage'
import WorkerInformation from './pages/WorkerInformation'
import WorkerSchedule from './pages/WorkerSchedule'
import VendorInformation from './pages/VendorInformation'
import EventSchedule from './pages/EvenSchedule'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/EventSchedule" element={<EventSchedule />} />
          <Route path="/WorkerSchedule" element={<WorkerSchedule/>} />
          <Route path="/WorkerInformation" element={<WorkerInformation />} />
          <Route path="/VendorInformation" element={<VendorInformation />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
