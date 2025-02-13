import './Navbar.css'


function Navbar(){
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src="Logo.png" alt="Logo" className="navbar-logo" />
            </div>
            <div className="navbar-links">
                <a href="/EventSchedule">Event Schedule</a>
                <a href="/WorkerSchedule">Worker Schedule</a>
                <a href="/VendorInformation">Vendor Information</a>
                <a href="/WorkerInformation">Worker Information</a>
            </div>
        </div>
    );
};

export default Navbar;