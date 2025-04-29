import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./EventSchedule.css"


const EventSchedule = () =>
{
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 6;

    const getEventSchedule = async () => {
        try {
            const response = await axios.get('http://localhost:5001/event_schedule');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching event schedule:', error);
        }
    }

    useEffect(() => {
        getEventSchedule();
      }, []);


      const filteredWorkers = events.filter(worker =>
        Object.values(worker).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentEvents = filteredWorkers.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage);

    return(
        <div className="container">
            <h2>Event Schedule</h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            <div className="table-container">
                <table className="event-table">
                    <thead>
                        <tr>
                            <th>Event ID</th>
                            <th>Event Name</th>
                            <th>Event Start</th>
                            <th>Event End</th>
                            <th>Event Date</th>
                            <th>Organizer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEvents.map((event) => (
                            <tr key={event.event_id}>
                                <td>{event.event_id}</td>
                                <td>{event.event_name}</td>
                                <td>{event.event_start}</td>
                                <td>{event.event_end}</td>
                                <td>{new Date(event.event_date).toLocaleDateString()}</td>
                                <td>{event.organizer}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        </div>
        <Link to="/AddEvent" className="btn add-worker-btn">Add Event</Link>
    </div>
    );
};

export default EventSchedule;