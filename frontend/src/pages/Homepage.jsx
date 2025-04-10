import './Homepage.css';
import { Link } from 'react-router-dom';

function Homepage() {
    return (
        <div className="homepage">
            <div className="content">
                <div className="box">
                    <Link to="/EventSchedule" className="box-content">
                        <h2>Event Schedule</h2>
                        <p>View and manage the schedule for all upcoming events.</p>
                    </Link>
                </div>
                <div className="box">
                    <Link to="/WorkerSchedule" className="box-content">
                        <h2>Worker Schedule</h2>
                        <p>Check and update the work schedule for all staff members.</p>
                    </Link>
                </div>
                <div className="box">
                    <Link to="/VendorInformation" className="box-content">
                        <h2>Vendor Information</h2>
                        <p>Access and manage information about all vendors.</p>
                    </Link>
                </div>
                <div className="box">
                    <Link to="/WorkerInformation" className="box-content">
                        <h2>Worker Information</h2>
                        <p>View and edit details about all workers involved in the events.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Homepage;