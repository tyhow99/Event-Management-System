
import './Homepage.css';

function Homepage() {
    return (
        <div className="homepage">
            <div className="content">
                <div className="box">
                    <a href="/EventSchedule">
                        <h2>Event Schedule</h2>
                        <p>View and manage the schedule for all upcoming events.</p>
                    </a>
                </div>
                <div className="box">
                    <a href="/WorkerSchedule">
                        <h2>Worker Schedule</h2>
                        <p>Check and update the work schedule for all staff members.</p>
                    </a>
                </div>
                <div className="box">
                    <a href="/VendorInformation">
                        <h2>Vendor Information</h2>
                        <p>Access and manage information about all vendors.</p>
                    </a>
                </div>
                <div className="box">
                    <a href="/WorkerInformation">
                        <h2>Worker Information</h2>
                        <p>View and edit details about all workers involved in the events.</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Homepage;