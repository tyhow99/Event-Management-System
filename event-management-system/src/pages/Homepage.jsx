
import Navbar from '../components/Navbar';
import './Homepage.css';

function Homepage() {
    return (
        <div className="homepage">
            <Navbar />
            <div className="content">
                <div className="box">
                    <h2>Event Schedule</h2>
                    <p>View and manage the schedule for all upcoming events.</p>
                </div>
                <div className="box">
                    <h2>Worker Schedule</h2>
                    <p>Check and update the work schedule for all staff members.</p>
                </div>
                <div className="box">
                    <h2>Vendor Information</h2>
                    <p>Access and manage information about all vendors.</p>
                </div>
                <div className="box">
                    <h2>Worker Information</h2>
                    <p>View and edit details about all workers involved in the events.</p>
                </div>
            </div>
        </div>
    );
}

export default Homepage;