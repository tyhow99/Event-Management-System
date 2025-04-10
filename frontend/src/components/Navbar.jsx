import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    localStorage.removeItem('workerId');
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/WorkerInformation">Worker Information</Link>
        <Link to="/WorkerSchedule">Worker Schedule</Link>
        <Link to="/VendorInformation">Vendor Information</Link>
        <Link to="/EventSchedule">Event Schedule</Link>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;