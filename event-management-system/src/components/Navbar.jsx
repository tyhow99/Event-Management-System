import './Navbar.css'


function Navbar(){
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src="Logo.png" alt="Logo" className="navbar-logo" />
            </div>
            <div className="navbar-links">
                <a href="#link1">Event Schedule</a>
                <a href="#link2">Worker Schedule</a>
                <a href="#link3">Vendor Information</a>
                <a href="#link4">Worker Information</a>
            </div>
        </div>
    );
};

export default Navbar;