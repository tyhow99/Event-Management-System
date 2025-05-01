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

    useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm]);

    const handleDelete = async (eventId) => {
      if (window.confirm("Are you sure you want to delete this event?")) {
        try {
          await axios.delete(`http://localhost:5001/event_schedule/${eventId}`);
          getEventSchedule(); // Refresh event list
        } catch (error) {
          console.error("Error deleting event:", error);
        }
      }
    };

    const filteredWorkers = events.filter(worker =>
      Object.values(worker).some(value => {
        let stringValue;

        if (worker.event_date === value) {
          const date = new Date(value);
          stringValue = date.toLocaleDateString(); // Converts to "M/D/YYYY"
        } else {
          stringValue = String(value);
        }

        return stringValue.toLowerCase().includes(searchTerm.toLowerCase());
      })
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
                            <th>Actions</th>
                            <th></th>
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
                                <td>
                                <Link
                                  to={`/UpdateEvent/${event.event_id}`}
                                  className="update-event-btn"
                                >
                                Update
                                </Link>
                                </td>
                                <td>
                                <button
                                  className="delete-event-btn"
                                  onClick={() => handleDelete(event.event_id)}
                                >
                                Delete
                                </button>
                                </td>
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